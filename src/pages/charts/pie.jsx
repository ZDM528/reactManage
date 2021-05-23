import React, {Component} from 'react'
import BasicPieChart from "./basicPiechart";
import {Card,Row,Col} from 'antd'
class Pie extends Component {
    constructor(props) {
        super(props);
        this.state={
            pieDataOne:{
                seriesData: [
                    {value: 335, name: '电脑'},
                    {value: 310, name: '衣服'},
                    {value: 234, name: '书籍'}
                ],
                legend:{top:10}
            },
            pieDataTwo:{
                seriesData: [
                    {value: 335, name: '零食'},
                    {value: 310, name: '乐器'},
                    {value: 234, name: '玩乐'},
                    {value: 244, name: '学习用品'}
                ],
                legend:{top:10}
            }


        }
        }
    render() {
        return(
            <Card title='商品总类'>
                <Row>
                    <Col span={12}>
                        <BasicPieChart data={this.state.pieDataOne} label={{show:true}} legend={{show:true}}/>
                    </Col>
                    <Col span={12}>
                        <BasicPieChart data={this.state.pieDataTwo} label={{show:true}} legend={{show:true}}/>
                    </Col>


                </Row>


            </Card>

        )
    }
}

export default Pie
