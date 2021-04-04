import React, { Component,state,deleteblog } from 'react'
import{Button, Col,Row,Table} from 'reactstrap'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
export default class Showyourpost extends Component {
    state={
        blogs:[],
        config : {
            headers : {'authorization': `Bearer ${localStorage.getItem('token')}`}
        },
        currentblog:{},
        isedit:false,
        iscancel:false
    }
componentDidMount(){
    axios.get('http://localhost:90/showmypost',this.state.config)
    .then((responce)=>{
        console.log(responce.data.data)
        this.setState({
            blogs:responce.data.data
        })
            
    })
    .catch((err)=>{
            alert("unable to load data")
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
      this.state.blogs.map((blog)=>{
              return (
        <tr>
          <th scope="row">1</th>
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
                  <Col><Button color="success">Update</Button></Col>
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
                
            </div>
        )
    }
}
