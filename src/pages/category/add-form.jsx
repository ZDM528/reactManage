import React, {Component} from "react";
import { Form, Input ,Select} from 'antd';

const { Option } = Select
class AddForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            categoryData:'',
            parentName: this.props.parentName
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            parentName:nextProps.parentName
        })
    }

    addInputData=(event)=>{
        this.setState({
            categoryData:event.target.value
        },()=>{
            this.props.addInputData(this.state.categoryData)
            })
    }

    selectChange=(value)=>{
        this.props.selectData(value)
    }

    render() {
        return (
            <Form>
                <Form.Item>
                    <p>请选择分类名称：</p>
                    <Select defaultValue='0' onChange={this.selectChange} >
                        <Option value="0">一级列表</Option>
                        {
                            this.props.category.map(item => {
                                return (
                                    <Option value={item.name}>{item.name}</Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item>
                    <p>请输入分类名字：</p>
                    <Input placeholder='请添加分类' value={this.state.categoryData} onChange={this.addInputData}/>
                </Form.Item>
            </Form>
        );
    }
}

export default AddForm;