import React from 'react';
import ReactDOM from 'react-dom';

import { Link } from 'react-router-dom';

import './index.scss'; 

export default class SideNav extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="nav-side">
              <div>
                <ul className="list-group">
                	<li>
                        <a href="/home">
                            <button type="button" className="list-group-item nav-side-item index" >
                                <i className="fa fa-bar-chart-o"></i>
                                &nbsp;&nbsp;&nbsp;首页
                            </button>
                        </a>
                    </li>
                	<li>
                		<button type="button" className="list-group-item nav-side-item" >
                			<i className="fa fa-user-o fa-fw"></i>
                			&nbsp;&nbsp;&nbsp;用户
                            <i className="fa fa-angle-right"></i>
                		</button>
                		<div className="detail-item">
                        <a href="/user">
                            <button type="button" className="list-group-item user-list" >
                                用户列表
                            </button>
                        </a>
                		</div>
                	</li>
                    <li>
                    	<button type="button" className="list-group-item nav-side-item" >
                    		<i className="fa fa-list"></i>
                            &nbsp;&nbsp;&nbsp;商品
                    		<i className="fa fa-angle-right"></i>
                    	</button>
                    	<div className="detail-item">
                          <a href="/product">
                            <button type="button" className="list-group-item m-product">
                            	商品管理
                            </button>
                          </a>
                          <a href="/category">
                            <button type="button" className="list-group-item m-category">
                            	品类管理
                            </button>
                          </a>  
                    	</div>
                    </li>
                    <li>
                    	<button type="button" className="list-group-item nav-side-item" >
                    		<i className="fa fa-check-square-o fa-fw"></i>
                    		&nbsp;&nbsp;&nbsp;订单
                    		<i className="fa fa-angle-right"></i>
                    	</button>
                    	<div className="detail-item">
                           <a href="/order">
                            <button type="button" className="list-group-item m-order" >
                                订单管理
                            </button>
                           </a>
                    	</div>
                    </li>
                </ul>
              </div>
            </div>
        );
    }
}