import React, {Component} from "react"
import ReactEcharts from "echarts-for-react"
import chartTheme from "./chartTheme"
import echarts from 'echarts'

class Bar extends Component {

    componentWillMount(){
        echarts.registerTheme('theme', chartTheme);
    }

    setBarOption(){
        return{
                legend: {
                    data: ['销售量', '库存量']
                },
                grid: {
                    height: "73%"// 高度
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                        axisPointer: {
                            type: 'shadow'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name:'件数',
                        min: 0,
                        max: 1000,
                        interval: 100,
                        axisLabel: {
                            formatter: '{value} '
                        }
                    },
                ],
                series: [
                    {
                        name: '销售量',
                        type: 'bar',
                        data: [20, 49, 70, 232, 256, 767, 136, 162, 36, 200, 64, 33]
                    },
                    {
                        name: '库存量',
                        type: 'bar',
                        data: [900, 59, 90, 264, 287, 707, 176, 182, 487, 188, 60, 23]
                    },
                ]
        }
    }
    render() {
        return(
                <ReactEcharts option={this.setBarOption()} theme='theme'></ReactEcharts>

        )
    }
}
export default Bar;