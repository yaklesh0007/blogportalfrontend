import React, { Component, state, inputhandler, Addblog, e , filehandler,handleValidation } from 'react'
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import axios from 'axios'
export default class AddBlog extends Component {
    state={
        title:"",
        description:"",
        category:"",
        image:'',
        config : {
          headers : {'authorization': `Bearer ${localStorage.getItem('token')}`}
      },
      titleError:'',
      descriptionError:'',
      categoryError:'',
      imageError:'',
    }
    handleValidation=()=>{
          let titleError='';
          let descriptionError='';
          let categoryError='';
          let imageError='';
          if(!this.state.title){
            titleError='title cannot be Empty';
        }else if(!this.state.description){
          descriptionError='Description cannot be Empty';
        }else if(!this.state.category){
            categoryError='category cannot be Empty';
        }else if(!this.state.image){
          imageError='image cannot be Empty';
        }
        if(titleError||descriptionError||categoryError||imageError){
          this.setState({
            titleError,
            descriptionError,
            categoryError,
            imageError
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
      filehandler=(e)=>{
        this.setState({
          image : e.target.files[0]
      })
      }
      Addblog=(e)=>{
          e.preventDefault(); //default behaviour stop
          const isValid=this.handleValidation();
          if(isValid){
          const data =new FormData()

          data.append('title',this.state.title)
          data.append('description',this.state.description)
          data.append('category',this.state.category)
          data.append('image',this.state.image)
          axios.post('http://localhost:90/blog/insert' , data , this.state.config)
          
          .then((response)=>{
                console.log(response)
                alert("blog added Successfully !!")
                window.location.href='/'
          })
          .catch((e)=>{
             console.log(e)
          })
        }
          
      }
    render() {
        return (
          <div>
            <Row>
              <Col>
              <img src="https://cdn.pixabay.com/photo/2018/03/19/18/20/tea-time-3240766_960_720.jpg"
                  alt="Image of tea time poetry" className="image_reg"></img>
              </Col>
              <Col>
              <div className="card jumbotron">
            <h3 className="text-success">Add Blog</h3>
                 <Form>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input type="text" name="title" id="title" placeholder="Enter title"
        value={this.state.title} onChange={this.inputhandler} required="true"
          maxLength="50" minLength="4"
        />
        <span style={{color: "red"}}>{this.state.titleError}</span>
      </FormGroup>
      
      <FormGroup>
        <Label for="exampleSelect">Categories</Label>
        <Input type="select" name="category" placeholder="Select Your " value={this.state.category}
                    onChange={this.inputhandler} required="true">
                        <option value="">Choose</option>
                       <option value="Social" selected={this.state.category==="Social"}>Social</option>
                       <option value="IT" selected={this.state.category==="IT"}>IT</option>
                       <option value="Personal development" selected={this.state.category==="Personal development"}>Personal development</option>
                       <option value="Science and technology" selected={this.state.category==="Science and technology"}>Science and technology</option>
                       <option value="Astrology" selected={this.state.category==="Astrology"}>Astrology</option>
                       <option value="Political" selected={this.state.category==="Political"} >Political</option>
                       </Input>
                       <span style={{color: "red"}}>{this.state.categoryError}</span>
      </FormGroup>
      <FormGroup>
        <Label for="exampleFile">File</Label>
        <Input type="file" name="image" id="exampleFile"
            onChange={this.filehandler}
        required/>
        <span style={{color: "red"}}>{this.state.imageError}</span>
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input type="textarea" name="description" id="description" value={this.state.description}
            onChange={this.inputhandler}
        required
          maxLength="200"
        />
        <span style={{color: "red"}}>{this.state.descriptionError}</span>
      </FormGroup>
      
      
      <Button onClick={this.Addblog} color="primary" block>Submit</Button>
    </Form>
            </div>
              </Col>
            </Row>
          
            
            </div>
        )
    }
}
