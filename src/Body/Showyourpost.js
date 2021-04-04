import React, { Component,state } from 'react'
import{Button, Col,Row} from 'reactstrap'
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
        console.log(responce)
        this.setState({
            blogs:this.responce.data
        })
            
    })
    .catch((err)=>{

    })
}
    render() {
        return (
            <div>
                <Row>
                    <Col>

                    </Col>
                    <Col>
                    <Table bordered>
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
          <td><img src={'http://localhost:90/images/'+blog.image} alt={'this is image of '+blog.title}></img></td>
          <td>
              <Row>
                  <Col><Button color="danger"></Button></Col>
                  <Col><Button color="success"></Button></Col>
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
