import React, { Component,state, register,handleValidation } from 'react'
import{Form,Button} from 'react-bootstrap'
import {Row, Col} from 'reactstrap'
import axios from 'axios'
import{Input} from 'reactstrap'

class Register extends Component {
  state={
    email:"",
    password:"",
    username:"",
    gender:"",
    userType:"normaluser",
    phone:"",
    message:'',

    genderError:'',
    usernameError:'',
    phoneError:'',
    emailError:'',
    passwordError:'',
    errors:{}
  }
  handleValidation=()=>{
    let usernameError='';
    let genderError='';
    
    let phoneError='';
    let emailError='';
    let passwordError='';

    if(!this.state.username){
      usernameError='Full Name cannot be Empty';
    }else if(!this.state.gender){
      genderError='Gender cannot be Empty';
    }
    else if(!this.state.phone){
        phoneError='Contact Number cannot be Empty';
    }else if(!this.state.email){
        emailError='Email cannot be Empty';
    }else if(!this.state.email.includes('@')){
        emailError='Invalid Email Address';
    }else if(!this.state.password){
        passwordError='Password cannot be Empty';
    }if(usernameError||genderError||phoneError||emailError||passwordError){
        this.setState({
          usernameError,
            genderError,
            phoneError,
            emailError,
            passwordError
        })
        return false;
    }
    return true;
 };
  
  register=(e)=>{
    e.preventDefault();
    const isValid=this.handleValidation();
    if(isValid){
  const senduserData={
    email:this.state.email,
    password:this.state.password,
    username:this.state.username,
    gender:this.state.gender,
    userType:this.state.userType,
    phone:this.state.phone
  }

  console.log(senduserData);
  axios.post("http://localhost:90/user/insert",senduserData)
  .then(function(result){
      console.log(result)
      alert("Register Successfully !!")
      window.location.href='/'
  })
  .catch((e)=>{
    
    // if(e.response?.data?.errors){
    //   this.setState({
    //     message:e.response.data.errors.map(x=>x.message).join('<br/>')
    //   })
    // }
    alert("user already exit")
    
  })
}
}
  

    render(){
    return (
        <div >
        <Row >
          <Col sm="6">
              
                  <img src="https://cdn.pixabay.com/photo/2016/02/19/10/00/laptop-1209008_960_720.jpg"
                  alt="Image of technology" className="image_reg"></img>
              
          </Col>
          <Col>
          <div>
            <p className="text-danger" 
            >
              {this.state.message}
            </p>
          </div>
          <div className="jumbotron">
          <div className="card-header">
                          <h3 className="card-title text-primary">Sign Up here!!</h3>
                        </div>
                      
                          <Form onSubmit={this.register} className="mt-2" >
                          <Form.Group controlId="forFullname">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" placeholder="Full name" value={this.state.username}
                  onChange={(event)=>this.setState({username:event.target.value})}/>
                  <span style={{color: "red"}}>{this.state.usernameError}</span>
                </Form.Group>
                <Form.Group controlId="foruserType">
                  
                  <Form.Control type="text" placeholder="Full name" value={this.state.userType} hidden/>
                </Form.Group>
                <Form.Group controlId="forgender">
                  <Form.Label>Gender</Form.Label>
                  <Input type="select" name="gender" placeholder="Select Your Gender" value={this.state.gender}
                                  onChange={(event)=>{this.setState({gender: event.target.value})}} required="true">
                                    <option>Choose</option>
                                    <option value="Male" selected={this.state.gender==="Male"}>Male</option>
                                    <option value="FeMale" selected={this.state.gender==="FeMale"}>FeMale</option>
                                    <option value="Others" selected={this.state.gender==="Others"}>Others</option>
                                    </Input>
                                    <span style={{color: "red"}}>{this.state.genderError}</span>
                </Form.Group>
                <Form.Group controlId="forPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="text" placeholder="Phone number" value={this.state.phone}
                  onChange={(event)=>this.setState({phone:event.target.value})}/>
                  <span style={{color: "red"}}>{this.state.phoneError}</span>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" value={this.state.email}
                  onChange={(event)=>this.setState({email:event.target.value})} />
                 <span style={{color: "red"}}>{this.state.emailError}</span>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password"  
                  value={this.state.password}
                  onChange={(event)=>this.setState({password:event.target.value})}/>
                  <span style={{color: "red"}}>{this.state.passwordError}</span>
                </Form.Group>

                
                <Button variant="primary" type="submit">
                  Register
                </Button>
              </Form>
              </div>
          </Col>
        </Row>
                      
      </div>  
    )
    }
}

export default Register
