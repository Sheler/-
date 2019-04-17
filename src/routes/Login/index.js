// 这是登陆页面

import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox, Modal} from 'antd'
import { withRouter, browserHistory } from 'react-router-dom'
import { observer } from 'mobx-react'
import Store from '../../store'
import axios from 'axios'
import './style.css'

 function Tips (){
     return (
        <div
            style={{ position:'fixed',
                     top:20,right:20,
                     width:200,height:100,
                    //  border:'1px solid #fff',
                     color:'#fff',
                     padding:20,
                     background:'rgba(255,255,255,.4)',
                     borderRadius:4
                }}
            onClick={ console.log("怎么会是这个样子啊") }
        >
            <p>初始用户名：admin</p>
            <p>初始密码：888888</p>
        </div>
     )
 }

function warning() {
  setTimeout(Modal.warning(
    {
        title: '警告！',
        content: '用户名或密码有误',
        centered: true,
        footer: false,//底部按钮在此处怎么给去掉
        okText:'知道了'
      }
  ).destroy,1000)
}

function welcome() {
    setTimeout(Modal.success(
        {
            title: '欢迎您！',
            content: '祝您一天好心情！',
            centered: true,
            footer: false,//底部按钮在此处怎么给去掉
            okText:'知道了'
          }
      ).destroy,1500)
}

let Login = observer(
class Login extends Component{

    constructor(props){
        super(props)
        console.log("props in Login||||||||||||||||||||||||||||||||||||||| ",props)
        this.state = {
            host:'',
            token:'',
            userId:'',
            UserNameFocused: true,
            PassWordFocused: false
        }
    }

    // ···

    handleSubmit = (e) => { 
        
        //需要有个错误页面 token不存在 返回400 401呢
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);

            //后台登录验证

            // axios({
            //     method:'post',
            //     url:`${Store.host}/token/login?mm=${values.passWord}&yhbh=${values.userName}`,
            //     headers:{ 'Content-Type': 'application/json','Auth-Token':`${Store.token}` }
            // })
            // .then((response)=>{
            //     console.log("response after click login",response)
            //     //数据存在response>data>{code,data:{token,id},msg} code: 0/1, msg: failed/success, token:xxx
            //     // sessionStorage.setItem("token",response.data.data.token);
            //     if(response.data.code == 1){
            //         //或者设置一个公共状态存储token和id方便每个页面去使用
            //         this.setState({
            //             token: response.data.data.token,
            //             userId: response.data.data.userId
            //         },()=>{
            //             Store.setCommonInfo(this.state.host,this.state.token,this.state.userId);
            //         })
            //         welcome();
            //         this.props.history.replace("/Index/HomePage");
            //         // this.props.checkAuth();//勿删
            //         console.log("this.props.checkAuth",this.props.checkAuth)
            //     }else if(response.data.code == -1){
            //         alert("用户名不存在");
            //     }else{
            //         alert("密码错误");
            //     }
            // })


            //本地登录验证
            if(values.userName == "admin" & values.passWord == "888888"){
                welcome();
                this.props.history.replace("/Index/HomePage");
                this.props.checkAuth();
                console.log("this.props.checkAuth",this.props.checkAuth)
            }else{
                // alert("用户名或密码错误！")
                warning()
                return false
            }
          }
        });
      }

    checkStatus(status){
        console.log("status: ",typeof(status),status)
        this.props.checkStatus(status);
    }

    addUserNameStyle = ()=>{this.setState({UserNameFocused:true})}
    delUserNameStyle = ()=>{this.setState({UserNameFocused:true})}
    addPassWordStyle = ()=>{this.setState({PassWordFocused:true,UserNameFocused:false})}
    delPassWordStyle = ()=>{this.setState({PassWordFocused:false,UserNameFocused:true})}

    componentWillMount(){
        // const hostName = location.host;
        const host = window && window.location && window.location.host;
        this.setState({
            host: host
        },()=>{
            Store.setCommonInfo(this.state.host,this.state.token,this.state.userId);
        })
        // const hostName = browserHistory.getCurrentLocation().pathname;
        console.log(" hostName^^^^^^^^^^^^^^^^^^^@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",host)
        console.log("Store",Store)
        // Store.setCommonInfo(this.state.host,this.state.token,this.state.id);
    }

    render(){

        //...
        const { getFieldDecorator } = this.props.form;

        const style1 = {
            borderLeft:'5px solid #5289db',
            background:'#dee5ed',
            padding:'20px 20px '
        }
        const style2 = {
            padding:'20px 20px ',
            borderLeft:'5px solid #f0f4f7',
        }

        return(
            <div id="components-form-demo-normal-login">
                {/* <Tips /> */}
                {/* <div className="sysName"></div> */}
                <Form onSubmit={this.handleSubmit} className="login-form" style={{boxShadow:'5px 5px 5px #198eba'}}>

                    <div style={{width:'310px',margin:'0px auto',padding:'18px 0px',textAlign:'center',verticalAlign:'center',lineHeight:'30px'}}>
                        <Icon type="branches" style={{color:'#1890ff',fontSize: '40px'}} />
                        <span style={{color:'#1890ff',fontWeight:'bold',fontSize:'26px'}}>区域体检一体化平台</span>
                    </div>

                    <div className="userName" style={this.state.UserNameFocused?style1:style2}>
                        <Form.Item>
                            {getFieldDecorator('userName', {
                                defaultValue:'用户名',
                                rules: [
                                    { required: true, message: '用户名不能为空!' },
                                    // { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '用户名不存在'}
                                ],
                            })(
                                <Input onFocus={this.addUserNameStyle} onBlur={this.delUserNameStyle} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                            )}
                        </Form.Item>
                    </div>
                    
                    <div className="passWord" style={this.state.PassWordFocused?style1:style2}>
                        <Form.Item>
                            {getFieldDecorator('passWord', {
                                defaultValue:'密码',
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input onFocus={this.addPassWordStyle} onBlur={this.delPassWordStyle} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                            )}
                        </Form.Item>
                    </div>
                    
                    <div style={{padding:'20px 20px'}}>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住密码</Checkbox>
                            )}
                            <a className="login-form-forgot">忘记密码</a>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{margin:'10px 0px'}}>
                                点击登录
                            </Button>
                            <a>开始注册</a>
                        </Form.Item>
                    </div>
                    <div style={{color:'rgba(255,255,255,.6)',marginTop:'30px'}}>浙江康略软件有限公司 @2010-2019 Tel:0571-8888888</div>
                </Form>
            </div>
        );
    }
})

Login = Form.create({ name: 'normal_login' })(Login);
// export default withRouter(Login)
export default withRouter(Login)