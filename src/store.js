import { observable, action, decorate } from "mobx";
import { Component } from 'react'

class Store {
// class Store extends Component{
    host= "http://182.106.191.39:12345";
    // host= "http://192.168.8.107:9090";
    token = "";
    userId = "";
    setCommonInfo = (host,token,userId)=>{
        this.host = host;
        this.token = token;
        this.userId = userId;
    }
}

decorate(
    Store,{
        host: observable,
        token: observable,
        userId: observable,
        setCommonInfo: action
    } 
)

export default new Store()