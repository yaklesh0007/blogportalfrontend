import React, { Component,state,deleteblog,handleEventChange,getblogsingle,open,updateblog } from 'react'
import{Button, Col,Row,Table,Modal, ModalHeader, ModalBody, ModalFooter,Form,Input} from 'reactstrap'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
export default class Showyourpost extends Component {
    state={
        blogs:[],
        config : {
            headers : {'authorization': `Bearer ${localStorage.getItem('token')}`}
        },
        currentblog:{},
        isedit:false
        
    }
componentDidMount(){
    axios.get('http://localhost:90/showmypost',this.state.config)
    .then((responce)=>{
        this.setState({
            blogs:responce.data.data
        })
            
    })
    .catch((err)=>{
            alert("unable to load data")
    })
}
open=()=>{
    this.setState({
        isedit:!this.state.isedit
    })
}
handleEventChange = (e) => {
    this.setState({
        currentblog: { ...this.state.currentblog, [e.target.name]: e.target.value }
    })
}
deleteblog=(id,userID)=>{
    axios.delete('http://localhost:90/post/delete/'+id+'/'+userID, this.state.config)
    .then((responce)=>{
        alert("deleted Successfully !!")
        window.location.href="/showmypost"
    })
    .catch((err)=>{
        alert("Unable to delete !!")
        window.location.href="/showmypost"
    })
}
getblogsingle=(id)=>{
    axios.get('http://localhost:90/blogs/single/'+id, this.state.config)
    .then((responce)=>{
        
        this.setState({
           currentblog:responce.data.data,
            isedit:!this.state.isedit

        })
        
    })
    .catch((err)=>{
        alert("unable to get data")
    })
}
updateblog=(id)=>{
    console.log(this.state.currentblog)
    axios.put('http://localhost:90/post/updates/'+id, this.state.currentblog, this.state.config)
            .then((responce)=>{
                alert("successfully updated the blog !!")
                window.location.href='/showmypost'
            })
            .catch((err)=>{
                alert("not allowed to edit the post !!")
                window.location.href='/showmypost'
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
                    <Table dark bordered>
      <thead>
        <tr>
          <th>S.N</th>
          <th>Title</th>
          <th>Description</th>
          <th>Category</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {
      this.state.blogs.map((blog,i)=>{
              return (
        <tr>
          <th scope="row">{i+1}</th>
          <td>{blog.title}</td>
          <td>{blog.description}</td>
          <td>{blog.category}</td>
          <td><img height="100" width="100"
          src={'http://localhost:90/images/'+blog.image} alt={'this is image of '+blog.title}></img></td>
          <td>
              <Row>
                  <Col><Button color="danger"
                  onClick={this.deleteblog.bind(this, blog._id, blog.userID)}
                  >Delete</Button></Col>
                  <Col><Button color="success" 
                  onClick={this.getblogsingle.bind(this,blog._id)}>Update</Button></Col>
              </Row>
          </td>
        </tr>
        )
         })
      }
      
      
      </tbody>
    </Table>
                    </Col>
                </Row>
                <Row>
                <Modal isOpen={this.state.isedit}
                    
                    >
                       <ModalHeader >Update Post</ModalHeader>
                       <ModalBody>
                      <Form>
                          <Input name="title" value={this.state.currentblog.title}
                          onChange={this.handleEventChange} required="true"></Input>
                          <Input type="hidden" name="userID" value={this.state.currentblog.userID}
                           onChange={this.handleEventChange}   
                          />
                        <Input name="description" type="textarea" value={this.state.currentblog.description}
                            onChange={this.handleEventChange} required="true"
                        />
                        <Input type="select" name="category" placeholder="Select Your " value={this.state.currentblog.category}
                    onChange={this.handleEventChange} required="true">
                        <option value="">Choose</option>
                       <option value="Social" selected={this.state.currentblog.category==="Social"}>Social</option>
                       <option value="IT" selected={this.state.currentblog.category==="IT"}>IT</option>
                       <option value="Personal development" selected={this.state.currentblog.category==="Personal development"}>Personal development</option>
                       <option value="Science and technology" selected={this.state.currentblog.category==="Science and technology"}>Science and technology</option>
                       <option value="Astrology" selected={this.state.currentblog.category==="Astrology"}>Astrology</option>
                       <option value="Political" selected={this.state.currentblog.category==="Political"}>Political</option>
                       </Input>

                          <Button className="btn btn-primary mt-2" onClick= {()=>this.updateblog(this.state.currentblog._id)} >
                               Save changes
                          </Button>
                      </Form>
                       </ModalBody>

                       <ModalFooter>
                       
                       <Button className="btn btn-danger" onClick={this.open}>Cancel</Button>
                       </ModalFooter>
                   </Modal>
                </Row>
            </div>
        )
    }
}
