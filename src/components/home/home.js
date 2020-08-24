import React from 'react';
import { Link } from 'react-router-dom';
import { Router, Route, Switch } from "react-router";
import { Form, Input, Button, Checkbox } from 'antd';
import {login} from '../../api';
import './home.scss'

const That = this;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
const LoginForm = () => {
    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    // bug 未完结
    // function handlePhoneChange(event) {
    //     console.log(this)
    //     That.state({
    //         phoneNumber: event.target.value
    //     });
    // }
    // function handlePwdChange(event) {
    //     console.log(this)
    //     this.state({
    //         password: event.target.value
    //     });
    // }
    function handleLoginEvent(event) {
        login({'phone': this.phoneNumber, 'password': this.password}).then((res)=> {
            console.log(res);
        })

    }
     // bug 未完结
    return (
        <Form
        {...layout}
        name="basic"
        initialValues={{
            remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        >
        <Form.Item
            label="Username"
            name="username"
            rules={[
            {
                required: true,
                message: 'Please input your username!',
            },
            ]}
        >
            <Input onChange={this.handlePhoneChange}/>
        </Form.Item>

        <Form.Item
            label="Password"
            name="password"
            rules={[
            {
                required: true,
                message: 'Please input your password!',
            },
            ]}
        >
            <Input.Password onChange={this.handlePwdChange}/>
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" onClick={handleLoginEvent}>
            Submit
            </Button>
        </Form.Item>
        </Form>
    );
};

class Home extends React.Component{
    state = {
        phoneNumber: '',
        password: '',
    }
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         phoneNumber: '',
    //         password: '',
    //     }
    // }
    handlePhoneChange(event) {
        console.log(this)
        That.state({
            phoneNumber: event.target.value
        });
    }
    handlePwdChange() {

    }
	render(){
		return(
			<div className="login">
                <LoginForm />
			</div>
		);
	}
}
 
export default Home;