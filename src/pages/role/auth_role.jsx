import React, {Component} from "react"
import {Form,Input,Tree } from 'antd'
import menuConfig from '../../configs/menuConfig'
class AuthRole extends Component {
    constructor(props){
        super(props)
        this.state={
            checkedKey:this.props.roleData.menu
        }
    }

    checkedKey=(checkedKey)=>{
        if (checkedKey!==null){
            this.setState({
                checkedKey
            })
        }
    }

    getAuthMenu=()=>{
        return this.state.checkedKey
    }

    render() {
        const treeData =menuConfig
        return (
            <div>
                <Form>
                    <Form.Item name='authRole' label='角色名称'>
                        <Input defaultValue={this.props.roleData.roleName} disabled/>
                    </Form.Item>
                </Form>
                <Tree
                    checkable
                    defaultExpandAll='true'
                    treeData={treeData}
                    checkedKeys={this.state.checkedKey}
                    onCheck={this.checkedKey}
                />
            </div>


        )
    }
}

export default AuthRole