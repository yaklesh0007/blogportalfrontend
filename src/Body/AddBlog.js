import React, { Component, state, inputhandler, Addblog, e , filehandler } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
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
          })
          .catch((e)=>{
              console.log(e)
          })
          
      }
    render() {
        return (
            <div className="card jumbotron">
            <h3 className="text-success">Add Blog</h3>
                 <Form>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input type="text" name="title" id="title" placeholder="Enter title"
        value={this.state.title} onChange={this.inputhandler}/>
      </FormGroup>
      
      <FormGroup>
        <Label for="exampleSelect">Categories</Label>
        <Input type="select" name="category" placeholder="Select Your " value={this.state.category}
                    onChange={this.inputhandler} required>
                        <option value="">Choose</option>
                       <option value="Social" selected={this.state.category==="Social"}>Social</option>
                       <option value="IT" selected={this.state.category==="IT"}>IT</option>
                       <option value="Personal development" selected={this.state.category==="Personal development"}>Personal development</option>
                       <option value="Science and technology" selected={this.state.category==="Science and technology"}>Science and technology</option>
                       <option value="Astrology" selected={this.state.category==="Astrology"}>Astrology</option>
                       <option value="Political" selected={this.state.category==="Political"}>Political</option>
                       </Input>
      </FormGroup>
      <FormGroup>
        <Label for="exampleFile">File</Label>
        <Input type="file" name="image" id="exampleFile"
            onChange={this.filehandler}
        />
        
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input type="textarea" name="description" id="description" value={this.state.description}
            onChange={this.inputhandler}
        />
      </FormGroup>
      
      
      <Button onClick={this.Addblog} color="primary" block>Submit</Button>
    </Form>
            </div>
        )
    }
}
