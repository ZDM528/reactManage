import React, {Component} from "react";
import {Form, Input} from "antd";

class UpdateForm extends Component{
    constructor(props) {
        super(props)
        this.state = {
            categoryName: this.props.categoryName,
        }
    }

    updateInputData=(event)=>{
        this.props.updateInputData(event.target.value)
    }

    render() {
        const reg=/^(?!\s+).*$/
        return (
            <Form>
                <Form.Item
                    name={this.props.categoryName}
                    initialValue={ this.props.categoryName}
                    rules={[
                        ({ getFieldValue }) => (
                            {
                                validator(rule, value) {
                                    if (!value) {
                                        return Promise.reject('分类名称不能为空');
                                    }
                                    if(!reg.test(value)){
                                        return Promise.reject('不能以空格开头！');
                                    }
                                    else{
                                        return Promise.resolve();
                                    }
                                },
                            }),
                    ]}
                >
                    <Input placeholder='请输入分类名称'  onChange={this.updateInputData}/>
                </Form.Item>
            </Form>
        );
    }
}

export default UpdateForm;