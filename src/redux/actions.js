
// 包含多个action creator 函数的模块
// 同步action: 对象{type:xxx,data:xxx}
// 异步action: 函数dispatch=>{}

import {RECEIVE_USER, RESET_USER, SET_HEAD_TITLE} from "./action-types";
import {reqLogin} from "../api";
import {message} from "antd";
import storeUtils from "../util/storeUtils";

//设置头部的同步action
export const SetHeadTitle=(headTitle)=>({type:SET_HEAD_TITLE,data:headTitle})

export const receiveUser=(user)=>({type:RECEIVE_USER,user})

export const logout=()=>{
    storeUtils.removeUser()
    return {type:RESET_USER}
}
//设置用户的异步action
export const login=(username,password)=>{
    return async dispatch=>{
        //执行异步ajax请求
        const response = await reqLogin(username, password)
        if(response.status===1){
            message.error('用户名或者密码不正确')
        }
        //如果成功，分发同步的action
        else {
            const user=response
            dispatch(receiveUser(user))
            message.success('登录成功')
            storeUtils.saveUser(user)  //将登录用户数据保存在本地中
        }
    }
    }
