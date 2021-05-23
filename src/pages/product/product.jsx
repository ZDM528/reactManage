import React, {Component} from "react";
import {Redirect,Route,Switch} from 'react-router-dom'
import productHome from './productHome'
import productAddUpdate from './productAddUpdate'
import productDetail from './productDetail'
class Product extends Component {
    render() {
        return(
            <Switch>
                <Route path='/product' component={productHome} exact/> {/*exact为精准匹配*/}
                <Route path='/product/productAddUpdate' component={productAddUpdate}/>
                <Route path='/product/productDetail' component={productDetail}/>
                <Redirect to='/product'/>
            </Switch>


        )
    }
}
export default Product;