import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { observer } from 'mobx-react'
import Store from '../../store'
import './style.css'

// axios.defaults.baseURL = 'https://api.example.com';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const SubMenu = Menu.SubMenu;

let MySider = observer(
class MySider extends React.Component {
  constructor(props){
    super(props)
    console.log("props in MySider",props)
    this.state = {
      current: 'homePage',
      openKeys: ['sub1'],
      sub: [],
      subSon: []
    }
  }
  
  fetchSub = () => {
    console.log("store in Mysider-------------------------------",Store)
    axios({
      method: 'get',
      url: `${Store.host}/cd/selectCd/0`,
      headers: {
        'Content-Type': 'application/json',
        'Auth-Token': `${Store.token}`
      },
    })
    .then((response)=>{
      console.log("axios执行了++++++++++++++++++++++++++++++++++++++++++")
      console.log("response.data.data",response.data.data);
      console.log("response",response);
      if(response.data.data.length != 0){
        console.log(response.data.data[0].mc)
        const newSub = response.data.data.slice(0)
          this.setState({
            sub : newSub
          },()=>{
            console.log("shme")
            console.log("this.state.sub",this.state.sub)
          })
      }
    })
    .catch((error)=>{
      console.log("error",error)
    })
  }

  fetchSubSon = (i) => {
    console.log("store in Mysider",Store)
    axios({
      method: 'get',
      url: `${Store.host}/cd/selectCd/${i}`,
      headers: {
        'Content-Type': 'application/json',
        'Auth-Token': `${Store.token}`
      }
    })
    .then((response)=>{
      console.log("response.data.data",response.data.data);
      console.log("response",response);
      if(response.data.data.length != 0){
        // console.log(response.data.data[0].mc)
        const newSubSon = response.data.data.slice(0)
          this.setState({
            subSon : newSubSon
          },()=>{
            console.log("shme")
            console.log("this.state.subSon",this.state.subSon)
          })
      }
    })
    .catch((error)=>{
      console.log("error",error)
    })
  }

  componentWillMount(){
    this.fetchSub();
    this.fetchSubSon(1);
  }

  querySubSon = ()=>{
    console.log("you just clicked me")
  }

  handleClick = (e) => {
    console.log('Clicked: ', e);
    this.setState({ current: e.key });
    this.props.getSiderItem(e);
  }

  onItemChange = (item) => {
    this.setState({ current: item });
  }

  onOpenChange = (openKeys) => {
    const state = this.state;
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    console.log('latestOpenKey now',latestOpenKey)
    if(latestOpenKey){
      this.fetchSubSon(latestOpenKey.substr(latestOpenKey.length-1,1))
    }
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    this.setState({ openKeys: nextOpenKeys });
  }

  getAncestorKeys = (key) => {
    const map = {
    //   sub3: ['sub2'],
    };
    return map[key] || [];
  }

  render() {
    const Sub = this.state.sub && this.state.sub.slice(0);
    const SubSon = this.state.subSon && this.state.subSon.slice(0);
    // if(this.state.sub){

    // }
    // console.log("Sub",this.state.sub)
    let tb0 = Sub[0] && Sub[0].tb;
    let tb1 = Sub[1] && Sub[1].tb;
    let tb2 = Sub[2] && Sub[2].tb;
    let tb3 = Sub[3] && Sub[3].tb;
    let tb4 = Sub[4] && Sub[4].tb;
    // console.log('tb1',tb1)
    // let tb2 = tb1.substring(1,tb1.length-1)
    // console.log('tb2',tb2)
    // const HeartSvg = () => (
    //   tb2 && tb2
    // );

    // const HeartIcon = props => (
    //   <Icon component={HeartSvg} {...props} />
    // );

    // img src={`${Store.host}/images/${tb1}`}

    // console.log("aaaaaaaaaaaaaaa",this.state.sub)

    return (

    <div  id='components-layout-demo-custom-trigger'>
      {/* <div className="logo" /> */}
      <Menu
        mode="inline"
        theme="dark"
        inlineCollapsed={this.state.collapsed}
        openKeys={this.state.openKeys}
        selectedKeys={[this.state.current]}
        onOpenChange={this.onOpenChange}
        onClick={this.handleClick}
      >
        {/* {Sub.map((item,i)=>
          <SubMenu 
            onClick={this.querySubSon}
            key={`sub${i+1}`}
            title={<span><img src={`${Store.host}/images/${item.tb}`} 
              style={{width:"20px", height:"20px",marginTop:'-4px',marginRight:'5px'}} alt="" />
              <span>{item.mc}</span>
              </span>}>
              {SubSon.map((item,i)=>
                <Menu.Item key={item.id}>
                  <Link to={item.tzdz}>{item.mc}</Link>
                </Menu.Item>
              )}            
          </SubMenu>
        )} */}

        <SubMenu key="sub1" title={<span><img src={`${Store.host}/images/${tb0}`} style={{width:"20px", height:"20px",marginTop:'-4px',marginRight:'5px'}} /><span>{Sub[0]&&Sub[0].mc}</span></span>}>
          <Menu.Item key="1"><Link to="/Index/PatientsList">患者列表</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/Index/UsersList">用户列表</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/Index/Test">测试列表</Link></Menu.Item>
          <Menu.Item key="4"><Link to="/Index/PEManager">选项4</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span><img src={`${Store.host}/images/${tb1}`} style={{width:"20px", height:"20px",marginTop:'-4px',marginRight:'5px'}} /><span>{Sub[1]&&Sub[1].mc}</span></span>}>
          <Menu.Item key="5"><Link to="/Index/DataDic">选项1</Link></Menu.Item>
          <Menu.Item key="6"><Link to="/Index/DataDic">选项2</Link></Menu.Item>
          <Menu.Item key="7"><Link to="/Index/DataDic">选项3</Link></Menu.Item>
          <Menu.Item key="8"><Link to="/Index/DataDic">选项4</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" title={<span><img src={`${Store.host}/images/${tb2}`} style={{width:"20px", height:"20px",marginTop:'-4px',marginRight:'5px'}} /><span>{Sub[2]&&Sub[2].mc}</span></span>}>
          <Menu.Item key="9"><Link to="/Index/RepAnalysis">选项1</Link></Menu.Item>
          <Menu.Item key="10"><Link to="/Index/RepAnalysis">选项2</Link></Menu.Item>
          <Menu.Item key="11"><Link to="/Index/RepAnalysis">选项3</Link></Menu.Item>
          <Menu.Item key="12"><Link to="/Index/RepAnalysis">选项4</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub4" title={<span><img src={`${Store.host}/images/${tb3}`} style={{width:"20px", height:"20px",marginTop:'-4px',marginRight:'5px'}} /><span>{Sub[3]&&Sub[3].mc}</span></span>}>
          <Menu.Item key="13"><Link to="/Index/SysManager">选项1</Link></Menu.Item>
          <Menu.Item key="14"><Link to="/Index/SysManager">选项2</Link></Menu.Item>
          <Menu.Item key="15"><Link to="/Index/SysManager">选项3</Link></Menu.Item>
          <Menu.Item key="16"><Link to="/Index/SysManager">选项4</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub5" title={<span><img src={`${Store.host}/images/${tb4}`} style={{width:"20px", height:"20px",marginTop:'-4px',marginRight:'5px'}} /><span>{Sub[4]&&Sub[4].mc}</span></span>}>
          <Menu.Item key="17"><Link to="/Index/AccountSafety">选项1</Link></Menu.Item>
          <Menu.Item key="18"><Link to="/Index/AccountSafety">选项2</Link></Menu.Item>
          <Menu.Item key="19"><Link to="/Index/AccountSafety">选项3</Link></Menu.Item>
          <Menu.Item key="20"><Link to="/Index/AccountSafety">选项4</Link></Menu.Item>
        </SubMenu>
      </Menu>
    </div>
    );
  }
})

export default MySider