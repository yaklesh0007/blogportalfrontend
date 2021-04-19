import React, { Component,state,deletefeedback,approvedfeedback,unapprovedfeedback } from 'react'
import{Row,Col,Table,Button} from 'reactstrap'
import{Redirect} from 'react-router-dom'
import axios from 'axios'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
export default class Showfeedback extends Component {
    state={
        feedbacks:[],
        approvedfeedback:[],
        config : {
            headers : {'authorization': `Bearer ${localStorage.getItem('token')}`}
        }
    }
    componentDidMount(){
        axios.get('http://localhost:90/fetchfeedback', this.state.config)
        .then((responce)=>{
            console.log(responce.data.data)
            this.setState({
                approvedfeedback:responce.data.data
            })
                
        })
        .catch((err)=>{
            console.log(err)
                // alert("unable to load data")
        })
    }
    deletefeedback=(id)=>{
        axios.delete('http://localhost:90/feedback/delete/'+id, this.state.config)
        .then((responce)=>{
            alert("deleted Successfully !!")
            window.location.href="/showfeedback"
        })
        .catch((err)=>{
            alert("Unable to delete !!")
            window.location.href="/showfeedback"
        })
    }
    approvedfeedback=(id)=>{
        axios.put('http://localhost:90/approve/feedback/'+id, this.state.config)
        .then((responce)=>{
            alert("approved Successfully !!")
            window.location.href="/showfeedback"
        })
        .catch((err)=>{
            alert("Unable to approved !!")
            window.location.href="/showfeedback"
        })
    }
    unapprovedfeedback=(id)=>{
        axios.put('http://localhost:90/unapprove/feedback/'+id, this.state.config)
        .then((responce)=>{
            alert("approved Successfully !!")
            window.location.href="/showfeedback"
        })
        .catch((err)=>{
            alert("Unable to approved !!")
            window.location.href="/showfeedback"
        })
    }

    render() {
        if(!localStorage.getItem('token') && localStorage.getItem('userType')==='admin'){
            alert("not allowed to visit as normal user !!")
            return <Redirect to='/login'/>
        }
        return (
            <div>
               <Row>
                   <Col>
                    <div className="card">
                        <h4>User Feedbacks</h4>
                    </div>
                   <Table dark bordered>
                        <thead>
                            <tr>
                            <th>S.N</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Email</th>
                            <th>Image</th>
                            <th>Action</th>
                            </tr>

                        </thead>
                        <tbody>
                        {
                            this.state.approvedfeedback.map((feedback,i)=>{
                                    return (
                                <tr>
                                <th scope="row">{i+1}</th>
                                <td>{feedback.title}</td>
                                <td>{feedback.description}</td>
                                <td>{feedback.userID.username}</td>
                                <td><img height="100" width="100"
                                src={'http://localhost:90/images/'+feedback.userID.image} 
                                alt={'this is image of '+feedback.userID.username}></img></td>
                                <td>
                                    <Row>
                                        <Col><Button color="danger"
                                        onClick={this.deletefeedback.bind(this, feedback._id)}
                                        ><DeleteForeverIcon/>Delete</Button></Col>
                                        
                                        {feedback.approved===false?
                                        <Col><Button color="success" 
                                        onClick={this.approvedfeedback.bind(this,feedback._id)}>
                                        <VerifiedUserIcon/>Approved</Button></Col>:
                                        <Col><Button color="success" 
                                        onClick={this.unapprovedfeedback.bind(this,feedback._id)}><VerifiedUserIcon/>Un Approved</Button></Col>}

                                       
                                           
                                        
                                    </Row>
                                </td>
                                </tr>
                                )
                                })
                            }
                        </tbody>
                        </Table>
                   </Col>
               </Row>                 
            </div>
        )
    }
}
