import React, { Component, state, inputhandler, Addblog, e , filehandler } from 'react'
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
      }
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
              alert("unable to add blog !!")
          })
          
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
      </FormGroup>
      <FormGroup>
        <Label for="exampleFile">File</Label>
        <Input type="file" name="image" id="exampleFile"
            onChange={this.filehandler}
        required/>
        
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input type="textarea" name="description" id="description" value={this.state.description}
            onChange={this.inputhandler}
        required
          maxLength="200"
        />
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
