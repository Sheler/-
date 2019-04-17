import React, { Component } from 'react'
import { Table, Form, Col, Row, Input, DatePicker, Button, Icon } from 'antd'
import axios from 'axios'
import Store from '../../store'
import './style.css'

const InputGroup = Input.Group;
let data = [{
    key: '1',
    tjbh: 'John',
    xm: '男',
    xb: '30399999999991',
    csrq: '牙龈肿痛',
    tjtc: '2018-08-08',
    yyrq: '某某机构',
    tjrq: '某某医生',
    yljg: '2018-08-09',
}, {
    key: '2',
    tjbh: 'John',
    xm: '男',
    xb: '30399999999991',
    csrq: '牙龈肿痛',
    tjtc: '2018-08-08',
    yyrq: '某某机构',
    tjrq: '某某医生',
    yljg: '2018-08-09',
}];

class PatientsList extends Component{

    constructor(props){
        super(props)
        console.log("props in queryItem",props);
        this.state = {
            data: [],
            records: [],
            fold: true,
            foldState: '展开',
        }
    }

    componentDidMount = ()=>{
        axios({
            url:`${Store.host}/hz/selectPage?current=1&size=10`,
            method:'get',
            headers: {'Content-Type': 'application/json','Auth-Token':`${Store.token}`}
        })
        .then((response)=>{
            console.log("response~~~~~~~~~~~~~~~~~~~~~",response);//response.data.records
            this.setState({
                data: response.data,
                records: response.data.records
            })
        })
    }

    unFold = ()=>{
        const newFold = !this.state.fold;
        const newFoldState = this.state.fold ? '收起' : '展开';
        this.setState({ fold: newFold, foldState: newFoldState})
    }

    render(){

        const { getFieldDecorator } = this.props.form;
        const columns = [
            { title: '体检编号', dataIndex: 'tjbh' },
            { title: '姓名', dataIndex: 'hzxm' },
            { title: '性别', dataIndex: 'hzxb' },
            { title: '出生日期', dataIndex: 'hzcsrq' },
            { title: '体检套餐', dataIndex: 'tjtc' },
            { title: '预约日期', dataIndex: 'yyrq' },
            { title: '体检日期', dataIndex: 'tjrq' },
            { title: '医疗机构', dataIndex: 'yljg' }
        ];
    
        const rowSelection = {
            type:'radio',
            onChange: this.onSelectChange,
            onSelect: (record, selected, selectedRows) => {
                console.log("record: ",record, "selected: ",selected, "selectedRows: ",selectedRows);
                this.setState({
                    record : record,
                    isRecord : true
                },(record)=>{
                    console.log("record in rowSelection: ",this.state.record);
                });
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                console.log(selected, selectedRows, changeRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',
            }),
        };

        const data = this.state.data && this.state.data;

        const showMore = {
            display:'block',
            transition:'.3s linear',
            marginTop:'10px'
        }
        const hideMore = {
            display:'none',
            transition:'.3s linear',
            marginTop:'10px'
        }

        return (
            <div style={{background:'#fff',padding:'10px',borderRadius:'4px'}} className="patientList">
                <InputGroup style={{ border:'1px solid #d8d8d8',borderRadius:'4px',padding:'20px',width:'98.2%',margin:'0 auto',marginTop:'10px'}}>
                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item label='体检编号'>
                                {getFieldDecorator('tjbh',{
                                    rules: [{ message:'给老子输入' }]
                                })(<Input />)}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label='套餐名称'>
                                {getFieldDecorator('tcmc',{
                                    rules: [{ message:'给老子输入' }]
                                })(<Input />)}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label='预约时间'>
                                {getFieldDecorator('yysj',{
                                    rules: [{ message:'给老子输入' }]
                                })(<DatePicker />)}
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Button icon='search' style={{ background:'#0ab4cb', color:'#fff', border:'none'}}>查询</Button>
                        </Col>
                        <Col span={3}>
                            <div onClick={this.unFold} style={{cursor:'pointer',color:'#ff9f40',width:'50px',lineHeight:'32px'}}>
                                <Icon type={this.state.fold ? 'down' : 'up'} className='collapse'  />&nbsp;&nbsp;{this.state.foldState}
                            </div> 
                        </Col>
                    </Row>
                    <Row gutter={24} style={this.state.fold ? hideMore : showMore }>
                        <Col span={6}>
                            <Form.Item label='待定1'>
                                {getFieldDecorator('dd1',{
                                    rules: [{ message:'给老子输入' }]
                                })(<Input />)}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label='待定2'>
                                {getFieldDecorator('dd1',{
                                    rules: [{ message:'给老子输入' }]
                                })(<Input />)}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label='待定3'>
                                {getFieldDecorator('dd1',{
                                    rules: [{ message:'给老子输入' }]
                                })(<DatePicker />)}
                            </Form.Item>
                        </Col>
                    </Row>
                </InputGroup>
                <div style={{background:'#fff',padding:'10px',borderRadius:'4px',marginTop:'10px'}}>
                    <Table 
                        rowSelection={rowSelection} 
                        columns={columns}
                        dataSource={this.state.records}
                        size="middle"
                        pagination={{
                            total: data.total,
                            defaultPageSize: 1,
                            pageSize: data.size,
                            position:'',
                            current:data.current,
                            }}
                        onChange={this.props.onChange}
                        style={{
                            border:'1px solid #d8d8d8',
                            borderRadius:'4px',
                        }}
                    />
                </div>
            </div>
        )
    }
}
PatientsList = Form.create({})(PatientsList)
export default PatientsList