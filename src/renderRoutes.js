import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

const renderRoutes = (routes, authed, authPath = '/', checkAuth, changeAuth) => routes ? (
  <Switch >
    {routes.map((route, i) =>{
        console.log("this.route>>>>>>>>>>",route);
        return <Route
            key={route.key || i}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            render={(props) => {
                // console.log("this.route>>>>>>>>>>",route)
                if(!route.requiresAuth || authed || route.path == authPath){
                    return <route.component authed={authed} checkAuth={checkAuth} changeAuth={changeAuth}/>
                }
                return <Redirect to={{ pathname: authPath, state: { from: props.location } }} />
            }}
      />
    })}
  </Switch>
) : null

export default renderRoutes