import React, {Component} from 'react'
import './login.css'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import Logo from '../../assets/images/logo.png'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from "../../redux/actions";
import memoryUtils from "../../util/memoryUtils";


class Login extends Component {
    onFinish = async values => {
        const {username, password} = values
        this.props.login(username,password)
    }
        render()
        {
            const user=this.props.user//判断用户是否已经登录，如果是，则强制回到admin页面
            memoryUtils.user.username=user.username
            console.log(user)
            if(user && user.id){
                return <Redirect to='/home'/>
            }
            return (
                <div className='login'>
                    <header className='login-header'>
                        <img src={Logo} alt='logo'/>
                        <h1 style={{marginTop:'10px'}}>电商管理系统</h1>
                    </header>
                    <section className='login-content'>
                        <h1>用户登录</h1>
                        <Form
                            name="normal_login"
                            className="login-form"
                            onFinish={this.onFinish}
                        >
                            <Form.Item
                                name="username"
                                rules={[{required: true, message: '用户名不能为空！'},
                                    {min:1,message:'用户名不能少于一位！'},
                                    {max:10,message:'用户名不能多于10位！'},
                                    {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名只能由数字，字母，下划线组成！'}]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="用户名"/>
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    ({ getFieldValue }) => (
                                        {
                                        validator(rule, value) {
                                            if (!value) {
                                                return Promise.reject('密码不能为空');
                                            }
                                            if (value.length<4){
                                                return Promise.reject('密码不能小于4位！');
                                            }
                                            if(value.length>12){
                                                return Promise.reject('密码不能大于12位！');
                                            }
                                            else{
                                                return Promise.resolve();
                                            }
                                        },
                                    }),
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon"/>}
                                    type="password"
                                    placeholder="密码"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox style={{marginRight: '43%'}}>记住密码！</Checkbox>
                                </Form.Item>
                                <a className="login-form-forgot" href="#s">
                                    忘记密码？
                                </a>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button"
                                        style={{width: '100%'}}>
                                    登录
                                </Button>
                                <a href="#s">现在注册！</a>
                            </Form.Item>
                        </Form>
                    </section>
                </div>
            )
        }
}

export default connect(
    state=>({user:state.user}),
    {login}
)(Login);