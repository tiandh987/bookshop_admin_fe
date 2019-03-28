import React from 'react';
import { Link } from 'react-router-dom';
import TopNav from 'component/nav-top/index.jsx';
import SideNav from 'component/nav-side/index.jsx';
import "component/common-css/index.scss";
import "./index.scss"; 

import MMUtil from 'util/mm.jsx';
import ProductService from 'service/productService.jsx';

const _mm = new MMUtil();
const _productService = new ProductService();

export default class Category extends React.Component {
    constructor (props) {
        super(props);
        this.loadCategory = this.loadCategory.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
        this.state = {
            categoryList : [],
            categoryId   : props.match.params.categoryId || 0,
            parentId     : props.match.params.categoryId || 0
        };
    }
    
    componentDidMount() {
        this.loadCategory(this.state.categoryId)
    }
    
    // 同一url，参数改变时调用
    componentWillReceiveProps(nextProps) {
        this.setState({
            parentId : nextProps.match.params.categoryId
        });
        this.loadCategory(nextProps.match.params.categoryId)
    }
    
    // 加载品类信息
    loadCategory(categoryId) {
        _productService.getCategoryList(categoryId).then(res => {
            this.setState({
               categoryList : res,
               parentId     : (res.length > 0 ? res[0].parentId : categoryId)
            });
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    }
    
    // 修改品类名称
    onUpdateName(categoryId, categoryName){
    	let newName = window.prompt("请输入新的品类名称", categoryName); 
    	if(newName){
        if (newName && newName != '') {
        	// 更新
        	_productService.setCategoryName(categoryId, newName).then(res => {
        		_mm.successTips(res);
        		this.loadCategory(this.state.parentId);
        	}, errMsg => {
        		_mm.errorTips(errMsg);
        	});
        }
    	} else if(newName == ''){
          // 点击确定，但是为输入内容
        	_mm.errorTips('请输入正确的品类名称');
      }else {
        // 用户点击取消
      }
    }
    
    // 添加子节点
    addCategory(parentId, categoryName){
    	let newCategoryName = window.prompt("当前所在品类Id：" + parentId, "请输入新增子节点的名称"); 
    	if(newCategoryName){
    		if (newCategoryName && newCategoryName != '') {
    			// 更新
    			_productService.addCategory(parentId, newCategoryName).then(res => {
    				_mm.successTips(res);
    				this.loadCategory(parentId);
    			}, errMsg => {
    				_mm.errorTips(errMsg);
    			});
    		}
    	} else if(newCategoryName == ''){
    			// 点击确定，但是为输入内容
    			_mm.errorTips('请输入正确的品类名称');
    	}else {
    		// 用户点击取消
    	}
    }
    
    render() {
        return (
        	<div className="wrapper">
        		<TopNav />
        		<SideNav />
                <div id="page-wrapper">
                	<div className="category">
                	<div className="panel">
                		<div className="panel-heading">
                			<p className="panel-title">品类管理</p>
                		</div>
                		<div className="panel-body">
                        {
                            this.state.parentId ? 
                              <h4 className="parentId">当前商品分类ID : {this.state.parentId}</h4>
                            :
                              <h4 className="parentId">当前商品分类ID : {this.state.parentId}</h4>
                        }
                        <button className="btn btn-primary category-add" onClick={this.addCategory.bind(this,this.state.parentId)}>
                        	添加品类
                        </button>
                        <div className="category-table">
                        	<table border="1" className="table table-bordered">
                        		<thead>
                        			<tr>
                        				<th className="category-id">ID</th>
                        				<th className="category-name">名称</th>
                        				<th className="category-operate">操作</th>
                        			</tr>
                        		</thead>
                        		<tbody>
                        						{
                        								this.state.categoryList.length > 0 ? 
                        										this.state.categoryList.map((category, index) => {
                        											return (
                        												<tr key={index}>
                        													<td className="category-id">{category.id}</td>
                        													<td className="category-name">{category.name}</td>
                        													<td className="category-operate">
                        														<a className="category-update" onClick={this.onUpdateName.bind(this, category.id, category.name)}>
                        															修改名称
                        														</a>
                        														&nbsp;&nbsp;&nbsp;&nbsp;
                        														<Link to={"/category/" + category.id}>
                        															查看子节点
                        														</Link>
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
                    </div>
                  </div>
                  </div>
                </div>
        	</div>	
        );	
    }
}