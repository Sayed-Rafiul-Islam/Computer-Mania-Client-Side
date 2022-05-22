import React from 'react';
import Banner from '../Banner/Banner';
import Footer from '../Footer/Footer';
import Parts from '../Parts/Parts';
import Review from '../Reviews/Review';
import Summery from '../Summery/Summery';

const Home = () => {
    return (
        <div>
            <h1>home</h1>
            <Banner></Banner>
            <Parts></Parts>
            <Summery></Summery>
            <Review></Review>
            <Footer></Footer>
        </div>
    );
};

export default Home;