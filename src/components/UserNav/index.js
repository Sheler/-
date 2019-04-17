import { Icon,  Dropdown, Menu} from 'antd'
import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Login from '../../routes/Login'
const SubMenu = Menu.SubMenu;

class UserNav extends Component {
    constructor(props){
        super(props)
        this.state={
            status:'block'
        }
    }

    clearRouter(){
      console.log("111")
      // this.props.history.length = 0;
    }

    onQuit = ()=>{
      function welcome() {
        setTimeout(Modal.confirm(
            {
                title: '确认',
                content: '您确定要退出吗',
                centered: true,
                footer: true,//底部按钮在此处怎么给去掉
                okText:''
              }
          ).destroy,1500)
      }    
    }

    render(){
        const menu = (
          <Menu style={{ padding:20 }}>
            <Menu.Item>
              个人中心
            </Menu.Item>
            <Menu.Item>
              系统设置
            </Menu.Item>
            <SubMenu key="sub1" title={<span>选项一</span>} placement='bottomRight'>
              <Menu.Item key="1">选项1选项1选项1</Menu.Item>
              <Menu.Item key="2">选项2</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span>选项二</span>} disabled>
              <Menu.Item key="1">选项1</Menu.Item>
              <Menu.Item key="2">选项2</Menu.Item>
            </SubMenu>
            <Menu.Divider />
            <Menu.Item>
              <Link onClick={this.onQuit}>退出</Link>
            </Menu.Item>
          </Menu>
        );
        return(
            <div style={{ marginRight:'50px', lineHeight:'50px'}}>
                <Dropdown overlay={menu} placement='bottomRight'>
                    <a className="ant-dropdown-link" href="#">
                    <span style={{fontSize:16, color:'#fff'}}> 欢迎您 admin ! </span>
                    <Icon type="down" style={{fontSize:16, color:'#fff'}}/>
                    </a>
                </Dropdown>
            </div>
        )
    }
}

export default UserNav