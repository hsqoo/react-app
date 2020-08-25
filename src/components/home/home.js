import React from 'react';
import { Link } from 'react-router-dom';
import { Router, Route, Switch } from "react-router";
import { Form, Input, Button, Checkbox } from 'antd';
import {login, checkLoginStatus} from '../../api';
import './home.scss'


class Home extends React.Component{
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
                window.localStorage.setItem('myMusicCookies', res.data.cookie)
            }
        }).then(()=> {
            checkLoginStatus({})
        })
    }
	render(){
		return(
			<div className="login">
                <div>
                    <div className="row">
                        <label>帐号：</label><input type="text" onChange={this.handlePhoneChange}/>
                    </div>
                    <div className="row">
                        <label>密码：</label><input type="password" onChange={this.handlePwdChange}/>
                    </div>
                    <div className="row">
                        <button onClick={this.handleClickEvent}>登录</button>
                    </div>
                </div>
			</div>
		);
	}
}

export default Home;
