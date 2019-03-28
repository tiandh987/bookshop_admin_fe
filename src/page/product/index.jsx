import React from 'react';
import { Link } from 'react-router-dom';
import TopNav from 'component/nav-top/index.jsx';
import SideNav from 'component/nav-side/index.jsx';
import Pagination from 'component/pagination/index.jsx';
import "component/common-css/index.scss";
import "./index.scss";
 
import MMUtil from 'util/mm.jsx';
import ProductService from 'service/productService.jsx';

const _mm = new MMUtil();
const _productService = new ProductService();

export default class Product extends React.Component {
    constructor (props) {
        super(props);
        this.loadProductList = this.loadProductList.bind(this);
        this.searchType = this.searchType.bind(this);
        this.keywordChange = this.keywordChange.bind(this);
        this.search = this.search.bind(this);
        this.state = { 
        	list : [],
        	pageNum : props.match.params.pageNum
        };
    }
    
    componentDidMount() {
        this.loadProductList()
    }
    
    // 加载商品信息
    loadProductList() {
        _productService.getProductList(this.state.pageNum).then(res => {
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
    keywordChange(e) {
        let value = e.target.value;
        this.setState({
            keyword : value
        });
    }
    
    // 搜索商品
    search() {
        const searchType = this.state.searchType,
              keyword = this.state.keyword;
        // 判断搜索类型
        if (searchType && keyword) {
        	_productService.productSearch(searchType, keyword).then( (res) => {
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
    
    // 修改商品状态
    changeProductStatus(productId, status){
        _productService.setSaleStatus(productId, status).then(res => {
            _mm.successTips();
            this.loadProductList()
        }, errMsg => {
            _mm.errorTips(errMsg);
        })
    }
    
    render() {
        return (
        	<div className="wrapper">
        		<TopNav />
        		<SideNav />
                <div id="page-wrapper">
                	<div className="product">
                	<div className="panel">
                		<div className="panel-heading">
                			<p className="panel-title">商品管理</p>
                		</div>
                		<div className="panel-body">
                            <div className="search-con">
                                <select className="form-control select" onClick={this.searchType}>
                                    <option value="">请选择类型</option>
                                    <option value="id">按商品id搜索</option>
                                    <option value="name">按商品名称搜索</option>
                                </select>
                                <input type="text" className="form-control keyword" placeholder="关键词" name="keyword" onChange={this.keywordChange}/>
                                <button type="button" className="btn btn-primary btn-search" onClick={this.search}>搜索</button>
                            </div>
                            <div className="add-con">
                                <a href="/productSave" className="btn btn-primary product-add">
                                	添加商品
                                </a>
                            </div>
                            <div className="product-table">
                                <table  className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="product-id">ID</th>
                                            <th className="product-info">信息</th>
                                            <th className="product-price">价格</th>
                                            <th className="product-state">状态</th>
                                            <th className="product-operate">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                        	(this.state.list.length > 0) ?
                                        		this.state.list.map((product, index) => {
                                        			return(
                                        			<tr key={index}>
                                        				<td className="product-id"><div className="productId"><span>{product.id}</span></div></td>
                                        				<td className="product-info">
                                                            <img className="img-rounded img-product" alt={product.name} src={_mm.getImageUrl(product.mainImage)}/> 
                                                            <div className="productName"><span>{product.name}</span></div>
                                                            <div className="productSubtitle"><span>{product.subtitle}</span></div>
                                                        </td>
                                        				<td className="product-price"><div className="productPrice"><span>￥{product.price}</span></div></td>
                                        				<td className="product-state">
                                                            <div className="productStatus">
                                                                {
                                                                    product.status == 1 ? 
                                                                        <span>在售</span> 
                                                                    :
                                                                        <span>已下架</span>  
                                                                }
                                                            </div>
                                                        </td>
                                        				<td className="product-operate">
                                                            <div className="productOperate">
                                                            	<a><span className="label label-info">查看</span></a> 
                                                                &nbsp;&nbsp;
                                                            	<a href={"/productSave/" + product.id}><span className="label label-primary">编辑</span></a> 
                                                                &nbsp;&nbsp;
                                                            	{
                                                            		product.status == 1 ? 
                                                            			<a name="withdraw" onClick={this.changeProductStatus.bind(this, product.id, "2")}>
                                                                            <span className="label label-danger">下架</span>
                                                                        </a> 
                                                            		:
                                                            			<a name="up" onClick={this.changeProductStatus.bind(this, product.id, "1")}>
                                                                            <span className="label label-success">上架</span>
                                                                        </a> 
                                                            	}
                                                            </div>
                                                        </td>
                                        			</tr>
                                        			);
                                        		}) :
                                        		null
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="page-con">
                            	{
                            		this.state.pages > 1 ?
                            			<Pagination data={this.state.pgParam} url="product" />
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