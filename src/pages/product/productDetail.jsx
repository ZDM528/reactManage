import React, {Component,Fragment} from "react";
import {List} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import {reqProductBelong} from '../../api'
import memoryUtils from "../../util/memoryUtils";

class ProductDetail extends Component {
    constructor(props){
        super(props)
        this.state={
            belongCategory:''
        }
    }

    async componentWillMount () {
        const result=await reqProductBelong(memoryUtils.product.categoryId)
        this.setState({
            belongCategory:result
        })
    }

    componentWillUnmount() {
        memoryUtils.product={}
    }

    render() {
        let productSource=[]
         productSource.push(memoryUtils.product)
        console.log(memoryUtils.product)
        const {belongCategory} =this.state
        return(
            <List
                header={<div><ArrowLeftOutlined
                    style={{fontSize:'15px',color:'blue'}}
                    onClick={()=>{this.props.history.goBack()}}
                />&nbsp;商品详情</div>}
                dataSource={productSource}
                bordered
                renderItem={item => (
                    <Fragment>
                        <List.Item>
                            <span style={{fontWeight:'bolder'}}>商品名称：</span>{item.name}
                        </List.Item>
                        <List.Item>
                            <span style={{fontWeight:'bolder'}}>商品描述：</span>{item.desc}
                        </List.Item>
                        <List.Item >
                            <span style={{fontWeight:'bolder'}}>商品价格：</span>{item.price}元
                        </List.Item>
                        <List.Item style={{fontWeight:'bolder'}}>
                           商品图片：
                            {
                                item.imgs.length>0?
                                    item.imgs.map(item =>{
                                        return <img src={require("./images/"+item)} style={{width:'100px',height:'100px',border:'1px solid black',marginRight:'10px'}}/>
                                    })
                                :<span style={{fontWeight:'normal'}}>此商品没有照片</span>

                            }
                        </List.Item>
                        <List.Item>
                            <span style={{fontWeight:'bolder'}}>商品分类：</span>{belongCategory}
                        </List.Item>
                        <List.Item style={{fontWeight:'bolder'}}>
                            参数介绍：{
                            item.detail!=''?
                                <span dangerouslySetInnerHTML={{__html:item.detail}} style={{fontWeight:"normal"}}></span>:
                                <span style={{fontWeight:"normal"}}>此商品没有详细参数介绍</span>
                        }
                        </List.Item>
                    </Fragment>
                )}
            />


        )
    }
}
export default ProductDetail;
