import React from 'react';
import TopNav from 'component/nav-top/index.jsx';
import SideNav from 'component/nav-side/index.jsx';
import Pagination from 'component/pagination/index.jsx';
import "component/common-css/index.scss";
import "./index.scss";
 
import MMUtile from 'util/mm.jsx';
import OrderService from 'service/orderService.jsx';

const _mm    = new MMUtile();
const _orderService  = new OrderService();

export default class Order extends React.Component {
    constructor(props) {
        super(props);
        this.loadOrderList = this.loadOrderList.bind(this);
         this.searchType = this.searchType.bind(this);
        this.orderNoChange = this.orderNoChange.bind(this);
        this.search = this.search.bind(this);
        this.state = { 
        	list : [],
        	pageNum : props.match.params.pageNum
        };
    }
    
    componentDidMount() {
    	this.loadOrderList();
    }
    
    // 加载订单列表
    loadOrderList() {
         _orderService.getOrderList(this.state.pageNum).then(res => {
             console.log(res);
            this.setState({
            	res     : res,
            	list    : res.list,
            	pages   : res.pages,
            	pgParam : {
            		firstPage       : res.firstPage,
            		lastPage        : res.lastPage,
            		isFirstPage     : res.isFirstPage,
            		isLastPage      : res.isLastPage,
            		hasNextPage     : res.hasNextPage,
            		hasPreviousPage : res.hasPreviousPage,
            		prePage         : res.prePage,
            		nextPage        : res.nextPage,
            		pageNum         : res.pageNum,
            		pages           : res.pages,
            		size            : res.size,
            		total           : res.total
            	}
            });
        }, errMsg => {
            _mm.errorTips(errMsg);
        })
    }
    
    // 搜索的类别，按商品id/按商品名称
    searchType(e) {
        let value = e.target.value;
        this.setState({
            searchType : value
        })
    }
    
    // 搜索关键词变化
    orderNoChange(e) {
        let value = e.target.value;
        this.setState({
            orderNo : value
        });
    }
    
    // 搜索商品
    search() {
        const searchType = this.state.searchType,
              orderNo = this.state.orderNo;
        // 判断搜索类型
        if (searchType && orderNo) {
        	_orderService.orderSearch(orderNo).then( (res) => {
                 this.setState({
                	res     : res,
                	list    : res.list,
                	pages   : res.pages,
                	pgParam : {
                		firstPage       : res.firstPage,
                		lastPage        : res.lastPage,
                		isFirstPage     : res.isFirstPage,
                		isLastPage      : res.isLastPage,
                		hasNextPage     : res.hasNextPage,
                		hasPreviousPage : res.hasPreviousPage,
                		prePage         : res.prePage,
                		nextPage        : res.nextPage,
                		pageNum         : res.pageNum,
                		pages           : res.pages,
                		size            : res.size,
                		total           : res.total
                	}
                });
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            })
        } else {
        	_mm.errorTips("请输入搜索参数");
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
                			<p className="panel-title">订单管理</p>
                		</div>
                		<div className="panel-body">
                            <div className="search-con">
                                <select className="form-control select" onClick={this.searchType}>
                                    <option value="">请选择类型</option>
                                    <option value="id">按订单id搜索</option>
                                </select>
                                <input type="text" className="form-control keyword" placeholder="关键词" name="orderNo" onChange={this.orderNoChange}/>
                                <button type="button" className="btn btn-primary btn-search" onClick={this.search}>搜索</button>
                            </div>
                            <div className="order-table">
                                <table  className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="order-id">订单号</th>
                                            <th className="order-receiver">收件人</th>
                                            <th className="order-status">订单状态</th>
                                            <th className="order-price">订单总价</th>
                                            <th className="order-time">下单时间</th>
                                            <th className="order-operate">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            (this.state.list.length > 0) ? 
                                                this.state.list.map( (order, index) => {
                                                    return(
                                                    <tr key={index}>
                                                        <td className="order-id">
                                                            <div className="orderId">
                                                                <span>{order.orderNo}</span>
                                                            </div>
                                                        </td>
                                                        <td className="order-receiver">
                                                            <div className="receiverName">
                                                                <span>{order.receiverName}</span>
                                                            </div>
                                                        </td>
                                                        <td className="order-status">
                                                            <div className="orderStatus">
                                                                <span>{order.statusDesc}</span>
                                                            </div>
                                                        </td>
                                                        <td className="order-price">
                                                            <div className="orderPrice">
                                                                <span>￥{order.payment}</span>
                                                            </div>
                                                        </td>
                                                        <td className="order-time">
                                                            <div className="orderTime">
                                                                <span>{order.createTime}</span>
                                                            </div>
                                                        </td>
                                                        <td className="order-operate">
                                                            <div className="orderOperate">
                                                                <a href={"/order/detail/" + order.orderNo }>
                                                                    <span className="label label-info">查看</span>
                                                                </a>
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
                            </div>
                            <div className="page-con">
                            	{
                            		this.state.pages > 1 ?
                            			<Pagination data={this.state.pgParam} url="order" />
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
