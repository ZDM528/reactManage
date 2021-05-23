import React, {Component,Fragment} from "react";
import { Card ,Table ,Button, Modal} from 'antd';
import { PlusOutlined,ArrowRightOutlined } from '@ant-design/icons';
import LinkButton from "../../components/link-button";
import {reqCategoryList,reqAddCategory,reqUpdateCategory} from '../../api/index';
import AddForm from "./add-form";
import UpdateForm from "./update-form";
class Category extends Component {
    state={
        loading:true,
        category:[],//一级分类列表
        subCategory:[],//二级分类列表
        parentId:'0' ,//一级分类列表ID
        parentName:'', //当前需要显示的分类列表的父类名字
        showStatus:0 , //0表示不显示，1表示显示添加分类，2表示显示更新分类对话框
        categoryName:'', //修改的一级分类列表名字
        lineCategory:'', //修改时得到的那行的一级列表对象
        showCategory:'', //当前展示的分类
        addCategory:'', //增加的分类名称
        selectData:''  //增加分类时下拉框选择的分类名字
    }
    initColumns=()=>{
      this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '操作',
                width:300,
                dataIndex: 'perform',
                key: 'perform',
                render:(text,category)=>(
                    <span>
                        <LinkButton onClick={()=>{this.updateCategory(category)}}>修改分类</LinkButton>
                        {this.state.parentId==='0'?<LinkButton onClick={()=>{this.getSubCategory(category)}}>查看子分类</LinkButton>:null}
                    </span>
                    )
            }
        ];
    }
    //判断parentId获取一级二级分类列表
    getCategoryList= async ()=>{
        const parentId=this.state.parentId
        const result=await reqCategoryList(parentId)
        if(result){
            this.setState({
                loading:false
            })
        }
        if(result.status===0){
            const category=result.data
            if(parentId==='0'){  //parentId=0 获取一级分类列表
                this.setState({
                    category:category
                })
            }
            else{    //parentId!=0 获取二级分类列表
                this.setState({
                    subCategory:category
                })
            }
        }
    }
    //传入一级父类category，通过父类_id分别获取二级分类ID和父类name
    getSubCategory=(category)=>{
        this.setState({
            parentId:category._id,
            parentName:category.name
        },()=>{
            this.getCategoryList()
        })
    }
   //点击一级分类列表得到一级分类数据
    getCategory=()=>{
        this.setState({
            subCategory:[],
            parentId:'0' ,
            parentName:'',
        })
    }

    //更新分类
    updateCategory=(category)=>{
        this.setState({
            showStatus:2,
            categoryName:category.name,
            lineCategory:category,
            showCategory:category.name
        })
    }

    //更新分类时更新的名字
    updateInputData=(inputData)=>{
        this.setState({
            categoryName:inputData
        })
    }

    //确定更新分类
    comformUpdateCategory=async ()=>{
        this.setState({
                showStatus:0
        })
        if(this.state.categoryName!=''&&(/^(?!\s+).*$/).test(this.state.categoryName)){//indexOf返回字符串首次出现的位置，如果没有，则返回-1
            let categoryId=this.state.lineCategory._id
            let categoryName=this.state.categoryName
            let parentId=this.state.parentId
            const result=await reqUpdateCategory({parentId,categoryId,categoryName})
            this.getCategoryList()
        }
    }
    //添加分类
    addCategory=()=>{
        this.setState({
            showStatus:1
        })
    }
    //添加分类增加的分类名字
    addInputData=(inputData)=>{
        this.setState({
            addCategory:inputData
        })
    }
    //添加分类选项的选择
    selectChange=(selectData)=>{
        this.setState({
            selectData:selectData
        })
    }
     //确定添加分类
    comformAddCategory=async()=>{
        this.setState({
            showStatus:0
        })
        let addCategory=this.state.addCategory
        let selectData=this.state.selectData
        const result=await reqAddCategory(addCategory,selectData)
        console.log(result)
        this.getCategoryList()
    }

    //取消添加分类/更新分类
    cacelCategory=()=>{
        this.setState({
                showStatus:0
            }
        )
    }

    componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.getCategoryList()
    }

    render() {
        const {category,loading,subCategory,parentId,parentName,showStatus,showCategory}=this.state
        const title=(parentId==='0')?
            <span style={{color:'blue'}} >一级分类列表</span>:
            <div>
                <a href='#' style={{color:'blue'}} onClick={this.getCategory}>一级分类列表</a>
                <span><ArrowRightOutlined />{parentName}</span>
            </div>
        return(
            <Fragment>
            <Card title={title} extra={<Button  icon={<PlusOutlined />} onClick={this.addCategory}>添加</Button>}>
                <Table
                    bordered
                    dataSource={parentId==='0'?category:subCategory}
                    columns={this.columns}
                    loading={loading}
                    key={category.name}
                    pagination={{
                        defaultPageSize:5,
                        showQuickJumper:true,
                    }}
                   />
                <Modal
                    title="添加分类"
                    visible={showStatus===1}
                    onOk={this.comformAddCategory}
                    onCancel={this.cacelCategory}
                    destroyOnClose='true'
                >
                    <AddForm category={category}
                             parentId={parentId}
                             parentName={parentName}
                             addInputData={this.addInputData}
                             selectData={this.selectChange}/>
                </Modal>
                <Modal
                    title="更新分类"
                    visible={showStatus===2}
                    onOk={this.comformUpdateCategory}
                    onCancel={this.cacelCategory}
                >
                    <UpdateForm categoryName={showCategory}
                                updateInputData={this.updateInputData}
                    />
                </Modal>
            </Card>
            </Fragment>


        )
    }
}
export default Category;