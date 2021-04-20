import React, { Component,state,inputhandler,addfeedback,handleValidation } from 'react'
import {Row,Col,CardImg, CardHeader,Form, FormGroup, Label, Input, Button} from 'reactstrap'
import TitleIcon from '@material-ui/icons/Title';
import{Redirect} from 'react-router-dom'
import DescriptionIcon from '@material-ui/icons/Description';

import axios from 'axios'

export default class Contact extends Component {
    state={
      
      title:'',
      description:'',
      message:'',
      config : {
        headers : {'authorization': `Bearer ${localStorage.getItem('token')}`}
    },
    titleError:'',
    descriptionError:''
    }
    handleValidation=()=>{
      let titleError='';
      let descriptionError='';
      
      
      if(!this.state.title){
        titleError='title cannot be Empty';
    }else if(!this.state.description){
      descriptionError='Description cannot be Empty';
    }
    if(titleError||descriptionError){
      this.setState({
        titleError,
        descriptionError
      })
      return false;
    }
    return true;
    
    }

    inputhandler=(e)=>{
      this.setState({
          [e.target.name]:e.target.value
      })
  }
  addfeedback=(e)=>{
    e.preventDefault();
    const isValid=this.handleValidation();
  if(isValid){
    axios.post('http://localhost:90/addfeedback',this.state ,this.state.config)
    .then((responce)=>{
     
      this.setState({
        message:responce.data.message
      })
      window.location.href='/'
      
    })
    .catch((err)=>{
      console.log(err)
      
    })
  }
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
                      <h4> Add an Interesting Quotes !!</h4>
                      <p className="text-success">{this.state.message}</p>
                    </CardHeader>
                    <Form className="mt-4">
                    
                    <FormGroup row>
                      <Label for="exampleEmail2" sm={2}><TitleIcon color="secondary"/>Title</Label>
                      <Col sm={10}>
                        <Input type="text" name="title" id="exampleEmail2" placeholder="Enter Title" 
                        value={this.state.title} onChange={this.inputhandler}  required="true"/>
                      </Col>
                        <span style={{color: "red"}}>{this.state.titleError}</span>

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
                          <span style={{color: "red"}}>{this.state.descriptionError}</span>

                    </FormGroup>
                    <Button type="submit" className="float-right" color="primary"
                    onClick={this.addfeedback}>Add Quaotes</Button>
                  </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}
