import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Router, Route, Switch } from "react-router";
import { Form, Input, Button, Checkbox } from 'antd';
import {login, checkLoginStatus} from '../../api';
import './hm-navbar.scss'


class HmNavbar extends Component{
    // state = {
    //     phoneNumber: '',
    //     password: '',
    // }
    constructor(props) {
        super(props)
        this.state = {
            phoneNumber: '',
            password: '',
        }
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handlePwdChange = this.handlePwdChange.bind(this);
        this.handleClickEvent = this.handleClickEvent.bind(this);
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
		return(
			<div className="hm-navbar">
                <div className="m-top">
                    <div className="wrap f-cb">
                        <h1 className="logo">
                            <a href="#">网易云音乐</a>
                        </h1>
                        <ul className="m-nav j-tflag">
                            <li className="fst">
                                <span>
                                    <a href="#">
                                        <em>发现音乐</em>
                                    </a>
                                </span>
                            </li>
                            <li>
                                <span>
                                    <a href="#">
                                        <em>我的音乐</em>
                                    </a>
                                </span>
                            </li>
                            <li>
                                <span>
                                    <a href="#">
                                        <em>朋友</em>
                                    </a>
                                </span>
                            </li>
                            <li>
                                <span>
                                    <a href="#">
                                        <em>商城</em>
                                    </a>
                                </span>
                            </li>
                            <li>
                                <span>
                                    <a href="#">
                                        <em>音乐人</em>
                                    </a>
                                </span>
                            </li>
                            <li>
                                <span>
                                    <a href="#">
                                        <em>下载客户端</em>
                                    </a>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
			</div>
		);
	}
}

export default HmNavbar;
