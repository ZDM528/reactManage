import React, { Component } from "react"
import { Table, Card, Button, Modal, message } from 'antd'
import { reqRoleList } from "../../api"
import { reqRoleMenu } from "../../api"
import AddRole from "./add_role"
import { reqAddRole } from "../../api"
import AuthRole from "./auth_role"
import memoryUtils from "../../util/memoryUtils"
import { formateDate } from "../../util/dateUtils"

class Role extends Component {
    constructor(props) {
        super(props)
        this.state = {
            roles: [],
            role: [],
            modalStatus: 0,
        }
        this.addRoleName = React.createRef()
        this.authRoleMenu = React.createRef()
    }

    initColumn = () => {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'roleName',
                key: 'roleName',
            },
            {
                title: '创建时间',
                dataIndex: 'startTime',
                key: 'startTime',
                render: formateDate
            },
            {
                title: '授权时间',
                dataIndex: 'authTime',
                key: 'authTime',
                render: formateDate
            },
            {
                title: '授权人',
                dataIndex: 'authName',
                key: 'authName',
            }
        ]
    }

    getRoleList = async () => {
        const result = await reqRoleList()
        if (result) {
            this.setState({
                roles: result
            })
        }

    }

    onRow = (role) => {
        return {
            onClick: event => {
                this.setState({ role })
            }
        }

    }

    comformAddRole = async () => {
        this.setState({
            modalStatus: 0
        })
        const roleName = this.addRoleName.current.getRole()

        const authName = memoryUtils.user.username
        console.log(authName)
        const authTime = formateDate(Date.now())
        const result = await reqAddRole(roleName, authTime, authName)
        if (result) {
            this.getRoleList()
        }
    }

    comformAuthRole = async () => {
        this.setState({
            modalStatus: 0
        })
        const id = this.state.role.id
        const menu = this.authRoleMenu.current.getAuthMenu()
        const role = this.state.role
        role.menu = menu
        const result = await reqRoleMenu(id, menu)
        if (result) {
            message.success('修改角色权限成功')

        }
    }

    cacelModal = () => {
        this.setState({
            modalStatus: 0
        })
    }

    componentWillMount() {
        this.initColumn()
    }

    componentDidMount() {
        this.getRoleList()
    }

    render() {
        const { roles, role, modalStatus } = this.state
        const title = (
            <div>
                <Button type='primary' onClick={() => { this.setState({ modalStatus: 1 }) }}>创建角色</Button>&nbsp;&nbsp;
                <Button type='primary' disabled={!role.id} onClick={() => { this.setState({ modalStatus: 2 }) }}>设置角色权限</Button>
            </div>
        )

        return (
            <div>
                <Card title={title}>
                    <Table
                        columns={this.columns}
                        dataSource={roles}
                        rowKey='id'
                        bordered
                        rowSelection=
                        {{
                            type: 'radio',
                            selectedRowKeys: [role.id],
                            onSelect: (role) => {
                                this.setState({
                                    role
                                })
                            }
                        }}
                        onRow={this.onRow}
                        pagination={{
                            defaultPageSize: 5,
                            showQuickJumper: true,
                        }} />
                </Card>
                <Modal
                    title="添加角色"
                    visible={modalStatus === 1}
                    onOk={this.comformAddRole}
                    onCancel={this.cacelModal}
                    destroyOnClose='true'
                >
                    <AddRole ref={this.addRoleName} />
                </Modal>
                <Modal
                    title="设置角色权限"
                    visible={modalStatus === 2}
                    onOk={this.comformAuthRole}
                    onCancel={this.cacelModal}
                    destroyOnClose='true'
                >
                    <AuthRole roleData={this.state.role} ref={this.authRoleMenu} />
                </Modal>
            </div>


        )
    }
}
export default Role;