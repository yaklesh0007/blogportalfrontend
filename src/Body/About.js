import React, { Component } from 'react'
import {Col,Row,Card, CardImg, CardText, CardBody,CardFooter,
    CardTitle} from 'reactstrap'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EmailIcon from '@material-ui/icons/Email';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import IconButton from '@material-ui/core/IconButton'
export default class About extends Component {
    
    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <div className="col-sm-12">
                        <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3532.374693052037!2d85.327539!3d27.7057152!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a0a7230f43%3A0x18e4d56d8c3ab0a9!2sSoftwarica%20College!5e0!3m2!1sen!2snp!4v1617343683676!5m2!1sen!2snp"
                        width="500" height="600"
                        className="map" allowfullscreen="" loading="lazy"></iframe>
                        </div>
                    </Col>
                    <Col>
                    <Card>
                        <CardImg top width="100%" src="https://pbs.twimg.com/media/Di77fWUW4AAnlk_.jpg" alt="Image of Softwarica College" />
                        <CardBody>
                        <CardTitle tag="h5">Softwarica College of IT and E-Commerce</CardTitle>
                        
                        <CardText><LocationOnIcon color="secondary" className="mr-2"></LocationOnIcon><b><i> Mahakabi marga </i>, Kathmandu </b></CardText>
                        <CardText className="text-primary"><EmailIcon color="secondary" className="mr-2"></EmailIcon><b><i> softwarica.edu.np </i> </b></CardText>
                        <CardText className="text-info"><ContactPhoneIcon color="secondary" className="mr-2"></ContactPhoneIcon><b> +071-2312313, 9318101313 </b></CardText>
                        </CardBody>
                        <CardFooter>
                        <CardText className="text-primary"><b>Follow us</b> </CardText>
                            <Row>
                                <Col>
                                <IconButton>
                                    <FacebookIcon className="facebook-icon" href="https://facebook.com/"></FacebookIcon>
                                    </IconButton>
                                </Col>
                                <Col>
                                <IconButton>
                                    <YouTubeIcon className="youtube-icon" href="https://youtube.com/"></YouTubeIcon>
                                    </IconButton>
                                </Col>
                                <Col>
                                <IconButton>
                                    <TwitterIcon className="twitter-icon" href="https://twitter.com/"></TwitterIcon>
                                    </IconButton>
                                </Col>
                                <Col>
                                <IconButton>
                                    <LinkedInIcon className="linkedin-icon" href="https://linkedin.com/"></LinkedInIcon>
                                    </IconButton>
                                </Col>
                            </Row>
                        </CardFooter>
                    </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
