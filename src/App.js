import React, { Component } from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom'
import Login from './routes/Login'
import Index from './routes/Index'
import Test from './Test.js'

import renderRoutes from './renderRoutes'
import routes from './router'
let authed = false //
const authPath = '/' // 默认未登录的时候返回的页面

const what = renderRoutes(routes, authed, authPath)
console.log("++++++++++++++",what)

class App extends Component {

  checkAuth = ()=> {
    authed = true
  }

  changeAuth = ()=> {
    authed = false
  }

  render() {
    return (
      <Switch>
        {/* {renderRoutes(routes, authed, authPath, this.checkAuth, this.changeAuth)} */}
        <Route path='/Index' component={Index}/>
        <Route path='/' component={Login}/>
        <Test />
      </Switch>
    );
  }
}

export default withRouter(App);