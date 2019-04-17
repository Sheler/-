import React, { Component } from 'react'
import { Table, Form, Col, Row, Input, DatePicker, Button, Icon, Modal, Select } from 'antd'
import { CSSTransition } from 'react-transition-group'
import axios from 'axios'
import AddItem from './AddItem'
import EditItem from './EditItem'
import ViewItem from './ViewItem'
import Store from '../../store'
import './style.css'
import { identity } from 'rxjs';

const InputGroup = Input.Group;
const confirm = Modal.confirm;
let data = [{
    id: '1',
    tjbh: 'John',
    xm: '男',
    xb: '30399999999991',
    csrq: '牙龈肿痛',
    tjtc: '2018-08-08',
    yyrq: '某某机构',
    tjrq: '某某医生',
    yljg: '2018-08-09',
}, {
    id: '2',
    tjbh: 'John',
    xm: '男',
    xb: '30399999999991',
    csrq: '牙龈肿痛',
    tjtc: '2018-08-08',
    yyrq: '某某机构',
    tjrq: '某某医生',
    yljg: '2018-08-09',
}];

class UsersList extends Component{

    constructor(props){
        super(props)
        console.log("props in queryItem",props);
        this.state = {
            data: [],//data就是最顶层的数据 它包含records records是每条列表数据的集合 data还包含了其他信息 譬如总页数 当前页等等
            records: [],
            fold: true,
            foldState: '展开',
            viewItemModal:false,
            viewItemId:'',
            editItemModal:false,
            editItemId:'',
            editItemData:{}
        }
    }

    componentDidMount = ()=>{
        axios({
            url:`${Store.host}/user/selectYhPage`,
            data:{
                current:1,
                zt:0
            },
            method:'post',
            headers: {
                'Content-Type': 'application/json',
                'Auth-Token':`${Store.token}`
            }
        })
        .then((response)=>{
            console.log("response in UserList~~~~~~~~~~~~~~~~~~~~~",response);//response.data.records
            let records = response.data.records;
            records.map((item,index)=>{
                if(item.yhxb == 0) item.yhxb = "未知"
                if(item.yhxb == 1) item.yhxb = "男"
                if(item.yhxb == 2) item.yhxb = "女"
                if(item.yhxb == 9) item.yhxb = "未说明"
            })
            console.log("一通操作之后得到的records",records)
            this.setState({
                data: response.data,
                records: response.data.records
            })
        })

        //本地数据用
        // this.setState({
        //     records: data
        // })
    }

    unFold = ()=>{
        const newFold = !this.state.fold;
        const newFoldState = this.state.fold ? '收起' : '展开';
        this.setState({ fold: newFold, foldState: newFoldState})
    }

    onChange = (pagination)=>{
        console.log('分页正在改变',pagination);
        const { current, pageSize } = {...pagination};
        axios({
            url:`${Store.host}/user/selectYhPage`,
            method:'post',
            headers: {
                'Content-Type': 'application/json',
                'Auth-Token':`${Store.token}`
            },
            data:{
                current:`${current}`,
                zt:0
            }
        })
        .then((response)=>{
            this.setState({
                data: response.data,
                records: response.data.records,
            })
        })
    }


    //新增数据
    addItem = (newItem)=>{
        console.log("你点击了新增按钮");
        let newRecords = this.state.records.slice(0);
        newRecords.unshift(newItem);
        this.setState({
            records: newRecords
        })
    }

    //修改数据
    editItem = (id)=>{
        if(id){
            axios({
              method:'GET',
              url:`${Store.host}/user/selectYhById/${id}`,
              headers:{
                  'Content-Type':'application/json',
                  'Auth-Token':`${Store.token}`
            }})
            .then((res)=>{
              console.log("res+++++++++++",res)
              this.setState({
                editItemId: id,
                editItemModal: true,
                editItemData:res.data.data
              },()=>{
                  console.log("快要崩溃了",this.state)
              })
            })
          }
    }

    listEditItem = (id)=>{
        this.setState({
            editItemModal:true,
            editItemId:id,
        })
    }

