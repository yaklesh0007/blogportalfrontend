import React, { Component,state,inputhandler,addcomment,showcomments, deltecomment,getsinglecomment
,open,handleEventChange,updateComment,showreplies,
handleReplyChange,
addreply,
addreplys,cancelmodal,
getsinglereply,
cancelmodal2,
updateReply,deleteReply} from 'react'
import {Card,CardBody,CardFooter,CardHeader,
    CardTitle,Col,UncontrolledDropdown,DropdownToggle,
    DropdownMenu,DropdownItem,CardText, Button,
    Form,
    Input,CardImg
,Row,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import {Redirect } from 'react-router-dom';
import AddCommentIcon from '@material-ui/icons/AddComment';
import VisibilityIcon from '@material-ui/icons/Visibility';
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
        likes:[],
        showcomment:false,
        isedit:false,
        currentcomment:{},
        showreply:false,
        opensecondmodal:false,
        open3d:false,
        currentreply:{},
        message:''
    }

    inputhandler=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleEventChange = (e) => {
        this.setState({
            currentcomment: { ...this.state.currentcomment, [e.target.name]: e.target.value }
        })
    }
    handleReplyChange = (e) => {
        this.setState({
            currentreply: { ...this.state.currentreply, [e.target.name]: e.target.value }
        })
    }
    componentDidMount(){
        
        axios.get('http://localhost:90/blog/single/' + this.state.postID, this.state.config)
        .then((response)=>{
          
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
        axios.get('http://localhost:90/likes/onpost/'+this.postID, this.state.config)
            .then(result=>{
                
                this.setState({
                    likes:result.data.data
                })
            }).catch(er=>{
                console.log(er)
            })

            axios.get('http://localhost:90/comment/'+this.state.postID, this.state.config) 
            .then((result)=>{
                
                this.setState({
                        comments:result.data.result
                })
                
            })
            .catch((er)=>{
                console.log(er)
            })
    }
    open=()=>{
        this.setState({
            isedit:!this.state.isedit
        })
    }
    cancelmodal=()=>{
        this.setState({
            opensecondmodal:!this.state.opensecondmodal
        })
    }
    cancelmodal2=()=>{
        this.setState({
            open3d:!this.state.openthirdmodal
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
               
                alert("comment added !!")
                window.location.href='/'
            })
            .catch((err)=>{
                alert("unable to add comment !!")
            })
     }
     showcomments =(id)=>{
        axios.get('http://localhost:90/comment/'+id, this.state.config) 
        .then((result)=>{
            
            this.setState({
                    comments:result.data.result,
                    showcomment:!this.state.showcomment
            })
            
        })
        .catch((er)=>{
            console.log(er)
        })
     }
     deltecomment=(id,userID)=>{
        axios.delete('http://localhost:90/comment/delete/'+id+'/'+userID, this.state.config)
        .then((del)=>{
            alert("deleted successfully !!")
            window.location.href='/'
        })
        .catch((error)=>{
            alert("not allowed to delete !!")
        })
     }
     deleteReply=(id,userID)=>{
         axios.delete('http://localhost:90/reply/delete/'+id+'/'+userID,this.state.config)
         .then((responce)=>{
             alert("reply deleted successfully !!")
             window.location.href='/'
         })
         .catch((error)=>{
             alert("not allowed to delete the data !!")
         })
     }
     getsinglecomment=(id)=>{
         axios.get('http://localhost:90/comment/single/'+id, this.state.config)
         .then((respnc)=>{
             
             this.setState({
                currentcomment:respnc.data.data,
                 isedit:!this.state.isedit

             })
         })
         .catch((err)=>{
             alert("unable to get data")
         })
     }
     getsinglereply=(id)=>{
            axios.get('http://localhost:90/reply/single/'+id, this.state.config)
            .then((responce)=>{
                    this.setState({
                        open3d:!this.state.open3d,
                        currentreply:responce.data.data
                    })
                    
            })
            .catch((err)=>{
                console.log(err)
            })
     }
     updateComment=(id)=>{
        
            axios.put('http://localhost:90/comment/update/'+id, this.state.currentcomment, this.state.config)
            .then((responce)=>{
                alert("successfully updated the comment !!")
                window.location.href='/'
            })
            .catch((err)=>{
                alert("not allowed to edit the post !!")
            })
     }
     updateReply=(replyID)=>{
         
        //  console.log(replyID)
         axios.put('http://localhost:90/reply/update/'+replyID, this.state.currentreply, this.state.config)
         .then((responce)=>{
            alert("updated successfully !!")
            window.location.href='/'
         })
         .catch((error)=>{
                alert("unathorized to update reply!!!")
         })
     }
     showreplies=(commentID)=>{
         
         axios.get('http://localhost:90/reply/'+commentID, this.state.config)
         .then((responce)=>{
            
            this.setState({
                showreply:!this.state.showreply,
                replys:responce.data.data
            })
            console.log(this.state.replys)
         })
         .catch((error)=>{
                alert("donot have replies !!")
         })
     }
     addreply=(commentID)=>{
        this.setState({
            opensecondmodal:!this.state.opensecondmodal,
            commentID:commentID
        })
        console.log(commentID)
     }
     addreplys=(e)=>{
         e.preventDefault()
         const data={
             commentID:this.state.commentID,
             replyBody:this.state.replyBody
         }
         console.log(data)
         axios.post('http://localhost:90/reply/insert', data, this.state.config)
         .then((response)=>{
            alert("Successfully added reply !!!")
            window.location.href='/'
         })
         .catch((err)=>{
             alert("unable to add reply")
         })
     }
    render() {
                if(!localStorage.getItem('token')){
                    return <Redirect to='/login'/>
                }
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
                             <Row>
                                <Col><p float="left">{this.state.likes.length}<p className="text-primary">Likes</p></p></Col>
                                <Col><p float="right">{this.state.comments.length}<p className="text-primary">Comments</p></p></Col>
                            </Row>
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
                                <DropdownItem header><Button className="btn btn-success" 
                                onClick={this.getsinglecomment.bind(this, commente._id)}>
                                <EditIcon></EditIcon> 
                                Update </Button></DropdownItem>
                                        
                                        <DropdownItem><button 
                                        onClick={this.deltecomment.bind(this, commente._id,commente.userID._id)}
                                        className="btn btn-danger"><DeleteIcon></DeleteIcon>Delete</button></DropdownItem>
                                        <DropdownItem><button 
                                        onClick={this.addreply.bind(this, commente._id)}
                                        className="btn btn-primary"><AddCommentIcon/>Add reply</button></DropdownItem>
                                        <DropdownItem><button 
                                        onClick={this.showreplies.bind(this, commente._id)}
                                        className="btn btn-primary"><VisibilityIcon/>Show</button></DropdownItem>

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
                    {this.state.showreply?
                            <div>
                            <p>Replies</p>
                            {this.state.replys.map((rply)=>{
                            return(
                            <CardHeader>
                                <Row >
                                <Col xs="1" >
                                    <img className="img-round" alt={rply.userID.username} 
                                    src=
                                    {'http://localhost:90/images/'+rply.userID.image}
                                    ></img>
                                </Col>
                                <Col xs="4">
                                    <p className="text-success mt-3 float-left"><i><u>#
                                    {rply.userID.username}
                                    </u></i></p>
                                </Col>
                                <Col xs="4">
                                    <p><b>{rply.replybody}</b></p>
                                </Col>
                                <Col xs="3">
                                <UncontrolledDropdown>
                                    <DropdownToggle caret float="right" color="primary">
                                        
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem header>
                                        <Button className="btn btn-success" 
                                            onClick={this.getsinglereply.bind(this, rply._id)}>
                                            <EditIcon></EditIcon> 
                                            Update </Button>
                                        </DropdownItem>
                                        
                                        <DropdownItem><Button
                                        color="danger" onClick={this.deleteReply.bind(this,rply._id,rply.userID._id)}
                                        ><DeleteIcon/>Delete</Button></DropdownItem>
                                        
                                    </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Col>
                                </Row>
                                </CardHeader>
				                )  
                                })
                                }
                            </div>
                              :null
                    }


                    <Modal isOpen={this.state.isedit}
                    
                     >
                        <ModalHeader >Update Comment</ModalHeader>
                        <ModalBody>
                       <Form>
                           <Input name="commentBody" value={this.state.currentcomment.commentBody}
                           onChange={this.handleEventChange}></Input>
                           <Input type="hidden" name="userID" value={this.state.currentcomment.userID}
                            onChange={this.handleEventChange}   
                           />
                           <Button className="mt-2" color="primary" onClick=
                            {()=>this.updateComment(this.state.currentcomment._id)} >
                                Save changes
                           </Button>
                       </Form>
                        </ModalBody>
                        <ModalFooter>
                        <Button className="btn btn-danger" onClick={this.open}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                
                <Modal isOpen={this.state.open3d}>
                    <ModalHeader>Update reply</ModalHeader>
                    <ModalBody>
                    <Form>
                    
                           <Input name="replybody" value={this.state.currentreply.replybody}
                           onChange={this.handleReplyChange}></Input>
                           <Input type="hidden" name="userID" value={this.state.currentreply.userID}
                            onChange={this.handleReplyChange}   
                           />
                           <Button className="btn btn-primary mt-2" onClick=
                           {()=>this.updateReply(this.state.currentreply._id)} >
                                Save changes
                           </Button>
                       </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="btn btn-danger" isOpen="false">Cancel</Button>
                        </ModalFooter>
                </Modal>
                
                    <Modal isOpen={this.state.opensecondmodal}>
                    
                    <ModalHeader >Add Reply</ModalHeader>
                    <ModalBody>
                   <Form>
                       <Input name="replyBody" value={this.state.replyBody} type="text"
                       onChange={this.inputhandler}></Input>
                       <Input type="hidden" value={this.state.commentID} name="commentID" />
                       <Button className="btn btn-primary mt-2" onClick={this.addreplys} >
                            Save changes
                       </Button>
                   </Form>
                    </ModalBody>
                    <ModalFooter>
                    <Button className="btn btn-danger" onClick={this.cancelmodal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
               
                   
            </div>
        )
    }
}
