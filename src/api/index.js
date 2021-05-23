import ajax from './ajax'
const BASE='/api'
export const reqLogin=(username,password)=>
    ajax(BASE+'/login',{username,password},'POST')

export const reqWeather=()=>
    ajax(BASE+'/weather',{},'GET')

export const reqCategoryList=(parentId)=>
    ajax(BASE+'/categoryList',{parentId},'GET')

export const reqAddCategory=(addCategory,selectData)=>
    ajax(BASE+'/AddCategory',{addCategory,selectData},'POST')

export const reqUpdateCategory=(parentId,categoryId,categoryName)=>
    ajax(BASE+'/UpdateCategory',{parentId,categoryId,categoryName},'POST')

export const reqProductList=(pageNum,pageSize)=>
    ajax(BASE+'/ProductList',{pageNum,pageSize},'GET')

export const reqSearchProduct=(pageNum,pageSize,searchType,searchContent)=>
    ajax(BASE+'/SearchProduct',{pageNum,pageSize,[searchType]:searchContent},'GET')

export const reqUpdateProductStatus=(productId,status)=>
    ajax(BASE+'/UpdateProductStatus',{productId,status},'POST')

export const reqProductBelong=(categoryId)=>
    ajax(BASE+'/ProductBelong',{categoryId},'POST')

export const reqAddProduct=(product)=>
    ajax(BASE+'/AddProduct',{product},'POST')

export const reqDeleteImages=(imagesName)=>
    ajax (BASE+'/DeleteImages',{imagesName},'POST')

export const reqRoleList=()=>
    ajax (BASE+"/RoleList",{},'GET')

export const reqAddRole=(roleName,authTime,authName,)=>
    ajax(BASE+'/AddRole',{roleName,authTime,authName},'POST')

export const reqRoleMenu=(id,menu)=>
    ajax(BASE+'/RoleMenu',{id,menu},'POST')

export const reqUserList=()=>
    ajax(BASE+'/UserList',{},'GET')

export const reqAddUser=(user)=>
    ajax(BASE+'/AddUser',{user},'POST')

export const reqDeleteUser=(user)=>
    ajax(BASE+'/DeleteUser',{user},'POST')