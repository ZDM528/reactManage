import storeUtils from "../util/storeUtils";
import {combineReducers} from "redux";
import {RECEIVE_USER, RESET_USER, SET_HEAD_TITLE} from "./action-types"

const initHeadTitle='首页'
function headTitle(state=initHeadTitle,action) {
    switch (action.type) {
        case SET_HEAD_TITLE:
            return action.data
        default:
            return state
    }
}


const initUser=storeUtils.getUser()
function user(state=initUser,action) {
    switch (action.type) {
        case RECEIVE_USER:
            return action.user
        case RESET_USER:
            return {}
        default:
            return state
    }
}

// 向外暴露的为整个reducer对象
// {
//     headTitle:'首页',
//     user:{}
// }

export default combineReducers({
    headTitle,
    user
})