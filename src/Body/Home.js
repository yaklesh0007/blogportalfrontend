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
        <Col >
            <img className="img-round" alt="Image of user" src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557216671.5403_tunyra_n.jpg"></img>
        </Col>
        <Col>
            <p className="text-primary mt-3">Email</p>
        </Col>
        <Col className="colmun_right">
        <UncontrolledDropdown>
      <DropdownToggle caret color="primary">
        <MoreVertIcon></MoreVertIcon>
      </DropdownToggle>
      <DropdownMenu >
      <DropdownItem header><Link to={'/updateblog/'+blog._id} className="btn btn-success mt-2">
      <EditIcon></EditIcon> 
      Update</Link></DropdownItem>
            
            <DropdownItem><button onClick={this.deleteblog.bind(this, blog._id, blog.userID)}
             className="btn btn-danger"><DeleteIcon></DeleteIcon>Delete</button></DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
        </Col>
        </Row>
        </CardHeader>
        <CardImg  
        className="img_post"
         src="https://images.unsplash.com/photo-1610983127778-17e80dfabdd0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80" 
         alt={"image of "+blog.title } 
            
        />
        <CardBody>
          <CardTitle tag="h5">{blog.title}</CardTitle>

          <CardText> {blog.description}</CardText>
          <CardText> {blog.category}</CardText>
        </CardBody>
        <CardFooter>
        <Row xs="2">
            <Col>
                <Button color="primary"><FavoriteIcon></FavoriteIcon> Love</Button>
            </Col>
            <Col xs="6">
                <Form>
                    <Input type="text" name="commentBody" placeholder="Add Your Comment"></Input>
                </Form>
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
