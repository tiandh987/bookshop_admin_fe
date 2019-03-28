// react 
import React from 'react';
// react-dom
import ReactDOM from 'react-dom';
// react-router-dom
// import { HashRouter, Route, Switch} from 'react-router-dom';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

// bootstrap
import 'node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'node_modules/bootstrap/dist/js/bootstrap.min.js';

// bootstrap sb-admin-2 主题
// import 'node_modules/sb-admin-2/dist/css/sb-admin-2.min.css';

// font-awesome 字体
import 'node_modules/font-awesome/css/font-awesome.min.css';

// 页面
import Home from 'page/home/index.jsx';
import Login from 'page/login/index.jsx';
import User from 'page/user/index.jsx';
import Category from 'page/category/index.jsx';
import Product from 'page/product/index.jsx';
import ProductSave from 'page/product/save.jsx';
import Order from 'page/order/index.jsx';
import OrderDetail from 'page/order/detail.jsx';


export default class BasicRoute extends React.Component {
    render(){
      return(
        <BrowserRouter>
          <div>
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/user" component={User} />
            <Route exact path="/user/:pageNum" component={User} />
            <Route exact path="/category" component={Category} />
            <Route exact path="/category/:categoryId" component={Category} />
            <Route exact path="/product" component={Product} />
            <Route exact path="/product/:pageNum" component={Product} />
            <Route exact path="/productSave" component={ProductSave} />
            <Route exact path="/productSave/:productId" component={ProductSave} />
            <Route exact path="/order" component={Order} />
            <Route exact path="/order/:pageNum" component={Order} />
            <Route exact path="/order/detail/:orderNo" component={OrderDetail} />
          </div>
        </BrowserRouter>
      );
    }
}
    
ReactDOM.render(
  <BasicRoute />,
  document.getElementById('app')
);