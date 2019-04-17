import React, { Component } from 'react'
import { Icon, Layout, Button, Modal } from 'antd';
import MySider from '../../components/MySider'
import { withRouter, Route, Switch } from 'react-router-dom'
import TabNav from '../../components/TabNav'
import axios from 'axios'
import { observer } from 'mobx-react'
import Store from '../../store.js'
import './style.css'

import PatientsList from '../PatientsList'
import DataDic from '../DataDic'
import UsersList from '../UsersList'
import SysManager from '../SysManager'
import AccountSafety from '../AccountSafety'
import HomePage from '../HomePage'
import Test from '../Test'

const { Header, Content, Sider } = Layout;

// @withRouter
let Index = observer(
class Index extends Component{
  state = {
    collapsed: false,
    //panel : [{ title: '这是一种病', content: '/PEManager', key: 'PEManager' }],//设置顶部标签默认打开的选项 默认是左侧导航的第一项
    panel : [],//设置顶部标签默认打开的选项 默认是左侧导航的第一项
    activeKey:"首页",//这个很重要 起着衔接左侧导航和顶部标签的同步交互的作用
    host:"",//个人娱乐用来测试功能的值
    sub: []
  };

  getSiderItem(e){
    // console.log("this.state.panel",this.state.panel)
    // console.log("e from MySider",e)
    //console.log("e from MySider",e.item.props.children.props)//{to: "/PEManager", children: "选项1"} 
    //key等于children key也可以直接e.key获取
    const props = e.item.props.children.props;
    console.log("props______________________________________",e)
    const obj = {};//创建一个临时的对象 用来接收左侧被点击的选项 需要从e中取到3个属性 如下
    obj.title = props.children
    obj.content = props.to
    obj.key = e.key
    console.log("obj_____________",obj)
    
    this.setState({
      activeKey : e.key //设置当前选中的项
    },()=>{
      console.log("点击TabNav之后的activeKey",this.state.activeKey)
    })
    this.TabNav.onChange(e.key);//调用TavNav组件的方法 让他同步变化当前选中的项
    let currentPanel = this.state.panel.slice(0);//复制当前的panel数组
    //bug
    //底下的remove改变了这个状态 但是这个currentPanel还保留之前的那个状态 
    //所以它里面默认还是有3 直到再次点击3 执行这个方法 currentPanel才会重新读取被remove更新过的状态
    //所以当我把3remove之后 我再add3 这时候 这个方法触发 但是会发现currentPanel[item].key == obj.key 因为currentPanel还是remove之前的 
    //所以两个key相等 然后就不会执行push方法了
    //解决办法是 把这个currentPanel和两个方法共享
    //···一个静态方法搞定所有···
    console.log("每次的初始currentPanel",currentPanel)
    if(currentPanel.length == 0){
      currentPanel.push(obj);
    }else{
      for(let item in currentPanel){//遍历当前panel
        //向panel中push 不重复的obj 如果传来的是一个重复属性的obj 不push 中断本次循环
        if(currentPanel[item].key == obj.key) {
          break;
        }    
        if(item == currentPanel.length-1) {//确保遍历了一圈 都没有重复的key选项出现
          if(currentPanel.length <= 9){//限定tab标签的展示数量为10个 如果不限制其实也没关系 因为这个组件是可以伸缩的 有<>按钮
            currentPanel.push(obj);
            console.log("每次push之后的currentPanel",currentPanel) 
          }else{//如果panel中有10个元素了 就不让增加了
            alert("菜单项打开过多！")
            return false
          }
        } 
      }
    }
    this.setState({
      panel: currentPanel
    },()=>{
      console.log("push 之后的panel",this.state.panel)
    })
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  
  jump(){
    this.props.history.push('Login')
  }

  checkItemChange = (activeKey) => {
    this.MySider.onItemChange(activeKey);
    this.setState({
      activeKey:activeKey
    },()=>{
      console.log("点击切换TabNav之后的activeKey",activeKey)
    })
  }

  getRemovedItem = (targetKey) => {
    console.log("ddddddddddddddddddddddddddddd")
    let tempPanel = this.state.panel.slice(0);
    console.log("tempPanel_______________________________________",tempPanel);
    console.log('删除TabNav中的项目之后的targetKey',targetKey)
    if(tempPanel.length>=1){
      for(let item in tempPanel){
        if(tempPanel[item].key == targetKey){//找到现在所有的pane中key值等于删除的这个的key值
          tempPanel.splice(item,1);
          console.log("item",item)
          if(targetKey == this.state.activeKey){//如果叉掉的这个项目的key等于当前正在显示的项目的key
            console.log("你确实叉掉了当前显示的项目")
            if(item>0){//如果这一项不是第一项，就让他往前跑
              console.log("item > 0+++++++++++++++")
              this.setState({
                activeKey:  tempPanel[item-1].key
              },()=>{
                console.log("item>0 activeKey",this.state.activeKey)
                this.MySider.onItemChange(this.state.activeKey);
              })
            }else if(item == 0 && tempPanel.length>0){//如果被叉掉的这一项 是第一项 而且操作完的数组至少还剩1个元素
              console.log("item == 0+++++++++++++++")
              this.setState({
                activeKey:  tempPanel[item].key,//为什么让他等于item.key而不是item+1.key呢 是因为这时候数组已经变了 之前排在他后面的索引取代了他
              },()=>{
                console.log("show+++++++++++++++++++++++++++++",this.state.show)
                console.log("item==0 activeKey",this.state.activeKey)
                console.log("panel######################",this.state.panel)
                this.MySider.onItemChange(this.state.activeKey);
              })
            }else {
              this.setState({panel: []},()=>{this.MySider.onItemChange("首页");})
              this.props.history.push('/Index/HomePage')
            }
          }
        }
      }
    
      this.setState({
        panel:tempPanel,
      })
  }}

  static getDerivedStateFromProps(props, state) {
    console.log("this in index getDerivedStateFromProps",this)
    console.log("^^^^^^^^^^^^^^^^",state.panel)
    // state.panel[0].disabled = true

    if(state.panel.length>0){
      state.type = 'editable-card'
    }else{
      state.type = 'card'
    }
    state.host = Store.host;
    state.token = Store.token;
    state.userId = Store.userId;
    console.log("打印一下有host的状态",state)
    return state
  }

  onQuit = ()=> {
    const _this = this
    Modal.confirm({
      title: '您确定要退出吗？',
      content: '退出后需要重新登陆，请确保相应操作已经保存',
      centered: true,
      footer: true,
      okText:'确认',
      cancelText:'取消',
      onOk(){
        // axios({
        //   method:'delete',
        //   url:'${Store.host}/token/logout',
        //   headers:{
        //     'ContentType':'application/json',
        //     'Auth-Token':`${Store.token}`
        //   }
        // })
        // .then((response)=>{
        //   console.log('response after login out',response)
        // })
        _this.props.history.push('/');
        if(_this.props.changeAuth){
          _this.props.changeAuth()
        }},
      onCancel(){}
    })
  }

  render(){

    const Logo = () =>(
      <img src={require('./logo.png')} width="32px" height="32px" style={{marginTop:'-10px',marginRight:'10px'}} alt=""/>
    )

    const LogoIcon = props =>(
      <Icon component={Logo} {...props} />
    )

    return (        
          <Layout style={{ height:650}} className="scroll_content">
            <Header style={{ display:'flex', justifyContent:'space-between', background: '#0ab4cb', padding: 0, fontWeight:'bold', color:'#fff', height:50}}>
              <div style={{color:'#fff', marginLeft:20, fontWeight:'500',fontSize:'20px',lineHeight:'50px'}}>
                <LogoIcon />
                  区域体检一体化平台
              </div>
              {/* <UserNav/> */}
              <div style={{ display:'flex', marginRight:'30px'}}>
                <Button icon="user" style={{fontSize:'14px', border:'none',background:'none',color:"#fff",lineHeight:'50px'}}>管理员 仁和康复医院</Button>
                <Button onClick={this.onQuit} icon="poweroff" style={{marginLeft:'10px', fontSize:'14px', border:'none',background:'none',color:"#fff",lineHeight:'50px'}}>退出</Button>
              </div>
            </Header>
            <Layout>
            <Sider
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
            >
              <MySider 
                id="components-layout-demo-custom-trigger" 
                getSiderItem={this.getSiderItem.bind(this)}
                ref={(MySider) => { this.MySider = MySider; }}
                sub={this.state.sub}
              />
            </Sider>
              <Layout style={{overflowY:'auto'}}>
                <Header style={{ background: '#fff', padding: 0, height:39, position:'relative'}}>
                  <TabNav 
                    history={this.props.history}
                    item={this.state.panel} 
                    type={this.state.type}
                    ref={(TabNav) => { this.TabNav = TabNav; }}
                    checkItemChange={this.checkItemChange}
                    getRemovedItem={this.getRemovedItem}
                    // style={{marginTop:10}}                   
                  />
                </Header>
                <Content style={{
                   height: 'auto',
                   margin: '20px',marginTop:'10px', background: 'none',overflow:'auto' 
                }}
                >
                  <div style={{ height: 'auto' }}>
                    <Switch>
                      <Route path="/Index/HomePage" component={HomePage} />
                      <Route path="/Index/PatientsList" component={PatientsList} />
                      <Route path="/Index/UsersList" component={UsersList} />
                      <Route path="/Index/DataDic" component={DataDic} />
                      <Route path="/Index/SysManager" component={SysManager} />
                      <Route path="/Index/AccountSafety" component={AccountSafety} />
                      <Route path="/Index/Test" component={Test} />
                    </Switch>
                  </div>
                </Content>
                </Layout>
              </Layout>
          </Layout>
    )
  }
}
)

export default withRouter(Index)