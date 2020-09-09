import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from "react-router";
import { Form, Input, Button, Checkbox } from 'antd';
import {login, checkLoginStatus, getBanner, personalized} from '../../api';
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
            hotRecommendArr: [],
            currentSlide: 0,
            slideBackground: null,
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
        }).then(_=>{
            this.updateSlideBackground()
        });
        personalized({}).then(res=> {
            if(res.status === 200) {
                let data = res.data.result;
                data = data.slice(0, 8);
                this.setState({
                    hotRecommendArr: data
                });
            }
        })
       
    }
    componentDidMount() {
        // let pageNumber = ReactDOM.findDOMNode(this).querySelectorAll('div.slick-active');
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
    updateSlideBackground(index=0) {
        this.setState({
            slideBackground: {
                backgroundImage: 'url(' + this.state.banners[index].imageUrl + '?imageView&blur=40x20)',
                backgroundSize: '6000px',
                backgroundPosition: 'center center',
            }
        })
    }
	render(){
        // slider配置
        var settings = {
            autoplay: true,
            dots: true,
            fade: true,
            lazyLoad: true,
            infinite: true,
            speed: 1000,
            autoplaySpeed: 2000,
            slidesToShow: 1,
            slidesToScroll: 1,
            beforeChange: (prev, next) => {
                this.updateSlideBackground(next);
            }
        };
        
		return(
			<div>
                <HmNavbar></HmNavbar>
                <div className="slide-container" style={this.state.slideBackground}>
                    <div className="slide-main">
                        <Slider {...settings}>
                        {this.state.banners.map((item)=>(
                            <div key={item.imageUrl} >
                                <img src={item.imageUrl+'?imageView&quality=89'} alt=""/>
                            </div>
                        ))}
                        </Slider>
                        <div className="download"></div>
                    </div>
                </div>
                <div id="discover-module" className="f-cb">
                    <div className="g-mn1">
                        <div className="hot-recommend g-mn1c">
                            <div className="g-wrap3">
                                <div className="n-rcmd">
                                    <div className="v-hd2">
                                        <a href="/#" className="tit f-tdn">热门推荐</a>
                                        <div className="tab">
                                            <a href="/#">华语</a>
                                            <span className="line">|</span>
                                            <a href="/#">流行</a>
                                            <span className="line">|</span>
                                            <a href="/#">摇滚</a>
                                            <span className="line">|</span>
                                            <a href="/#">民谣</a>
                                            <span className="line">|</span>
                                            <a href="/#">电子</a>
                                        </div>
                                    </div>
                                    <ul className="hot-recommend-content">
                                        {this.state.hotRecommendArr.map((item)=> (
                                            <li key={item.id} className="u-cover">
                                                <div className="pic">
                                                    <img src={item.picUrl + '?param=140y140'} alt=""/>
                                                </div>
                                                <p className="dec">
                                                    <a href="/#">{item.name}</a>
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="g-sd1">
                            right
                    </div>
                </div>
            </div>
		);
	}
}

export default Home;
