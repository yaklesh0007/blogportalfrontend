import React, { Component, state, login,chklogin} from 'react'
import {Form ,Button, Jumbotron,Row,Col} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
class Login extends Component{

  state={
    email:'',
    password:'',
    chklogin:false
  }
  login=(e)=>{
    e.preventDefault();
    const data={
      email:this.state.email,
      password:this.state.password
    }
    axios.post("http://localhost:90/user/login",data)
    .then((response)=>{
      console.log(response)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('userType', response.data.userType)
      this.state({
        chklogin:true
      })
    })
    .catch((err)=>{
      console.log(err)
    })
  }
    render(){
      // redirect
      if(chklogin===true){
        return <Redirect to='/dashboard'/>
      }
    
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
                    </div>
                        <Form onSubmit={this.login}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" 
                  value={this.state.email}
                onChange={(event)=>this.setState({email:event.target.value})}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"
                value={this.state.password}
                onChange={(event)=>this.setState({password:event.target.value})} />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit">
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
