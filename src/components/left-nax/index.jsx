import React, {Component} from "react"
import {Link,withRouter} from 'react-router-dom'
import {Menu} from 'antd'
import Logo from '../../assets/images/logo.png'
import {SlackOutlined ,AppstoreAddOutlined} from '@ant-design/icons'
import '../../pages/admin/admin.css'
import MenuList from '../../configs/menuConfig'
import {connect} from 'react-redux'
import {SetHeadTitle} from '../../redux/actions'

const { SubMenu } = Menu
class LeftNax extends Component{

    getMenuConfig=(MenuList)=>{
        let path=this.props.location.pathname
        if(this.props.user.menu){
            const roleMenu=this.props.user.menu
            return MenuList.map(item=>{
                    if(roleMenu.indexOf(item.key)!==-1){
                        if (!item.children){
                            if(item.key===path||path.indexOf(item.key)===0){
                                this.props.SetHeadTitle(item.title)
                            }
                            return <Menu.Item key={item.key} icon={<AppstoreAddOutlined />}>
                                <Link to={item.key} onClick={()=>this.props.SetHeadTitle(item.title)}>{item.title}</Link>
                            </Menu.Item>

                        } else{
                            // 得到当前请求路径
                            const path=this.props.location.pathname
                            const citem=item.children.find(citem=>path.indexOf(citem.key)===0)
                            if(citem){
                                this.openKey=item.key
                            }
                            return <SubMenu icon={<SlackOutlined />} title={item.title} key={item.key}>
                                {
                                    this.getMenuConfig(item.children)
                                }
                            </SubMenu>
                        }
                    }
                    return ''
                }
            )
        }

    }
    // 在第一次render之前执行一次
    componentWillMount(){
        this.MenuConfig=this.getMenuConfig(MenuList)
    }
    render() {
        let path=this.props.location.pathname
        if(path.indexOf('/product')===0){
            path = '/product'
        }
        const openKey=this.openKey
        return(
            <div>
                <Link to='/' className='Left-nav' >
                    <header style={{display:'flex',alignItem:'center',marginTop:'10%',marginLeft:'10%'}}>
                        <img src={Logo} alt='logo' style={{width:'30px',height:'30px'}}/>
                        <p style={{color:'#fff',fontSize:'1.5vw'}}>电商管理系统</p>
                    </header>
                </Link>
                <Menu theme="dark" mode="inline" selectedKeys={[path]} defaultOpenKeys={[openKey]}>
                    {
                        this.MenuConfig
                    }
                </Menu>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {SetHeadTitle}
)(withRouter(LeftNax))

