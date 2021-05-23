import React, {Component} from "react"
import { Table,Card ,Button,Modal} from 'antd'
import {reqUserList} from "../../api"
import {reqAddUser} from "../../api"
import {reqDeleteUser} from "../../api"
import {formateDate} from "../../util/dateUtils"
import LinkButton from "../../components/link-button"
import AddUser from "./add_user"

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalStatus: 0,
            userResult: [],
            user:''
        }
        this.userFormRef = React.createRef()
    }

    initColumn = () => {
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: '手机号',
                dataIndex: 'tel',
                key: 'tel',
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                key: 'create_time',
                render: formateDate
            },
            {
                title: '所属角色',
                dataIndex: 'roleName',
                key: 'roleName',
            },
            {
                title: '操作',
                render: (user) => {
                    return (
                        <div>
                            <LinkButton onClick={() => {this.setState({modalStatus:2,user})}}>删除</LinkButton>

                        </div>
                    )
                }
            }]
    }

    getUserList = async () => {
        const result = await reqUserList()
        if (result) {
            this.setState({
                userList: result
            })
        }
    }

    onSubmit = (onFinish) => {
        this.setState({
            onFinish
        })
    }
    getSubmitReq=async ()=>{
        const formData = this.userFormRef.current.formRef.current.getFieldsValue()
        const result = await reqAddUser(formData)
        if (result) {
            this.setState({
                modalStatus: 0
            })
            this.getUserList()
        }
    }
    comformAddUser =  () => {
        this.userFormRef.current.formRef.current.submit()
    }

    comformDeleteUser=async ()=> {
        const result = await reqDeleteUser(this.state.user)
        this.getUserList()
        this.setState({
            modalStatus: 0
        })
    }

    cacelModal=()=>{
        this.setState({
            modalStatus:0
        })
    }

    componentWillMount() {
        this.initColumn()
    }

    componentDidMount() {
        this.getUserList()
    }

    render() {
        const {modalStatus,userList}=this.state
        const title=(
            <div>
                <Button type='primary' onClick={()=>{this.setState({modalStatus:1})}}>创建用户</Button>
            </div>
        )

        return(
            <div>
                <Card title={title}>
                    <Table
                        columns={this.columns}
                        dataSource={userList}
                        rowKey='id'
                        bordered
                    />
                </Card>
                <Modal
                    title="添加用户"
                    visible={modalStatus===1}
                    onOk={this.comformAddUser}
                    onCancel={this.cacelModal}
                    destroyOnClose='true'
                >
                    <AddUser ref={this.userFormRef} onSubmit={this.onSubmit} getSubmitReq={this.getSubmitReq}/>
                </Modal>
                <Modal
                    title="删除用户"
                    visible={modalStatus===2}
                    onOk={this.comformDeleteUser}
                    onCancel={this.cacelModal}
                >
                    <p>你确定删除{this.state.user.username}用户吗？</p>
                </Modal>
            </div>


        )
    }
}
export default User;