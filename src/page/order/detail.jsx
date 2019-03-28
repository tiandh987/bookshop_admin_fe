import React from 'react';
import { Link } from 'react-router-dom';
import TopNav from 'component/nav-top/index.jsx';
import SideNav from 'component/nav-side/index.jsx';
import "component/common-css/index.scss";
import "./index.scss";
 
import MMUtil from 'util/mm.jsx';
import OrderService from 'service/orderService.jsx';

const _mm = new MMUtil();
const _orderService  = new OrderService();

export default class OrderDetail extends React.Component {
    constructor (props) {
        super(props);
        this.loadOrderDetail = this.loadOrderDetail.bind(this);
        this.sendGoods = this.sendGoods.bind(this);
        this.state = { 
        	orderNo : props.match.params.orderNo,
            res : ''
        };
    }
    
    componentDidMount() {
        this.loadOrderDetail(this.state.orderNo);
    }
    
    // 加载订单详情
    loadOrderDetail(orderNo) {
        _orderService.orderDetail(orderNo).then( res => {
            console.log(res);
            this.setState({
                res : res
            })
        }, errMsg => {
            _mm.errorTips(errMsg);
        })
    }
    
    // 发货
    sendGoods() {
        const orderNo = this.state.orderNo;
        if (orderNo) {
        	_orderService.sendGoods(orderNo).then( res => {
                _mm.successTips(res);
                this.loadOrderDetail(this.state.orderNo);
            }, errMsg => {
                _mm.errorTips(errMsg);
            })
        }
    }
    
    render() {
        return (
            <div className="wrapper">
                <TopNav />
                <SideNav />
                <div id="page-wrapper">
                  <div className="user">
                	<div className="panel">
                		<div className="panel-heading">
                			<p className="panel-title">订单详情</p>
                		</div>
                		<div className="panel-body">
                            {
                                this.state.res ? 
                                    <div className="form-horizontal">
                                        <div className="form-group">
                                        	<label htmlFor="name" className="col-md-2 control-label">订单号</label>
                                        	<div className="col-md-4">
                                        		<input type="text" className="form-control" value={this.state.orderNo} readOnly />
                                        	</div>
                                        </div>
                                        <div className="form-group">
                                        	<label htmlFor="name" className="col-md-2 control-label">下单时间</label>
                                        	<div className="col-md-4">
                                        		<input type="text" className="form-control" value={this.state.res.createTime} readOnly />
                                        	</div>
                                        </div>
                                        <div className="form-group">
                                        	<label htmlFor="name" className="col-md-2 control-label">收件人</label>
                                        	<div className="col-md-4">
                                        		<input type="text" className="form-control" 
                                                       value={this.state.res.receiverName} readOnly />
                                        	</div>
                                        </div>
                                        <div className="form-group">
                                        	<label htmlFor="name" className="col-md-2 control-label">联系方式</label>
                                        	<div className="col-md-4">
                                        		<input type="text" className="form-control" 
                                                       value={this.state.res.shippingVo.receiverPhone} 
                                                       readOnly />
                                        	</div>
                                        </div>
                                        <div className="form-group">
                                        	<label htmlFor="name" className="col-md-2 control-label">收货地址</label>
                                        	<div className="col-md-4">
                                        		<input type="text" className="form-control" 
                                                    value={
                                                            this.state.res.shippingVo.receiverProvince + "  " + 
                                                            this.state.res.shippingVo.receiverCity + "  " + 
                                                            this.state.res.shippingVo.receiverDistrict + "  " + 
                                                            this.state.res.shippingVo.receiverAddress
                                                          } 
                                                    readOnly />
                                        	</div>
                                        </div>
                                        <div className="form-group">
                                        	<label htmlFor="name" className="col-md-2 control-label">订单状态</label>
                                        	{
                                                this.state.res.status == 20 ? 
                                                    <div>
                                                    <div className="col-md-3">
                                                    	<input type="text" className="form-control" 
                                                               value={this.state.res.statusDesc} readOnly />
                                                    </div>
                                                    <div className="col-md-1">
                                                        <button className="btn btn-default" onClick={this.sendGoods}>发货</button>
                                                    </div>
                                                    </div>
                                                :
                                                    <div className="col-md-4">
                                                    	<input type="text" className="form-control" 
                                                               value={this.state.res.statusDesc} readOnly />
                                                    </div>
                                            }
                                        </div>
                                        <div className="form-group">
                                        	<label htmlFor="name" className="col-md-2 control-label">支付方式</label>
                                        	<div className="col-md-4">
                                        		<input type="text" className="form-control" 
                                                       value={this.state.res.paymentTypeDesc} readOnly />
                                        	</div>
                                        </div>
                                        <div className="form-group">
                                        	<label htmlFor="name" className="col-md-2 control-label">订单金额</label>
                                        	<div className="col-md-4">
                                        		<input type="text" className="form-control" 
                                                       value={this.state.res.payment + ' 元'} readOnly />
                                        	</div>
                                        </div>
                                    </div>
                                :
                                null
                            }
                            <div className="orderItemTable">
                                {
                                    this.state.res ?
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th className="product-img">商品图片</th>
                                                    <th className="product-info">商品信息</th>
                                                    <th className="product-price">单价</th>
                                                    <th className="product-count">数量</th>
                                                    <th className="product-total">总价</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {   
                                                    this.state.res.orderItemVoList.length > 0 ?
                                                        this.state.res.orderItemVoList.map((order, index) => {
                                                            return(
                                                            <tr key={index}>
                                                                <td className="product-img">
                                                                    <img className="img-rounded img-product" 
                                                                         src={_mm.getImageUrl(order.productImage)}/>
                                                                </td>
                                                                <td className="product-info">
                                                                    <div className="productInfo">
                                                                        <span>{order.productName}</span>
                                                                    </div>
                                                                </td>
                                                                <td className="product-price">
                                                                    <div className="productPrice">
                                                                        <span>{'￥' + order.currentUnitPrice}</span>
                                                                    </div>
                                                                </td>
                                                                <td className="product-count">
                                                                    <div className="productCount">
                                                                        <span>{order.quantity}</span>
                                                                    </div>
                                                                </td>
                                                                <td className="product-total">
                                                                    <div className="productTotal">
                                                                        <span>{'￥' + order.totalPrice}</span>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            )
                                                        })
                                                    :
                                                    null
                                                }
                                            </tbody>
                                        </table>
                                    :
                                    null
                                }
                            </div>
                		</div>
                	</div>
                  </div>
                </div>
            </div>
        );
    }
}