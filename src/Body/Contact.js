import React, { Component,state,inputhandler,addfeedback } from 'react'
import {Row,Col,CardImg, CardHeader,Form, FormGroup, Label, Input, Button} from 'reactstrap'
import TitleIcon from '@material-ui/icons/Title';
import{Redirect} from 'react-router-dom'
import DescriptionIcon from '@material-ui/icons/Description';
import EmailIcon from '@material-ui/icons/Email';
import axios from 'axios'

export default class Contact extends Component {
    state={
      
      title:'',
      description:'',
      message:'',
      config : {
        headers : {'authorization': `Bearer ${localStorage.getItem('token')}`}
    }
    }
    inputhandler=(e)=>{
      this.setState({
          [e.target.name]:e.target.value
      })
  }
  addfeedback=(e)=>{
    e.preventDefault();
    axios.post('http://localhost:90/addfeedback',this.state ,this.state.config)
    .then((responce)=>{
      console.log(responce.data.data)
      this.setState({
        message:responce.data.message
      })
      
    })
    .catch((err)=>{
      console.log(err)
      
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
                    <CardImg top width="500" 
                    src="https://cdn.pixabay.com/photo/2017/12/02/14/38/contact-us-2993000_960_720.jpg" alt="Image of Contact us" />
                    </Col>
                    <Col className="jumbotron">
                    <CardHeader>
                      <h4> Send Your Feedback !!</h4>
                      <p className="text-success">{this.state.message}</p>
                    </CardHeader>
                    <Form className="mt-4">
                    {/* <FormGroup row>
                      <Label for="exampleEmail" sm={2} ><EmailIcon color="secondary"/>Email</Label>
                      <Col sm={10}>
                        <Input type="email" name="email" id="exampleEmail" 
                        placeholder="Someone@gmail.com" required="true"
                        value={this.state.email} onChange={this.inputhandler} 
                        />
                      </Col>
                    </FormGroup> */}
                    <FormGroup row>
                      <Label for="exampleEmail2" sm={2}><TitleIcon color="secondary"/>Title</Label>
                      <Col sm={10}>
                        <Input type="text" name="title" id="exampleEmail2" placeholder="Enter Title" 
                        value={this.state.title} onChange={this.inputhandler}  required="true"/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="exampleEmail2" sm={2}>
                      <DescriptionIcon color="secondary"/>Description</Label>
                      <Col sm={10}>
                        <Input type="textarea" name="description" id="exampleEmail2" 
                        placeholder="Enter Description"  required="true" minLength="4"
                        value={this.state.description} onChange={this.inputhandler} 
                        />
                      </Col>
                    </FormGroup>
                    <Button type="submit" className="float-right" color="primary"
                    onClick={this.addfeedback}>Send Feedback</Button>
                  </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}
