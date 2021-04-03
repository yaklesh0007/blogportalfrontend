import React, { Component,state,inputhandler,addcomment,showcomments, deltecomment } from 'react'
import {Card,CardBody,CardFooter,CardHeader,
    CardTitle,Col,UncontrolledDropdown,DropdownToggle,
    DropdownMenu,DropdownItem,CardText, Button,
    Form,
    Input,CardImg
,Row} from 'reactstrap'
import {Link } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ModeCommentIcon from '@material-ui/icons/ModeComment';
import  axios from 'axios'
export default class Comment extends Component {

    state={
        commentBody:'',
        replyBody:'',
        commentID:'',
        image:'',
        userimage:'',
        username:'',
        category:'',
        description:'',
        title:'',
        postID:this.props.match.params.id,
        config : {
            headers : {'authorization': `Bearer ${localStorage.getItem('token')}`}
        },
        comments:[],
        replys:[],
        showcomment:false

    }

    inputhandler=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    componentDidMount(){
        console.log(this.state.postID)
        axios.get('http://localhost:90/blog/single/' + this.state.postID, this.state.config)
        .then((response)=>{
          console.log(response.data.data)
            this.setState({
                title : response.data.data.title,
                description : response.data.data.description,
                category : response.data.data.category,
                image:response.data.data.image,
                userimage:response.data.data.userID.image,
                username:response.data.data.userID.username
            })   
    
          
        })
        .catch((err)=>{
            console.log(err.response)
        })
    }
    addcomment= (e) =>{
         
        e.preventDefault()
         const comment={
             commentBody:this.state.commentBody,
             postID:this.state.postID
         }
         
            axios.post('http://localhost:90/comment/insert/', comment , this.state.config)
            .then((responce)=>{
                console.log(responce)
                alert("comment added !!")
            })
            .catch((err)=>{
                console.log(err)
            })
     }
     showcomments =(id)=>{
        axios.get('http://localhost:90/comment/'+id, this.state.config) 
        .then((result)=>{
            
            this.setState({
                    comments:result.data.result,
                    showcomment:!this.state.showcomment
            })
            console.log(this.state.comments)
        })
        .catch((er)=>{
            console.log(er)
        })
     }
     deltecomment=(id,userID)=>{
        axios.delete('http://localhost:90/comment/delete/'+id+'/'+userID, this.state.config)
        .then((del)=>{
            alert("deleted successfully !!")
            
        })
        .catch((error)=>{
            alert("not allowed to delete !!")
        })
     }
    render() {
        return (
            <div>
                <Row>
                    <Col>
                    <Card className="mb-2"> 
                            <CardHeader>
                            <Row >
                            <Col xs="1" >
                                <img className="img-round" alt={this.state.username} 
                                src=
                                {'http://localhost:90/images/'+this.state.userimage}
                                ></img>
                            </Col>
                            <Col xs="8">
                                <p className="text-success mt-3 float-left"><i><u>#
                                {this.state.username}
                                </u></i></p>
                            </Col>
                            <Col xs="3">
                            
                            </Col>
                            </Row>
                            </CardHeader>
                            <CardImg  
                            className="img_post"
                            src=
                            {'http://localhost:90/images/'+this.state.image} 
                            alt=
                            {"image of "+this.state.title } 
                                
                            />
                            <CardBody>
                            <CardTitle tag="h5">
                            {this.state.title}
                            </CardTitle>

                            <CardText> 
                            {this.state.description}
                            </CardText>
                            <CardText>
                             {this.state.category}
                             </CardText>
                            </CardBody>
                            <CardFooter>
                            <Row>
                                
                                <Col xs="12">
                                    <Form onSubmit={this.addcomment} >
                                    
                                    <Input type="text" name="commentBody" placeholder="Add Your Comment" className="rounded" required="true" 
                                        value={this.state.commentBody} onChange={this.inputhandler}
                                    ></Input> 
                                        
                                    </Form>
                                </Col>
                                <Col >
                                    <Button color="primary" className="float-right mt-2" onClick={this.showcomments.bind(this,this.state.postID)}><ModeCommentIcon className="mr-2"></ModeCommentIcon> Show all Comments</Button>
                                </Col>
                                </Row>
                            </CardFooter>
                        </Card>
                    </Col>
                    
                </Row>
                    {this.state.showcomment?
                    <div>
                    {
                        this.state.comments.map((commente)=>{
                            return (
                                <div>
                            <CardHeader>
                            <Row >
                            <Col xs="1" >
                                <img className="img-round" alt={commente.userID.username} 
                                src=
                                {'http://localhost:90/images/'+commente.userID.image}
                                ></img>
                            </Col>
                            <Col xs="3">
                                <p className="text-success mt-3 float-left"><i><u>#
                                {commente.userID.username}
                                </u></i></p>
                            </Col>
                            <Col xs="6">
                                <p className="text-success mt-3 float-left"><i>
                                {commente.commentBody}
                                </i></p>
                            </Col>
                            <Col xs="2">
                            <UncontrolledDropdown>
                                <DropdownToggle caret color="primary" className="float-right">
                                    <MoreVertIcon></MoreVertIcon>
                                </DropdownToggle>
                                <DropdownMenu >
                                <DropdownItem header><Link to={'/updateblog/'+commente._id} className="btn btn-success mt-2">
                                <EditIcon></EditIcon> 
                                Update</Link></DropdownItem>
                                        
                                        <DropdownItem><button 
                                        onClick={this.deltecomment.bind(this, commente._id,commente.userID._id)}
                                        className="btn btn-danger"><DeleteIcon></DeleteIcon>Delete</button></DropdownItem>
                                </DropdownMenu>
                                </UncontrolledDropdown>
                            </Col>
                            </Row>
                            </CardHeader>
                            </div>
                            )
         })
      }
                    </div>
                   
                    :null
                    }
            </div>
        )
    }
}
