import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from "react-router";
import { Form, Input, Button, Checkbox } from 'antd';
import {login, checkLoginStatus, getBanner} from '../../api';
import './home.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HmNavbar from '../hm-navbar/hm-navbar';
import Slider from "react-slick";


class Home extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            phoneNumber: '',
            password: '',
            banners: [],
        }
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handlePwdChange = this.handlePwdChange.bind(this);
        this.handleClickEvent = this.handleClickEvent.bind(this);
    }
    componentWillMount() {
        getBanner({type: 0}).then(res=> {
            if(res.status === 200) {
                this.setState({
                    banners: res.data.banners
                })
            }
        }).then(_=>console.log(this.state));
       
    }
    componentDidMount() {
        let pageNumber = ReactDOM.findDOMNode(this).querySelectorAll('div.slick-active');
        console.log(pageNumber)
    }
    handlePhoneChange(event) {
        this.setState({
            phoneNumber: event.target.value
        });
    }
    handlePwdChange(event) {
        this.setState({
            password: encodeURIComponent(event.target.value)
        });
    }
    handleClickEvent() {
        console.log(this);
        login({phone: this.state.phoneNumber, password: this.state.password}).then((res)=>{
            console.log(res.data.cookie);
            if(res.status === 200 && res.data.cookie) {
                window.localStorage.setItem('myMusicCookies', res.data.cookie);
                window.localStorage.setItem('userId', res.data.profile.userId);
                console.log(this.props.history)
                this.props.histroy.push('/musiclist');
            }
        }).then(()=> {
            checkLoginStatus({})
        })
    }
	render(){
        var settings = {
            autoplay: true,
            dots: true,
            fade: true,
            lazyLoad: true,
            infinite: true,
            speed: 500,
            autoplaySpeed: 5000,
            slidesToShow: 1,
            slidesToScroll: 1
        };
		return(
			<div>
                <HmNavbar></HmNavbar>
                <div className="slide-container">
                    <Slider {...settings}>
                    {this.state.banners.map((item)=>(
                        <div key={item.imageUrl} >
                            <img src={item.imageUrl} alt=""/>
                        </div>
                    ))}
                    </Slider>
                </div>
            </div>
		);
	}
}

export default Home;
