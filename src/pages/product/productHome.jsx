import React, {Component} from "react";
import { Table,Button,Card,Select,Input,message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import LinkButton from "../../components/link-button";
import {reqProductList} from "../../api";
import {PAGE_SIZE} from '../../util/containPage';
import {reqSearchProduct} from "../../api";
import {reqUpdateProductStatus} from "../../api";
import memoryUtils from "../../util/memoryUtils";

const {Option}=Select
class ProductHome extends Component {
    constructor(props){
        super(props)
        this.state={
            loading:false,
            productList:[],
            total:0,
            searchType:'productName',
            searchName:''
        }
    }

    getProductList=async (pageNum)=>{
        this.pageNum=pageNum
        this.setState({
            loading:true
        })
        const{searchType,searchName}=this.state
        console.log(searchName)
        let result
        if(searchName&&(/^(?!\s+).*$/).test(searchName)){
            result=await reqSearchProduct(pageNum,PAGE_SIZE,searchType,searchName)
        }
        else{
            result=await reqProductList(pageNum,PAGE_SIZE)
        }

        if(result.status === 0 ){
            const{total,list}=result
            this.setState({
                loading:false,
                total,
                productList:list
            })
        }
        else{
            message.error('请求商品数据出错')
        }

    }

    componentDidMount() {
       this.getProductList(1)
    }

    getUpdateStatus=async (id,status)=>{
        const result=await reqUpdateProductStatus(id, status)
        if(result.status==='0'){
            this.getProductList(1)
            message.success('更新商品状态成功')
        }
        else{
            message.error('无法更新商品状态')
        }

    }

    showDetail=(product)=>{
        memoryUtils.product=product
        this.props.history.push('/product/productDetail')
    }
    render() {
        const columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
                key: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
                render: (price) => '￥' + price
            },
            {
                title: '状态',
                key:'status',
                width:'100px',
                render:(product)=>{
                   const {id,status}=product
                    return(
                        <div>
                            <Button type='primary' onClick={()=>{this.getUpdateStatus(id,status==='1'?'2':'1')}}>{product.status==='1'?'上架':'下架'}</Button>
                            <LinkButton>{product.status==='1'?'已下架':'上架'}</LinkButton>
                        </div>
                    )
                }


            },
            {
                title: '操作',
                key: 'operate',
                width:'100px',
                render:(product)=>{
                    return(
                        <div>
                            <LinkButton onClick={()=>this.showDetail(product)}>详情</LinkButton>
                        </div>
                    )
                }
            },
        ];
        const{productList,total,loading,searchType,searchName}=this.state
        const title=(
            <span>
                 <Select value={searchType}
                         style={{width:150}}
                         onChange={value=>{this.setState({searchType:value})}}
                 >
                     <Option value='productName'>按名称搜索</Option>
                     <Option value='productDesc'>按描述搜索</Option>
                </Select>
                <Input placeholder='关键字'
                       style={{width:150,margin:'0 10px'}}
                       value={searchName}
                       onChange={e=>{this.setState({searchName:e.target.value})}}
                />
                <Button type='primary' onClick={()=>{this.getProductList(1)}}>搜索</Button>
            </span>

            )
        const extra=(
            <Button icon={<PlusOutlined />} onClick={()=>{this.props.history.push('/product/productAddUpdate')}}>添加商品</Button>
        )

        return(
            <Card title={title}
                  extra={extra}
            >
                <div>
                    <Table dataSource={productList}
                           columns={columns}
                           rowkey={columns.key}
                           bordered
                           loading={loading}
                           current={this.pageNum}
                           pagination={{
                               defaultPageSize:PAGE_SIZE,
                               showQuickJumper:true,
                               total,
                               onChange:this.getProductList}}
                    />
                </div>
            </Card>



        )
    }
}
export default ProductHome;