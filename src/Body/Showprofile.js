import axios from 'axios'
import React, { Component,state,inputhandler } from 'react'
import {Col, Row, CardTitle, CardSubtitle, CardText,CardBody,Card,Button,Input,
Label,FormGroup,Form,CardImg
} from 'reactstrap'
import {Redirect} from 'react-router-dom'
import EmailIcon from '@material-ui/icons/Email';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExposureIcon from '@material-ui/icons/Exposure';
import PhoneIcon from '@material-ui/icons/Phone';
import PhotoIcon from '@material-ui/icons/Photo';
export default class Showprofile extends Component {
    state={
        email:"",
        password:"",
        username:"",
        gender:"",
        phone:"",
        config : {
            headers : {'authorization': `Bearer ${localStorage.getItem('token')}`}
        },
        image:''
      }
      inputhandler=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
      componentDidMount(){
          axios.get('http://localhost:90/user/profile',this.state.config)
          .then((response)=>{
            console.log(response)
              this.setState({
                  email:this.response.data.email,
                  username:this.response.data.username,
                phone:this.response.data.phone,
                gender:this.response.gender,
                image:this.response.data.image
              })

          })
          .catch((e)=>{

          })
      }
    render()
    {
        if(!localStorage.getItem('token')){
            return <Redirect to='/login'/>
        }
        return (
            <div>
                <Row>
                    <Col>
                    <h3 className="text-success card-header">Update Your Profile</h3>
                 <Form>
      {/* <FormGroup>
        <Label for="email" className="text-primary"><EmailIcon color="secondary" className="mr-2"></EmailIcon><b>Email</b></Label>
        <Input type="email" name="email" id="email" placeholder="Enter Email"
        value={this.state.email} onChange={this.inputhandler}/>
      </FormGroup> */}
      <FormGroup>
        <Label for="username" className="text-primary"><AccountBoxIcon color="secondary" className="mr-2"></AccountBoxIcon><b>Username</b></Label>
        <Input type="text" name="username" id="username" placeholder="Enter Username"
        value={this.state.username} onChange={this.inputhandler}/>
      </FormGroup>
      
      <FormGroup>
        <Label for="exampleSelect" className="text-primary"><ExposureIcon color="secondary" className="mr-2"></ExposureIcon><b>Gender</b></Label>
        <Input type="select" name="gender" placeholder="Select Your " value={this.state.gender}
                    onChange={this.inputhandler} required>
                        <option value="">Choose</option>
                       <option value="Male" selected={this.state.gender==="Male"}>Male</option>
                       <option value="Female" selected={this.state.gender==="Female"}>Female</option>
                       
                       <option value="Other" selected={this.state.gender==="Other"}>Other</option>
                       
                       </Input>
      </FormGroup>
      <FormGroup>
        <Label for="exampleFile" className="text-primary "><PhotoIcon color="secondary" className="mr-2"></PhotoIcon><b>File</b></Label>
        <Input type="file" name="image" id="exampleFile"
            onChange={this.filehandler}
        />
        
      </FormGroup>
      <FormGroup>
        <Label for="phone" className="text-primary"><PhoneIcon color="secondary" className="mr-2"></PhoneIcon><b>Phone</b></Label>
        <Input type="number" name="phone" id="Phone" value={this.state.phone}
            onChange={this.inputhandler}
        />
      </FormGroup>
      
      
      <Button onClick={this.updateprofile} color="primary" block>Update profile</Button>
    </Form>
                    </Col>
                    <Col>
                    <Card>
                    <CardImg top className="image_profile" src={this.state.image} alt={this.state.username} />
                    <CardBody>
                    <CardTitle tag="h6" ><EmailIcon color="secondary" className="mr-2"></EmailIcon> {this.state.email}</CardTitle>
                    <CardSubtitle tag="h6" ><AccountBoxIcon color="secondary" className="mr-2"></AccountBoxIcon> {this.state.username}</CardSubtitle>
                    <CardText><ExposureIcon color="secondary" className="mr-2"></ExposureIcon>{this.state.gender}</CardText>
                    <CardText><PhoneIcon color="secondary" className="mr-2"></PhoneIcon>{this.state.phone}</CardText>
                    
                    </CardBody>
                     </Card>
                    </Col>
                </Row>
            </div>
        )
    }
    
}
