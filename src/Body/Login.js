import React, { Component, state, login,chklogin,handleValidation} from 'react'
import {Form ,Button, Jumbotron,Row,Col} from 'react-bootstrap'

import axios from 'axios'
import ErrorIcon from '@material-ui/icons/Error';
class Login extends Component{

  state={
    email:'',
    password:'',
    chklogin:false,
    message:'',
    errormessage:'',
    erroremail:'',
    errorpassword:''
  }
  handleValidation=()=>{
    let erroremail="";
    let errorpassword="";

    if(!this.state.email){
      erroremail='Email cannot be Empty'
    }
    if(!this.state.password){
      errorpassword='Password cannot be Empty'
    }
    if(!this.state.email.includes('@')){
      erroremail='Invalid email';
    }
    if(erroremail||errorpassword){
        this.setState({erroremail,errorpassword});
        return false;
    }

    return true;
  }

  login=(e)=>{
    e.preventDefault();
    const isValid=this.handleValidation();
    if(isValid){
          const data={
            email:this.state.email,
            password:this.state.password
          }
          axios.post("http://localhost:90/user/login",data)
          .then((response)=>{
            console.log(response)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('userType', response.data.userType)
            this.setState({
              chklogin:true,
              message:response.data.message

            })
          })
          .catch((err)=>{
          this.setState({
            errormessage:err.response.data.message
          })
          })
      }
  }
    render(){
      // redirect
      if(localStorage.getItem('token')){
        window.location.href='/'
        // return <Redirect to='/'/>
      }
      // if(this.state.message){
      //   var msg=this.state.message
      // }
    
    return (
        <div>
        
        <Row>
        
       
    
          <Col>
          <img src="https://cdn.pixabay.com/photo/2016/02/19/10/00/laptop-1209008_960_720.jpg"
                  alt="Image of technology" className="image_reg"></img>
          </Col>
          <Col>
          <Jumbotron>
                    <div className="card-header">
                        <h2 className="text-success">Login page!!</h2>
                        
                        <div class="alert alert-danger" role="alert">
                        {this.state.errormessage}
                            </div>
                        <div class="alert alert-success" role="alert">
                        {this.state.message}
                            </div>
                    </div>
                        <Form onSubmit={this.login}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" 
                  value={this.state.email}
                onChange={(event)=>this.setState({email:event.target.value})}
                // required

                />
                <span style={{color: "red"}}><ErrorIcon color="danger"/>{this.state.erroremail}</span>
                
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="*********"
                value={this.state.password}
                onChange={(event)=>this.setState({password:event.target.value})}
                // required 
                minLength="6"/>
                <span style={{color: "red"}}><ErrorIcon color="danger"/>{this.state.errorpassword}</span>
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit" block>
                Submit
              </Button>
            </Form>
            </Jumbotron>
          </Col>
        </Row>
        
        </div>
    )
    }
}

export default Login
