import React, {Component} from 'react' 
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts'
import echartsTheme from '../../utils/echartsTheme'
import {Icon, Button} from 'antd'

class HomePage extends Component{

  getOption3=()=>{
      return  {
        title : {
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['蒸发量','降水量']
        },
        grid:{
            y2:40,
            borderWidth:1
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'蒸发量',
                type:'bar',
                data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
            },
            {
                name:'降水量',
                type:'bar',
                data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                markPoint : {
                    data : [
                        {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183, symbolSize:18},
                        {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name : '平均值'}
                    ]
                }
            }
        ]
    };                                 
  }

  getOption1=()=>{
    return  {
        title : {
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '65%',
                center: ['50%', '50%'],
                data:[
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:234, name:'联盟广告'},
                    {value:135, name:'视频广告'},
                    {value:1548, name:'搜索引擎'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
  }

  getOption2=()=>{
    return {
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
        }]
    };
  }

  onChartReadyCallback(){
    console.log("worinima??")
  }

  onChartClick(param,echarts){
    console.log(param,"******************************")
}

  componentWillMount(){
    //主题的设置要在willmounted中设置
    echarts.registerTheme('theme', echartsTheme)
  }
  render(){

    let EventsDict={
      'click': this.onChartClick.bind(this)
  }

    return (
        <div>
            <div style={{float:'left',width:'100%',borderRadius:'4px',background:'#fff',padding:'14px'}}>
                <Icon type="notification" style={{color:'#ff9f40',fontSize:'16px', margin:'0px 10px 0px'}} />
                <span>锣鼓喧嚣、鞭炮齐鸣！！！恭贺谢先生喜中头彩800万元！锣鼓喧嚣、鞭炮齐鸣！！！恭贺谢先生喜中头彩800万元！</span>
                <Button type="primary" size='small' style={{background:'#ff9f40',color:'#fff',border:'none',float:'right'}} icon='caret-right'>more</Button>
            </div>

            <div style={{float:'left',width:'49.5%',borderRadius:'4px',background:'#fff',padding:'14px',marginTop:'10px'}}>
                <span style={{color:'#555',fontSize:'18px',fontWeight:'bold'}}>体检人员年龄段统计</span>
                <ReactEcharts
                    option={this.getOption1()}
                    notMerge={true}
                    lazyUpdate={true}
                    // theme={"dark"}
                    theme="theme"
                    onChartReady={this.onChartReadyCallback}//表格渲染好后触发
                    onEvents={EventsDict}//此处需要一个事件对象
                    style={{borderTop:'1px solid #eee',paddingTop:'20px',marginTop:'10px'}}
                />
            </div>

            <div style={{float:'right',width:'49.5%',borderRadius:'4px',background:'#fff',padding:'14px',marginTop:'10px'}} >
                <span style={{color:'#555',fontSize:'18px',fontWeight:'bold'}}>每月体检人数统计</span>
                <ReactEcharts
                    option={this.getOption2()}
                    notMerge={true}
                    lazyUpdate={true}
                    // theme={"dark"}
                    theme="theme"
                    onChartReady={this.onChartReadyCallback}//表格渲染好后触发
                    onEvents={EventsDict}//此处需要一个事件对象
                    style={{borderTop:'1px solid #eee',paddingTop:'20px',marginTop:'10px'}}
                />
            </div>
            
            <div style={{float:'left',width:'100%',borderRadius:'4px',background:'#fff',padding:'14px',marginTop:'10px'}}>
                <span style={{color:'#555',fontSize:'18px',fontWeight:'bold'}}>各套餐体检人数统计</span>
                <ReactEcharts
                    option={this.getOption3()}
                    notMerge={true}
                    lazyUpdate={true}
                    // theme={"dark"}
                    theme="theme"
                    onChartReady={this.onChartReadyCallback}//表格渲染好后触发
                    onEvents={EventsDict}//此处需要一个事件对象
                    style={{borderTop:'1px solid #eee',paddingTop:'20px',marginTop:'10px'}}
                />
            </div>

        </div>
        
    )

    }
  }
    

export default HomePage