import React, { Component } from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import Register from './Register'
import {Route} from 'react-router-dom';
import Login from './Login'
import Home from './Home'
class Body extends Component {
    render(){
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Route path="/reg" exact component={Register}/>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/" exact component={Home}/>
                    </Col>
                    <Col>hallween</Col>
                    <Col>Happy!</Col>
                </Row>
            </Container>
        </div>
    )
    }
}

export default Body
