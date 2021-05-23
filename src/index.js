import React  from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from "./redux/store"
import App from './App'
import storeUtils from "./util/storeUtils"
const user=storeUtils.getUser()   //页面一启动刷新，便将本地中的用户数据读取出来
ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
    )
  ,document.getElementById('root'))