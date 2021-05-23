import React, {Component} from 'react'
import ReactEchart from 'echarts-for-react';
import chartTheme from "./chartTheme";
import echarts from 'echarts'

/* legend:默认有legend,在底部，如果不需要legend，需传入 legend={{show:false}},
         如果需要更改legend位置，传值去覆盖默认位置 */



class  BasicPieChart extends Component {
 
    componentWillMount(){
        echarts.registerTheme('theme', chartTheme);
    }

    setPieOption(props){
        const {legend}=this.props
        const {label} = this.props
        return{
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c} ({d}%)'
            },
            legend:legend?{bottom:10,...props.legend}:null,
            series: [
                {
                    type: 'pie',
                    top:0,
                    radius: ['40%', '60%'],
                    label: label?{...label}:{formatter: ' {b}：{d}% '},
                    data: props.seriesData
                }
            ]
        }
    }

    render() {
        return(
            <ReactEchart  theme='theme' option={this.setPieOption(this.props.data)}/>
        )
    }
}

export default BasicPieChart
