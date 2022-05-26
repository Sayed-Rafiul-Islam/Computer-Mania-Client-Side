import React from 'react';
import Banner from '../Banner/Banner';
import ContactUs from '../ContactUS/ContactUs';
import Footer from '../Footer/Footer';
import Parts from '../Parts/Parts';
import Repair from '../Repair/Repair';
import Review from '../Reviews/Review';
import Summery from '../Summery/Summery';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Parts></Parts>
            <ContactUs></ContactUs>
            <Summery></Summery>
            <Repair></Repair>
            <Review></Review>
            <Footer></Footer>
        </div>
    );
};

export default Home;