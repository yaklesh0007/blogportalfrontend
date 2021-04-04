import React, { Component } from 'react'
import {Col,Row,Container,Form, Button,Input,NavLink} from 'reactstrap'
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import ShopIcon from '@material-ui/icons/Shop';
import StoreIcon from '@material-ui/icons/Store';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import LanguageIcon from '@material-ui/icons/Language';
import EmojiSymbolsIcon from '@material-ui/icons/EmojiSymbols';
import IconButton from '@material-ui/core/IconButton'
import { FormGroup } from '@material-ui/core';
export default class Footer extends Component {
    render() {
        return (
            <div className="container-fluid footer mt-4">
            <Container >
                <Row>
                    <Col>
                    <h6 className="text-white"><EmojiSymbolsIcon className="mr-2" />Tech Related</h6>
                    <NavLink href="https://www.ted.com/talks" className="navlinks">ted</NavLink>
                    <NavLink href="https://thenextweb.com/" className="navlinks">thenextweb</NavLink>
                    </Col>
                    <Col>
                    <h6 className="text-white"><LanguageIcon className="mr-2" />Some Useful Sites</h6>
                    <NavLink href="https://www.pinterest.com/" className="navlinks">pinterest</NavLink>
                    <NavLink href="https://www.freecodecamp.org/" className="navlinks">freecodecamp</NavLink>
                    <NavLink href="https://www.w3schools.com/" className="navlinks">w3schools</NavLink>
                    </Col>
                    <Col>
                    <h6 className="text-white"><ImportContactsIcon className="mr-2" />Magazine</h6>
                    <NavLink href="https://www.nationalgeographic.com/magazine/"
                    className="navlinks">nationalgeographic</NavLink>
                    <NavLink href="https://time.com/"
                    className="navlinks">time</NavLink>
                    </Col>
                    <Col>
                    <h6 className="text-white"><PhoneIphoneIcon className="mr-2"/>Apps</h6>
                    <Row>
                    
                        <Col>
                        <NavLink href="https://play.google.com/store/movies" className="navlinks"
                        >Play Store</NavLink>
                        
                        </Col>
                        <Col>
                       <NavLink href="https://www.apple.com/" 
                       className="navlinks">iStore</NavLink>
                        
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mt-2">
                        <h6 className="text-white"><SubscriptionsIcon className=""></SubscriptionsIcon>Subscribe</h6>
                        <Form>
                        <FormGroup>
                            <Input type="email" name="email" placeholder="Enter your email">
                            
                            </Input>
                            <Button color="danger" block className="mt-2">Subscribe</Button>
                            </FormGroup>
                        </Form>
                          
                        </Col>
                    </Row>
                    
                    </Col>
                </Row>

                <Row className="card-footer mt-4">
                    <Col>
                        <img src="https://softwarica.edu.np/wp-content/uploads/2019/01/cropped-Softwarica-logo.png" 
                        height="50" width="150"></img>
                    </Col>
                    <Col>
                    <p className="text-muted">&copy; Copyright 2021 Blog  developed by Aklesh yadav</p>
                    </Col>
                    <Col>
                        <Row xs="4">
                        <Col>
                                
                                    <NavLink href="https://facebook.com/">
                                    <IconButton>
                                    <FacebookIcon className="facebook-icon"></FacebookIcon>
                                    </IconButton>
                                    </NavLink>
                                </Col>
                                <Col>
                                
                                    <NavLink href="https://youtube.com/">
                                    <IconButton>
                                    <YouTubeIcon className="youtube-icon"></YouTubeIcon>
                                    </IconButton>
                                    </NavLink>
                                </Col>
                                <Col>
                                
                                    <NavLink href="https://twitter.com/">
                                    <IconButton>
                                    <TwitterIcon className="twitter-icon"></TwitterIcon>
                                    </IconButton>
                                    </NavLink>
                                </Col>
                                <Col>
                                
                                    <NavLink href="https://linkedin.com/">
                                    <IconButton>
                                    <LinkedInIcon className="linkedin-icon"></LinkedInIcon>
                                    </IconButton>
                                    </NavLink>
                                </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

            </div>
        )
    }
}

