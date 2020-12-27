import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import homeImage from '../../images/home.jpg';
const Home = () => {
    return (
        <div>
            
            <div className = "row">
                <div className = "col-md-6">
                        <img src = {homeImage} className = "homeImage"/>
                </div>
                <div className = "col-md-6 home-text-section w-100">
                           <p className = "text-center text"><span className = "webname">Hello</span> <span className = "webname-small">Blog</span><br/><span className = "web-description">This a micro-blogging website where you can share your thoughts <br/> and ideas with others</span></p>
                           <div className = "w-100 text-center"><Link to = '/blog' className = "homelink">Get Set Blog</Link></div>
                        
                        
                </div>

            </div>
        </div>
    );
};

export default Home;