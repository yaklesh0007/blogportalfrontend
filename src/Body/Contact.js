import React, { Component,defaultProps, AIzaSyCPgje2ZsNHbvWaQl3mld44s_FBikbTHhc } from 'react'
import {Row,Col} from 'reactstrap'
import GoogleMapReact from 'google-map-react';
const AnyReactComponent = ({ text }) => <div>{text}</div>;
const handleApiLoaded = (map, maps) => {
    // use map and maps objects
  };
export default class Contact extends Component {
    static defaultProps = {
        center: {
          lat: 59.95,
          lng: 30.33
        },
        zoom: 11
      };
      
    render() {
        return (
            <div>
                <Row>
                    <Col>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: AIzaSyCPgje2ZsNHbvWaQl3mld44s_FBikbTHhc }}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                        yesIWantToUseGoogleMapApiInternals
                        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                      >
                        <AnyReactComponent
                          lat={59.955413}
                          lng={30.337844}
                          text="My Marker"
                        />
                      </GoogleMapReact>
                      
                    </Col>
                    <Col className="jumbotron">
                      
                    </Col>
                </Row>
            </div>
        )
    }
}
