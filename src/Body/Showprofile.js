import axios from 'axios'
import React, { Component,state,inputhandler, updateprofile,handleValidation,
filehandler} from 'react'
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
        image:'',
        message:'',
        genderError:'',
        usernameError:'',
        phoneError:'',
        imageError:''

      }
      handleValidation=()=>{
        let usernameError='';
        let genderError='';
        let phoneError='';
        let imageError='';
        if(!this.state.username){
          usernameError='Full Name cannot be Empty';
        }else if(!this.state.gender){
          genderError='Gender cannot be Empty';
        }
        else if(!this.state.phone){
            phoneError='Contact Number cannot be Empty';
        }
        else if(!this.state.image){
            imageError='Image required!!';
        }if(usernameError||genderError||phoneError||imageError){
            this.setState({
              usernameError,
                genderError,
                phoneError,
                imageError
            })
            return false;
        }
        return true;
     };

      inputhandler=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    filehandler=(e)=>{
      this.setState({
        image : e.target.files[0]
    })
    }
      componentDidMount(){
          axios.get('http://localhost:90/user/profile',this.state.config)
          .then((response)=>{
            console.log(response.data.data)
              this.setState({
                  email:response.data.data.email,
                  username:response.data.data.username,
                phone:response.data.data.phone,
                gender:response.data.data.gender,
                image:response.data.data.image
              })

          })
          .catch((er)=>{
             console.log(er)
          })
      }
      updateprofile=(e)=>{
        e.preventDefault();
        const isValid=this.handleValidation();
        if(isValid){
        const data =new FormData()

          data.append('username',this.state.username)
          data.append('gender',this.state.gender)
          data.append('phone',this.state.phone)
          data.append('image',this.state.image)
          axios.put('http://localhost:90/user/update' , data , this.state.config)
          
          .then((response)=>{
                console.log(response)
                this.setState({
                  message:response.data.message
                })
                alert("user information updated successfully !! ")
                window.location.href='/showprofile'
          })
          .catch((e)=>{
              console.log(e)
              alert("Something went wrong while updateing !!")
              window.location.href='/showprofile'
          })
        }
      }
    render()
    {
        if(!localStorage.getItem('token')){
            return <Redirect to='/login'/>
        }
        return (
            <div>
                <Row>
                    <Col className="jumbotron">
                    <h3 className="text-success card-header">Update Your Profile</h3>
                    <p className="text-primary">{this.state.message}</p>
                 <Form className="mt-2">
     
      <FormGroup>
        <Label for="username" className="text-primary"><AccountBoxIcon color="secondary" className="mr-2"></AccountBoxIcon><b>Username</b></Label>
        <Input type="text" name="username" id="username" placeholder="Enter Username"
        value={this.state.username} onChange={this.inputhandler} required="true"/>
                  <span style={{color: "red"}}>{this.state.usernameError}</span>
      </FormGroup>
      
      <FormGroup>
        <Label for="exampleSelect" className="text-primary"><ExposureIcon color="secondary" className="mr-2"></ExposureIcon><b>Gender</b></Label>
        <Input type="select" name="gender" placeholder="Select Your " value={this.state.gender}
                    onChange={this.inputhandler} required="true">
                        <option value="">Choose</option>
                       <option value="Male" selected={this.state.gender==="Male"}>Male</option>
                       <option value="Female" selected={this.state.gender==="Female"}>Female</option>
                       
                       <option value="Other" selected={this.state.gender==="Other"}>Other</option>
                       
                       </Input>
                       <span style={{color: "red"}}>{this.state.genderError}</span>

      </FormGroup>
      <FormGroup>
        <Label for="exampleFile" className="text-primary "><PhotoIcon color="secondary" className="mr-2"></PhotoIcon><b>File</b></Label>
        <Input type="file" name="image" id="exampleFile"
            onChange={this.filehandler}
        required="true"/>
                  <span style={{color: "red"}}>{this.state.imageError}</span>
        
      </FormGroup>
      <FormGroup>
        <Label for="phone" className="text-primary"><PhoneIcon color="secondary" className="mr-2"></PhoneIcon><b>Phone</b></Label>
        <Input type="number" name="phone" id="Phone" value={this.state.phone}
            onChange={this.inputhandler} maxLength="13"
            minLength="10"
        required="true"/>
                  <span style={{color: "red"}}>{this.state.phoneError}</span>

      </FormGroup>
      
      
      <Button onClick={this.updateprofile} color="primary" block>Update profile</Button>
    </Form>
                    </Col>
                    <Col>
                    <Card>
                    
                    <CardImg top className="img-round" width="100" height="100" 
                      src="https://cdn.pixabay.com/photo/2020/03/17/13/04/desert-4940300_960_720.jpg"
                      alt="image of desert area"
                    />
                    <div className="imagecenter">
                    <img src={'http://localhost:90/images/'+this.state.image} alt={this.state.username} 
                    height="100"
                    width="100"
                    className="rounded-circle  "></img>
                    </div>
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
