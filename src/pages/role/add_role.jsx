import React, {Component} from "react"
import {Form,Input} from 'antd'


class AddRole extends Component {

    state={
        value:''
    }

    getRole=()=>{
        return this.state.value
    }

    inputChange=(event)=>{
        this.setState({
            value:event.target.value
        })
    }


    render() {
        return (
          <Form>
              <Form.Item name='addRole' label='角色名称' rules={[{ required: true, message: '请输入分类名称' }]}>
                  <Input placeholder='请输入角色名称' value={this.state.value} onChange={this.inputChange}/>
              </Form.Item>
          </Form>
        )
    }
}

export default AddRole