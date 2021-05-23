import React, {Component} from "react"
import {Form, Input, Select} from 'antd'
import {reqRoleList} from "../../api"


const{Option}=Select
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
}
class AddUser extends Component {
    formRef = React.createRef()
    state={
        roles:[]
    }

    componentDidMount() {
        this.getRoleList()
        this.props.onSubmit(this.onFinish)
    }

    getRoleList=async ()=>{
        const result=await reqRoleList()
        if(result){
            this.setState({
                roles:result
            })
        }
    }

    onFinish=()=>{
        this.props.getSubmitReq()
    }


    render() {
        return (
          <Form {...layout} ref={this.formRef} onFinish={this.onFinish}>
              <Form.Item name='username' label='用户名'
                         rules={[{ required: true, message: '请输入用户名' },
                                {min:1,message:'用户名不能少于一位！'},
                                {max:10,message:'用户名不能多于10位！'},
                                {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名只能由数字，字母，下划线组成！'}]}>
                  <Input placeholder='请输入用户名' />
              </Form.Item>
              <Form.Item name='password' label='密码'
                         rules={[
                             ({ getFieldValue }) => (
                                 {
                                     validator(rule, value) {
                                         if (!value) {
                                             return Promise.reject('请输入密码');
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
                         ]}>
                  <Input placeholder='请输入密码' />
              </Form.Item>
              <Form.Item name='tel' label='手机号'
                         rules={[
                             ({ getFieldValue }) => (
                                 {
                                     validator(rule, value) {
                                         if (!value) {
                                             return Promise.reject('请输入手机号');
                                         }
                                         if(!(/^1(3|4|5|6|7|8|9)\d{9}$/).test(value)){
                                             return Promise.reject('请输入正确的手机号！');
                                         }
                                         else{
                                             return Promise.resolve();
                                         }
                                     },
                                 }),
                         ]}>
                  <Input placeholder='请输入手机号' />
              </Form.Item>
              <Form.Item name='email' label='邮箱'
                         rules={[
                             ({ getFieldValue }) => (
                                 {
                                     validator(rule, value) {
                                         if (!value) {
                                             return Promise.reject('请输入邮箱');
                                         }
                                         if(!(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(value)){
                                             return Promise.reject('请输入正确的邮箱！');
                                         }
                                         else{
                                             return Promise.resolve();
                                         }
                                     },
                                 }),
                         ]}>
                  <Input placeholder='请输入邮箱' />
              </Form.Item>
              <Form.Item name='roleName' label='角色' rules={[{ required: true, message: '请选择角色' }]}>
                  <Select placeholder='请选择角色'>
                          {
                              this.state.roles.map(item=>{
                                  return <Option value={item.roleName} >{item.roleName}</Option>
                              })
                          }
                  </Select>
              </Form.Item>
          </Form>
        )
    }
}

export default AddUser