import axios from 'axios';
import React, { Component, state, inputhandler,updateData } from 'react'

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
export default class UpdateBlog extends Component {
  state={
    title:"",
    description:"",
    category:"",
    config : {
      headers : {'authorization': `Bearer ${localStorage.getItem('token')}`}
  },
    id:this.props.match.params.id,
    userID:""
}
  inputhandler=(e)=>{
      this.setState({
          [e.target.name]:e.target.value
      })
  }

  componentDidMount(){
    axios.get('http://localhost:90/blog/single/' + this.state.id, this.state.config)
    .then((response)=>{
      console.log(response)
        this.setState({
            title : response.data.data.title,
            description : response.data.data.description,
            category : response.data.data.category,
            userID:response.data.data.userID
        })   

      
    })
    .catch((err)=>{
        console.log(err.response)
    })
}
updateData = (e)=>{
  e.preventDefault();
  axios.put('http://localhost:90/post/update/'+this.state.id, this.state, this.state.config)
  .then((response)=>{
      console.log(response)
  })
  .catch((err)=>{
      console.log(err.response)
  })
}

    render() {
        return (
          <div className="card jumbotron">
          <h3 className="text-success">Update Blog</h3>
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
    {/* <FormGroup>
      <Label for="exampleFile">File</Label>
      <Input type="file" name="image" id="exampleFile" value={this.state.image}
          onChange={this.inputhandler}
      />
      <FormText color="muted">
        This is some placeholder block-level help text for the above input.
        It's a bit lighter and easily wraps to a new line.
      </FormText>
    </FormGroup> */}
    <FormGroup>
      <Label for="description">Description</Label>
      <Input type="textarea" name="description" id="description" value={this.state.description}
          onChange={this.inputhandler}
      />
    </FormGroup>
    
    
    <Button onClick={this.updateData} color="primary" block>Submit</Button>
  </Form>
          </div>
        )
    }
}