    //删除数据
    deleteItem = (id)=>{
        console.log("没什么意思的……………………………………………………………………",id);
        let records = this.state.records.slice(0);
        console.log("records",records);
        for(let item in records){
            if(records[item].id == id){
                records.splice(item,1);
            }
        }
        this.setState({
            records:records
        })
        axios({
            method:'post',
            url:`${Store.host}/user/delYh?yhid=${id}`,
            headers:{
                'Content-Type':'application/json',
                'Auth-Token':`${Store.token}`
            },
        })
        .then((res)=>{
            console.log("删除用户后的返回值",res);
            if(res.data.code == 1){
                (function success() {
                    Modal.success({
                      title: '删除成功',
                    });
                })()
            }
        })
    }

    showdeleteItemModal = (id)=>{
        const _this = this;
        confirm({
            title:'您是否确认删除此项？',
            content:'此操作将会从数据库彻底删除本条数据',
            onOk(){ _this.deleteItem(id) } 
        })
    }

    //打印数据
    printItem = (id)=>{
        console.log("没什么意思的……………………………………………………………………",id);
    }

    doubleClickRow = (record)=>{
        console.log("看下点击单行的效果");
        console.log("record:",record);
        // this.ViewItem.showModal(true);
        //按道理上述调用子组件的办法是可行的 但是可能由于被表单包裹 所以打印的vieItem是个表单不是我要的组件
        //不过静态方法 会导致每次父组件更新 子组件都会强制更新一次
        this.setState({
            viewItemId : record.id,
            viewItemModal : true
        },()=>{
            console.log("viewItemId",this.state.viewItemId)
        })
    }

    invisibleView = () => {
        this.setState({
            viewItemModal:false
        })
    }

    invisibleEdit = () => {
        this.setState({
            editItemModal:false
        })
    }

    //查找框查找数据
    queryData = ()=>{
        let suffix = "?";
        this.props.form.validateFields((err,values)=>{
            if(!err) {
                console.log("value of userList queryData",values);
                let queryItems = this.props.form.getFieldsValue(['yhbh','yhsfz','yhxm']);
                console.log('queryItems in userList',queryItems);
                // let suffixArr = Object.values(queryItems);//遍历对象中的值 只要值
                // console.log("suffixArr",suffixArr)
                // let suffix = suffixArr.join("&").replace("undefined","");
                // console.log("suffix",suffix)
                for(let item in queryItems){
                    if(queryItems[item] !== undefined){
                        suffix += `&${item}=${queryItems[item]}`
                    }
                }
                if(suffix == "?") suffix = '';
                console.log("suffix",suffix)
            }
        })
        axios({
            method:'get',
            url:`${Store.host}/user/selectYhbh/${suffix}`,
            header:{'Content-type':'application/json','Auth-Token':`${Store.token}`}
        })
        .then((response)=>{
            console.log(response,"response when userlist queryData");
               this.setState({
                data: response.data,
                records: response.data.records
               })
        })
    }

