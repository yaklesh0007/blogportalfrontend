import React, { Component } from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import Register from './Register'
import {Route} from 'react-router-dom';
import Login from './Login'
import Home from './Home'
import Updateblog from './UpdateBlog'
import addblog from './AddBlog'
import contact from './Contact'
class Body extends Component {
    render(){
    return (
        <div className="Body_md">
            <Container>
                <Row>
                
                    <Col>
                    <Route path="/" exact component={Home}/>
                    <Route path="/reg" exact component={Register}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/updateblog/:id" exact component={Updateblog}/>
                     <Route path="/addblog" exact component={addblog}/>
                     <Route path="/contact" exact component={contact}/>
                    </Col>
                   
                </Row>
                
               
            </Container>
        </div>
    )
    }
}

export default Body
