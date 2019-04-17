import React, { Component } from 'react'
import { Input, Button, DatePicker, Select, Modal, Form, Col, Row} from 'antd'
import Store from '../../../store'
import './style.css'
import moment from 'moment';
import 'moment/locale/zh-cn';
import axios from 'axios'
moment.locale('zh-cn');

function warning() {
  setTimeout(Modal.warning(
    {
        title: '警告！',
        content: '输入有误',
        centered: true,
        footer: false,//底部按钮在此处怎么给去掉
        okText:''
      }
  ).destroy,1000)
}

class AddItem extends Component {
  constructor(props){
    super(props);
    console.log("props",props)
    this.state = {
      visible: false
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    e.preventDefault();
    let newItem = this.props.form.getFieldsValue();
    console.log("newItem",newItem);
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const _this = this;
        axios({
          method: 'POST',
          url: `${Store.host}/user/createYh`,
          headers: {'Content-Type': 'application/json','Auth-Token':`${Store.token}`},
          data: newItem,
        })
        .then((response)=>{
          console.log("response after add newItem",response)
          _this.props.addItem(newItem);
        })
        _this.setState({
          visible: false,
        });
        _this.props.form.resetFields()
      }
      else{
        warning()
        return false
      }
    })
  }

  handleCancel = (e) => {
    console.log(e);
    console.log("你点了取消");
    this.setState({
      visible: false,
    });
    this.props.form.resetFields()
  }

  render() {

    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{display:"inline-block",marginRight:4}}>
        <Button icon='file-add' style={{border:'1px solid #0ab4cb',color:'#0ab4cb'}} onClick={this.showModal}>新增</Button>
        <Modal title="" visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel}
          width="80%" style={{top:40}} maskClosable={false}
        >
          <div className="formHeader" style={{height:60}}>
              <span style={{
                borderLeft:"5px solid #108ee9",
                textAlign:"center",
                display:"inline-block",
                verticalAlign:"center",
                paddingLeft:"10px",
                fontSize:"18px",
                lineHeight:"18px",
                fontWeight:500
                }}>用户信息</span>
              <div className="btnGroup" style={{float:"right",marginRight:"25px"}}>
              </div>
          </div>

          <Form onSubmit={this.handleOk} id="AddData" style={{margin:'0 auto'}}>
            <Row gutter={8}>
                <Col span={8}>
                    <Form.Item label="用户编号">
                        {getFieldDecorator("yhbh",{
                          rules:[{required:true,message:'此为必填项'}]
                        })(
                        <Input />
                        )}
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label="用户姓名">
                    {getFieldDecorator("yhxm",{
                      rules:[{ required:true ,message:'此项为必填项'}]
                    })(
                        <Input />
                    )}
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label="用户状态">
                        {getFieldDecorator("zt",{
                          initialValue:'1',
                          rules:[{ required:true ,message:'此项为必填项'}]
                        })( 
                          <Select placeholder="请选择状态">
                            <Select.Option value="0">停用</Select.Option>
                            <Select.Option value="1">启用</Select.Option>
                          </Select>
                        )}
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={8}>
                <Col span={8}>
                    <Form.Item label="身份证号">
                    {getFieldDecorator("yhsfz",{
                      rules:[{ pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证号!'}]
                    })(
                    <Input />
                    )}
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label="用户性别">
                    {getFieldDecorator("yhxb",{
                      initialValue:'9'
                      // rules: [{ required: true, message: '请输入对应内容!' }],
                    })(
                      <Select placeholder="请选择性别">
                            <Select.Option value="0">未知</Select.Option>
                            <Select.Option value="1">男</Select.Option>
                            <Select.Option value="2">女</Select.Option>
                            <Select.Option value="9">未说明</Select.Option>
                        </Select>
                    )}
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label="联系电话">
                        {getFieldDecorator("lxdh",{
                          rules: [{ pattern:/^1[34578]\d{9}$/, message: '请输入正确的手机号' }] 
                        })(
                          <Input />
                        )}
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={8}>
                <Col span={8}>
                    <Form.Item label="用户机构">
                        {getFieldDecorator("yhjg",{
                          rules: [{ required: true, message: '请选择对应选项!' }],
                        })( 
                          <Select placeholder="请选择机构" 
                            // onFocus={this.onDiseaseFocus.bind(this)}
                          >
                            {/* {this.state.diseaseChildren} */}
                          </Select>
                        )}
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label="用户组">
                        {getFieldDecorator("yhz",{
                          rules: [{ required: true, message: '请选择对应选项!' }],
                        })( 
                          <Select placeholder="请选择用户组" 
                            // onFocus={this.onDiseaseFocus.bind(this)}
                          >
                            {/* {this.state.diseaseChildren} */}
                          </Select>
                        )}
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label="科室选择">
                        {getFieldDecorator("ks",{
                        })(
                          <Select
                            placeholder="请选择科室"
                            mode="multiple"
                            size='default'
                            //onChange={handleChange}//console.log(`Selected: ${value}`);
                            style={{ width: '100%' }}
                            // onFocus={this.onDiseaseFocus.bind(this)}
                          >
                            {/* {this.state.diseaseChildren} */}
                          </Select>
                        )}
                    </Form.Item>
                </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}
AddItem = Form.create({})(AddItem);
export default AddItem