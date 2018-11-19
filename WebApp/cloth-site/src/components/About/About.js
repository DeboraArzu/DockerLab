import React, { Component } from 'react';
import './About.css'
import { Well, Grid, Row, Col } from 'react-bootstrap'
import Logo from '../img/logo.png'

class About extends Component {
    render() {
        return (
            <div>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={6} md={4}>
                            <div className="content">
                                <img height={110} width={80} src={Logo}></img>
                            </div>
                        </Col>
                    </Row>
                </Grid>
                <div className="content" >
                    <Well className="Well">
                        <h1>This page was Made By Debora Arzu</h1>
                        <h2>Carné 1098913</h2>
                    </Well>
                </div>
            </div>
        )
    }
}
export default About;