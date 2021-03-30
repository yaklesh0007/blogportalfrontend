import axios from 'axios'
import React, { Component,state,inputhandler } from 'react'
import {Col, Row} from 'reactstrap'
export default class Showprofile extends Component {
    state={
        email:"",
        password:"",
        username:"",
        gender:"",
        phone:"",
        config : {
            headers : {'authorization': `Bearer ${localStorage.getItem('token')}`}
        }
      }
      inputhandler=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
      componentDidMount(){
          axios.get('http://localhost:90/user/profile',this.state.config)
          .then((response)=>{
              this.setState({
                  email:this.response.data.email,
                  username:this.response.data.username,
                phone:this.response.data.phone,
                gender:this.response.data.gender

              })

          })
          .catch((e)=>{

          })
      }
    render()
    {
        if(localStorage.getItem('token')){
            return <Redirect to='/login'/>
        }
        return (
            <div>
                <Row>
                    <Col>
                    <h3 className="text-success">Your profile</h3>
                 <Form>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input type="email" name="email" id="email" placeholder="Enter Email"
        value={this.state.email} onChange={this.inputhandler}/>
      </FormGroup>
      <FormGroup>
        <Label for="username">Username</Label>
        <Input type="text" name="username" id="username" placeholder="Enter Username"
        value={this.state.username} onChange={this.inputhandler}/>
      </FormGroup>
      
      <FormGroup>
        <Label for="exampleSelect">Gender</Label>
        <Input type="select" name="gender" placeholder="Select Your " value={this.state.gender}
                    onChange={this.inputhandler} required>
                        <option value="">Choose</option>
                       <option value="Male" selected={this.state.gender==="Male"}>Male</option>
                       <option value="Female" selected={this.state.gender==="Female"}>Female</option>
                       
                       <option value="Other" selected={this.state.gender==="Other"}>Other</option>
                       
                       </Input>
      </FormGroup>
      <FormGroup>
        <Label for="exampleFile">File</Label>
        <Input type="file" name="image" id="exampleFile"
            onChange={this.filehandler}
        />
        
      </FormGroup>
      <FormGroup>
        <Label for="phone">Phone</Label>
        <Input type="number" name="phone" id="Phone" value={this.state.phone}
            onChange={this.inputhandler}
        />
      </FormGroup>
      
      
      <Button onClick={this.updateprofile} color="primary" block>Submit</Button>
    </Form>
                    </Col>
                    <Col>
                    <Card>
                    <CardImg top className="image_profile" src="/assets/318x180.svg" alt="Card image cap" />
                    <CardBody>
                    <CardTitle tag="h6" >email: {this.state.email}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">Password: {this.state.username}</CardSubtitle>
                    <CardText>Gender: {this.state.gender}</CardText>
                    <CardText>Phone :{this.state.phone}</CardText>
                    
                    </CardBody>
                     </Card>
                    </Col>
                </Row>
            </div>
        )
    }
    
}
