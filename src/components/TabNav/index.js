import React from 'react'
import { Tabs } from 'antd';
import './style.css'
const TabPane = Tabs.TabPane;

class TabNav extends React.Component {
  constructor(props) {
    super(props);
    console.log("this.props in TabNav",props)
    this.newTabIndex = 0;
    const panes = this.props.item;
    this.state={
        // activeKey: panes[0].key,
        panes,
        type: 'editable-card',
        selected: true
      };
  }

  onChange = (activeKey) => {
    console.log('activeKey',activeKey)
    if(activeKey == "首页"){
      this.props.history.push('/Index/HomePage')
      this.setState({selected: true},()=>{
        console.log(this.state.selected,"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
      })
    }else{
      this.setState({selected: false},()=>{
        console.log(this.state.selected,"*************************")
      })
    }
    this.setState({ activeKey });
    this.props.checkItemChange(activeKey);
    if(this.state.panes == []){

    }
    for(let item in this.state.panes){
      if(this.state.panes[item].key == activeKey){
        console.log("this.state.panes[item].content",this.state.panes[item].content)
        this.props.history.push(`${this.state.panes[item].content}`)
    }}
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey);
    //console.log("onEdit被执行了)))))))))))");
  }

  add = () => {
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey });
    this.setState({ panes, activeKey });
  }

  remove = (targetKey) => {
    console.log("remove被触发了")
    console.log("targetKey in TabNav",targetKey)
    console.log("targetKey in TabNav",typeof(targetKey));
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key == targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key != targetKey);
    if (panes.length && activeKey == targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
    this.props.getRemovedItem(targetKey);
  }

  static getDerivedStateFromProps(props, state){
    console.log("this in getDerivedStateFromProps",this)
    console.log("getDerivedStateFromProps",props);
    state.panes = props.item;
    console.log("panes",state.panes)
    return state
  }

  render() {
    
    const selected = {
      borderBottom: '3px solid #0ab4cb !important',
      color:'#0ab4cb !important',
    }

    const notSelected = {
      borderBottom:'none!important',
      color:'#000000a6 !important',
    }

    return (
      <div>
        <Tabs
          hideAdd
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          type={this.props.type}//顶部标签的显示类型 底部横线、带叉号卡片、不带叉号卡片
          // type="editable-card"
          onEdit={this.onEdit}
          defaultActiveKey="首页"
        >
          <TabPane tab="首页" key="首页" id="homePage" style={selected?selected:notSelected}></TabPane>
          {this.state.panes.map(pane => 
            <TabPane tab={pane.title} key={pane.key}></TabPane>
          )}
        </Tabs>
      </div>
    );
  }
}

// export default withRouter(TabNav)
export default TabNav