    render(){

        const { getFieldDecorator } = this.props.form;

        let dataSource = this.state.records.slice(0);
        dataSource = dataSource.map((item,index)=>{
            return Object.assign(item,{key:index})
        })

        const columns = [
            // { title: '用户id', dataIndex: 'id',
            //   sorter: (a, b) => a.id - b.id,
            // },
            { title: '用户编号', dataIndex: 'yhbh' },
            { title: '用户姓名', dataIndex: 'yhxm',
                filters: [{
                    text:'测试',
                    value:'测试'
                },{
                    text:'管理员',
                    value:'管理员'
                }],
                onFilter: (value,record) => record.yhxm.indexOf(value) === 0,
            },
            { title: '用户性别', dataIndex: 'yhxb', 
                filters: [{
                    text:'男',
                    value: '9'//选什么 value就是什么
                },{
                    text:'女',
                    value: '1'
                }],
                onFilter: (value,record) => record.yhxb == value,
                // console.log(record.yhxb,"record") //record打印出来是所有项 yhxb才是对应的value值
                //onFilter: (value,record) => record.yhxb.includes(value),//找出属性值的第一位等于value的那一项
                filterMultiple: false,
            },
            { title: '用户身份证', dataIndex: 'yhsfz' },
            { title: '联系电话', dataIndex: 'lxdh' },
            { title: '用户机构', dataIndex: 'yhjg' },
            { title: '用户组', dataIndex: 'yhz' },
            { title: '科室', dataIndex: 'ks' },
            { title: '状态', dataIndex: 'zt' },
            {
                title: '操作',
                key: 'action',
                // width: 360,
                render: (text, record) => (
                  <span style={{fontSize:'16px',cursor:'pointer'}}>
                    {/* <EditItem editItemId={this.state.editItemId} onClick={()=>console.log("我被点了")}/> */}
                    {/* <Icon onClick={() => this.editItem(record.id)} type='form' style={{color:'#10b6cc'}} /> */}
                    {/* <Icon onClick={() => this.listEditItem(record.id)} type='form' style={{color:'#10b6cc'}} /> */}
                    <EditItem id={record.id}/>
                    <Icon type='delete' onClick={() => this.showdeleteItemModal(record.id)} style={{color:'#fca301', marginLeft:'14px',marginRight:'14px'}}/>
                    <Icon type='printer' onClick={() => this.printItem(record.id)}style={{color:'#2fac2c'}}/>
                  </span>
                ),
            },
        ];
    
        const rowSelection = {
            // type:'radio',
            type:'checkBox',
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
            <div style={{position:'relative', background:'#fff',padding:'10px',borderRadius:'4px'}} className="userList">
                <InputGroup style={{ border:'1px solid #d8d8d8',borderRadius:'4px',padding:'20px',width:'98.2%',margin:'10px auto'}}>
                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item label='用户编号'>
                                {getFieldDecorator('yhbh',{
                                    rules: [{ message:'给老子输入' }]
                                })(<Input />)}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label='用户身份证'>
                                {getFieldDecorator('yhsfz',{
                                    rules: [{ message:'给老子输入' }]
                                })(<Input />)}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label='用户姓名'>
                                {getFieldDecorator('yhxm',{
                                    rules: [{ message:'给老子输入' }]
                                })(<Input />)}
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Button onClick={this.queryData} icon='search' style={{ background:'#0ab4cb', color:'#fff', border:'none'}}>查询</Button>
                        </Col>
                        <Col span={3}>
                            <div onClick={this.unFold} style={{cursor:'pointer',color:'#ff9f40',width:'50px',lineHeight:'32px'}}>
                                <Icon type={this.state.fold ? 'down' : 'up'} className='collapse'  />&nbsp;&nbsp;{this.state.foldState}
                            </div> 
                        </Col>
                    </Row>
                    <Row gutter={24} style={this.state.fold ? hideMore : showMore}>
                        <Col span={6}>
                            <Form.Item label='医疗机构'>
                                {getFieldDecorator('yljg',{
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
                <div style={{background:'#fff',padding:'10px',borderRadius:'4px'}}>
                    {/* <Button icon='file-add' className='utils' onClick={this.addItem}>新增</Button> */}
                    <AddItem addItem={this.addItem}/>
                    <ViewItem 
                        viewItemModal={this.state.viewItemModal}
                        invisibleView={this.invisibleView}
                        viewItemId={this.state.viewItemId}
                    />
                    {/* <EditItem 
                        listEditItem={this.listEditItem}
                        editItemId={this.state.editItemId}
                        invisibleEdit={this.invisibleEdit}
                        editItemModal={this.state.editItemModal}
                        editItemData={this.state.editItemData}
                    /> */}
                </div>
                <div style={{background:'#fff',padding:'10px',borderRadius:'4px'}}>
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
                            showQuickJumper:true,
                            showTotal:(total, range) => `共计 ${total} 条数据`,
                            }}
                        onChange={this.onChange}
                        onRow={(record) => {
                            return {
                              onDoubleClick: (event) => this.doubleClickRow(record),
                            };
                          }}
                        // rowKey={this.state.records.}
                    />
                </div>
            </div>
        )
    }
}
UsersList = Form.create({})(UsersList)
export default UsersList