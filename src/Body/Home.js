import React, { Component , state , deleteblog} from 'react'
import {Card,CardBody,CardFooter,CardHeader,
    CardTitle,Col,UncontrolledDropdown,DropdownToggle,
    DropdownMenu,DropdownItem,CardText, Button,
    Form,
    Input,CardImg
,Row} from 'reactstrap'
import {Link } from 'react-router-dom';
import  axios from 'axios'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
export default class Home extends Component {
    state = {
        blogs : [],
        config : {
            headers : {'authorization': `Bearer ${localStorage.getItem('token')}`}
        },
        userID:""
    }
    componentDidMount(){
        axios.get("http://localhost:90/post/all", this.state.config)
        .then((response)=>{
            console.log(response)
            this.setState({
                blogs : response.data.data,
                // userID : response.data.data.data.userID
            })
        })
        .catch((err)=>{
            console.log(err.response)
        })
    }
    deleteblog = (id,userID) =>{
        
        
        
        axios.delete('http://localhost:90/post/delete/' + id+'/'+userID , this.state.config)
        .then((response)=>{
            console.log(response)
        })
        .catch((err)=>{
            console.log(err.response)
        })
    
     }
    render() {
        return (
            <div>
               
      {
          this.state.blogs.map((blog)=>{
              return (
                  
        <Card className="mb-2"> 
        <CardHeader>
        <Row >
        <Col xs="1" >
            <img className="img-round" alt={blog.userID.username} src={'http://localhost:90/images/'+blog.userID.image}></img>
        </Col>
        <Col xs="8">
            <p className="text-success mt-3 float-left"><i><u>#{blog.userID.username}</u></i></p>
        </Col>
        <Col xs="3">
        <UncontrolledDropdown>
      <DropdownToggle caret color="primary" className="float-right">
        <MoreVertIcon></MoreVertIcon>
      </DropdownToggle>
      <DropdownMenu >
      <DropdownItem header><Link to={'/updateblog/'+blog._id} className="btn btn-success mt-2">
      <EditIcon></EditIcon> 
      Update</Link></DropdownItem>
            
            <DropdownItem><button onClick={this.deleteblog.bind(this, blog._id, blog.userID._id)}
             className="btn btn-danger"><DeleteIcon></DeleteIcon>Delete</button></DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
        </Col>
        </Row>
        </CardHeader>
        <CardImg  
        className="img_post"
         src={'http://localhost:90/images/'+blog.image} 
         alt={"image of "+blog.title } 
            
        />
        <CardBody>
          <CardTitle tag="h5">{blog.title}</CardTitle>

          <CardText> {blog.description}</CardText>
          <CardText> {blog.category}</CardText>
        </CardBody>
        <CardFooter>
        <Row>
            <Col xs="2">
                <Button color="danger"><FavoriteIcon className="mr-2"></FavoriteIcon> Love</Button>
            </Col>
            <Col xs="8">
                <Form>
                    <Input type="text" name="commentBody" placeholder="Add Your Comment" className="rounded"></Input>
                </Form>
            </Col>
            <Col xs="2">
                <Button color="primary" className="float-right"><ModeCommentIcon className="mr-2"></ModeCommentIcon> Comment</Button>
            </Col>
            </Row>
        </CardFooter>
      </Card>
       
              )
         })
      }
     
            </div>
        )
    }
}
