import React, { Component , state , deleteblog,addcomment,inputhandler,addlike,getdatafromcategory} from 'react'
import {Card,CardBody,CardFooter,CardHeader,
    CardTitle,Col,UncontrolledDropdown,DropdownToggle,
    DropdownMenu,DropdownItem,CardText, Button
    ,CardImg
,Row} from 'reactstrap'
import{Carousel,Container}from 'react-bootstrap'
import {Link,Redirect } from 'react-router-dom';
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
        userID:"",
        feedbacks:[]
        
    }
    inputhandler=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    componentDidMount(){
        axios.get("http://localhost:90/post/all", this.state.config)
        .then((response)=>{
            
            this.setState({
                blogs : response.data.data,
                // userID : response.data.data.data.userID
            })
        })
        .catch((err)=>{
            console.log(err.response)
        })
        axios.get("http://localhost:90/getapproved/feedback")
        .then((result)=>{
            this.setState({
                feedbacks:result.data.data
            })
            
        })
        .catch((e)=>{
            console.log(e)
        })
    }
    getdatafromcategory=(category)=>{
        axios.get('http://localhost:90/getfrom/'+category)
        .then(response=>{
            console.log(response)
            this.setState({
                    blogs:response.data.data
            })
        })
        .catch(er=>{
            console.log(er)
        })

    }
    deleteblog = (id,userID) =>{
        
        axios.delete('http://localhost:90/post/delete/' + id+'/'+userID , this.state.config)
        .then((response)=>{
            console.log(response)
            alert("Deleted Successfully!!")
            window.location.href='/'
        })
        .catch((err)=>{
            console.log(err.response)
            alert("not allowed to delete the post !!")
        })
    
     }
     addlike = (postID) => {
       
         axios.get('http://localhost:90/like/' + postID ,this.state.config)
         .then((response)=>{
                console.log(response)
                const messge=response?.data?.message
                alert(messge)
         })
         .catch((err)=>{
                console.log(err)
                alert("alredy liked the post")
         })
     }
    
    render()
     {
        if(!localStorage.getItem('token')){
            return <Redirect to='/login'/>
        }
        return (
            
            
            <div>
            <Container fluid>
            
            <Row>
            <Col xs="3">
                            
                <div className="mb-4">
                    <div className="card text-center">
                                <h3 className="text-primary">Some useful Quates</h3>
                    </div>
                    <Carousel >
                <Carousel.Item interval={2000}>
                    <img height="200px"
                    className="d-block w-100 "
                    src="https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014_960_720.jpg"
                    alt="Nature"
                    />
                    <Carousel.Caption>
                    <h3 className="text-danger">First slide label</h3>
                    <p><i>Nulla vitae elit libero, a pharetra augue mollis interdum.</i></p>
                    </Carousel.Caption>
                </Carousel.Item>
                {
                    this.state.feedbacks.map((feedback)=>{
                        return(
                <Carousel.Item interval={2000}>
                    <img height="200px"
                    className="d-block w-100"
                    src={'http://localhost:90/images/'+feedback.userID.image}
                    alt="Second slide"
                    />
                    <Carousel.Caption>
                    <h3 className="text-danger">{feedback.title}</h3>
                    <p><i>{feedback.description}</i></p>
                    </Carousel.Caption>
                </Carousel.Item>
                )
                })
                }
                </Carousel>
                    </div>
                                </Col>
          
                <Col>
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
            
            <DropdownItem><button 
            onClick={this.deleteblog.bind(this, blog._id, blog.userID._id)}
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
                <Button color="danger" onClick={this.addlike.bind(this,blog._id)}><FavoriteIcon className="mr-2"></FavoriteIcon> Love</Button>
            </Col>
            <Col xs="6">
                
            </Col>
            <Col xs="2">
                
                
                <Link to={'/addcomment/'+blog._id} className="btn btn-primary ">
                <ModeCommentIcon className="mr-2"></ModeCommentIcon>
                Comment
                </Link>
            </Col>
            </Row>
        </CardFooter>
      </Card>
       
              )
         })
      }
                </Col>
                <Col xs="3">

                    <Card className="jumbotron">
                   
                    <UncontrolledDropdown>
                            <DropdownToggle caret color="info">
                                Select Categories
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header><Button color="warning" 
                                onClick={this.getdatafromcategory.bind(this,"Social")}>
                                Social</Button></DropdownItem>
                               
                                <DropdownItem><Button 
                                onClick={this.getdatafromcategory.bind(this,"IT")} color="warning">IT</Button></DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem><Button color="warning"
                                onClick={this.getdatafromcategory.bind(this,"Personal development")}>
                                    Personal development</Button></DropdownItem>
                                    <DropdownItem><Button color="warning"
                                    onClick={this.getdatafromcategory.bind(this,"Science and technology")}>
                                    Science and technology</Button></DropdownItem>
                                    <DropdownItem><Button color="warning"
                                     onClick={this.getdatafromcategory.bind(this,"Astrology")}
                                     >Astrology</Button></DropdownItem>
                                    <DropdownItem><Button color="warning"
                                    onClick={this.getdatafromcategory.bind(this,"Political")}>
                                    Political</Button></DropdownItem>
                            </DropdownMenu>
                            </UncontrolledDropdown>
                   
                    </Card>
                </Col>
                
            </Row>
           
               
            </Container> 
      
     
            </div>
        )
    }
}
