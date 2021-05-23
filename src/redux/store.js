import {applyMiddleware, createStore} from "redux"
import thunk from "redux-thunk"    //可以执行异步action
import reducer from './reducer'
import {composeWithDevTools} from "redux-devtools-extension"  //使得控制台redux调试工具可以调试

export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))

//createStore接收reducer对象，返回store