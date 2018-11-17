import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import shopping from '../img/shopping.jpg';
import bag from '../img/bag.jpg';
import shoppingapp from '../img/shoppingapp.jpg'

import './Home.css'

class Home extends Component {
    render() {
        return (
            <div className="main">
                <p>Welcome!</p>
                <Carousel >
                    <Carousel.Item>
                        <img style={{margin:"auto"}} width={900} height={500} alt="900x500" src={shopping} />
                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img style={{margin:"auto"}} width={900} height={500} alt="900x500" src={bag} />
                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img style={{margin:"auto"}} width={900} height={500} alt="900x500" src={shoppingapp} />
                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>;
                </div>
        );
    }
}
export default Home;