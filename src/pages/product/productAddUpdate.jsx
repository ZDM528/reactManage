import React, {Component} from "react"
import {Card,Form, Input, Button,Upload,Modal,Select,message} from 'antd'
import { ArrowLeftOutlined ,PlusOutlined} from '@ant-design/icons'
import {reqCategoryList} from "../../api"
import {reqDeleteImages} from "../../api"
import {reqAddProduct} from "../../api"
import RichTextEditor from "./richTextEditor"

const { TextArea} = Input
const {Option}=Select
const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 6},
}
function getImgFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })
}

class ProductAddUpdate extends Component {
    constructor(props){
        super(props)
        this.state = {
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            fileList: [],
            newFileList:[],
            categoryBelong:[],
            detail:''
        }
        this.editor=React.createRef()
    }

   onFinish=async (value)=>{
       const detail=this.editor.current.getDetail()
       const result=await reqAddProduct({...value,imgs:this.state.newFileList,detail:detail})
       if(result){
           message.success('提交成功')
           this.props.history.goBack()
       }

   }

    uploadPreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getImgFile(file.originFileObj);
        }
        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        })
    }

    uploadChange = async ({ file,fileList }) => {
        const newFileList=fileList.map(item=>item.name)
        this.setState({
            fileList,
            newFileList
        })
        if (file.status==='done'){
           message.success("图片上传成功")
        }
        if (file.status==='removed'){
            const result=await reqDeleteImages(file.name)
            message.error("图片删除成功")
        }


    }

    viewCancel = () =>{
        this.setState({ previewVisible: false })
    }

    async componentDidMount() {

        const result=await reqCategoryList(0)
        this.setState({
            categoryBelong:result.data,
            })

    }

    render() {

        const title=(
            <div>
                <ArrowLeftOutlined
                    style={{fontSize:'15px',color:'blue'}}
                    onClick={()=>{this.props.history.goBack()}}
                />
                <span>添加商品</span>
            </div>
        )
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div className="ant-upload-text">Upload</div>
            </div>
        )
        const { previewVisible, previewImage, fileList, previewTitle ,categoryBelong} = this.state

        return(
            <Card title={title}>
                <Form onFinish={this.onFinish}   {...layout}>
                    <Form.Item
                        name='name'
                        label='商品名称'
                        rules={[{ required: true, message: '请输入商品名称' }]}>
                        <Input placeholder='请输入商品名称'/>
                    </Form.Item>
                    <Form.Item
                        name='desc'
                        label='商品描述'
                        rules={[{ required: true, message: '请输入商品描述' }]}>
                        <TextArea placeholder="请输入商品描述" allowClear/>
                    </Form.Item>
                    <Form.Item
                    name='price'
                    label='商品价格'
                    rules={[{ required: true, message: '请输入商品价格' }]}>
                    <Input addonAfter="元" placeholder='价格'/>
                    </Form.Item>
                    <Form.Item
                        name='categoryId'
                        label='商品分类'
                        rules={[{ required: true, message: '请选择商品分类' }]}>
                        <Select>
                            {
                                categoryBelong.map(item=>{
                                    return <Option value={item._id}>{item.name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name='imgs'
                        label='商品图片'>
                        <Upload
                            listType="picture-card"
                            accept="image/*"
                            action="/loadImages"
                            fileList={fileList}
                            onPreview={this.uploadPreview}
                            onChange={this.uploadChange}
                        >
                            {fileList.length >= 4 ? null : uploadButton}
                        </Upload>
                        <Modal
                            visible={previewVisible}
                            title={previewTitle}
                            footer={null}
                            onCancel={this.viewCancel}
                        >
                            <img alt="productImages" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </Form.Item>
                    <Form.Item
                        name='detail'
                        label='商品详情'
                        labelCol={{span: 2}}
                        wrapperCol={{span: 16}}
                    >
                        <RichTextEditor ref={this.editor}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>提交</Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}
export default ProductAddUpdate;