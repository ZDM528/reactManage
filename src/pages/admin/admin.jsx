import React, {Component} from 'react'
import {Redirect,Route,Switch} from 'react-router-dom'
import { Layout,Row,Col,Modal} from 'antd'
import {
    ExclamationCircleOutlined
} from '@ant-design/icons'
import MenuList from '../../configs/menuConfig'
import LinkButton from "../../components/link-button"
import {formateDate} from '../../util/dateUtils'
import './admin.css'
import LeftNax from "../../components/left-nax"
import Home from "../home/home"
import Role from "../role/role"
import Product from "../product/product"
import User from "../user/user"
import Category from "../category/category"
import Pie from "../charts/pie"
import Bar from "../charts/bar"
import Line from "../charts/line"
import {reqWeather} from "../../api"
import {connect} from 'react-redux'
import {logout} from '../../redux/actions'
const {Footer, Sider, Content } = Layout
const { confirm } = Modal;
class Admin extends Component{
    state = {
        collapsed: false,
        weather:'',
        currentTime:formateDate(Date.now())
    };
    getWeather=async ()=>{
        const reqweather=await reqWeather()
        this.setState({
            weather:reqweather.weather,
            date:reqweather.date
        })
    }

    getTitle=()=>{
        let title
        const path=this.props.location.pathname
        MenuList.map(item=>{
            if (item.key===path){
                title=item.title
            }
            else{
                if (item.children){
                    const citem=item.children.find(citem=>path.indexOf(citem.key)!==-1)
                    if (citem){
                        title = citem.title

                    }
                }
            }
        })
        return title
    }
    getTime=()=>{
        this.intervalId=setInterval(()=>{
            const currentTime=formateDate(Date.now())
            this.setState({
                currentTime
            })
        },1000)
    }

    logout=()=>{
        confirm({
            title: '确定退出吗?',
            icon: <ExclamationCircleOutlined />,
            onOk:()=> {
                this.props.logout()
            },
        });
    }
    // 在render执行完毕之后执行,一般执行异步操作，比如发送ajax请求
    componentDidMount() {
        this.getWeather()
        this.getTime()
    }
    //组件卸载时清除定时器
    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    render(){
        const user=this.props.user  //从内存中读取数据
        if(!user||!user.id){
            return <Redirect to='/login' />
        }
        const title=this.props.headTitle
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{ overflow: 'auto',
                    height: '100vh',
                    position: 'fixed'}}>
                    <LeftNax/>
                </Sider>
                <Layout style={{marginLeft:200}}>
                    <header style={{backgroundColor:'#fff',height:'70px'}}>
                        <Row style={{height:'40px',borderBottom:'solid 1px skyblue',lineHeight:'40px'}} >
                            <Col span={21}>
                            </Col>
                            <Col span={3}>
                                    <span>欢迎{user.username}</span>
                                    <LinkButton onClick={this.logout}>&nbsp;&nbsp;退出</LinkButton>
                            </Col>
                        </Row>
                        <Row style={{height:'30px',lineHeight:'30px'}}>
                            <Col span={18}>{title}</Col>
                            <Col span={6}>
                                <span>{this.state.currentTime}</span>
                                <span>{this.state.weather}</span>
                            </Col>
                        </Row>
                    </header>
                    <Content style={{
                                 margin: '24px 16px',
                                 padding: 24,
                                 minHeight: 420,
                                 background: '#fff',
                             }}>
                        {/*匹配到一个，就跳转到对于的页面，如果都没有，默认跳回主页home*/}
                        <Switch>
                            <Route path='/home' component={Home}/>
                            <Route path='/category' component={Category}/>
                            <Route path='/user' component={User}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/role' component={Role}/>
                            <Route path='/pie' component={Pie}/>
                            <Route path='/line' component={Line}/>
                            <Route path='/bar' component={Bar}/>
                            <Route path='/bar' component={Bar}/>
                            <Redirect to='/home'/>
                        </Switch>
                    </Content>
                    <Footer style={{backgroundColor:'#fff',textAlign:'center'}}>
                        &copy;Danmin 后台管理系统
                    </Footer>
                </Layout>
            </Layout>

        )
    }
}


export default connect(
    state=>({headTitle:state.headTitle,
             user:state.user}),
    {logout}
)(Admin);