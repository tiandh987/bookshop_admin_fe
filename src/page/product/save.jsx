import React from 'react';
import { Link } from 'react-router-dom';
import TopNav from 'component/nav-top/index.jsx';
import SideNav from 'component/nav-side/index.jsx';
import RichEditor from 'component/rich-editor/index.jsx';
import "component/common-css/index.scss";
import "./index.scss";
  
import MMUtil from 'util/mm.jsx';
import ProductService from 'service/productService.jsx';

const _mm = new MMUtil();
const _productService = new ProductService();

export default class ProductSave extends React.Component {
    constructor (props) {
        super(props);
        this.loadFirstCategory = this.loadFirstCategory.bind(this);
        this.loadProduct = this.loadProduct.bind(this);
        this.onFirstCategoryChange = this.onFirstCategoryChange.bind(this);
        this.onSecondCategoryChange = this.onSecondCategoryChange.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onUploadFile = this.onUploadFile.bind(this);
        this.onDeleteImage = this.onDeleteImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = { 
            productId          : props.match.params.productId || '',
            firstCategoryId    : '',
            secondCategoryId   : '',
            firstCategoryList  : [],
            secondCategoryList : [],
            
            categoryId: '',
            name      : '',
            subtitle  : '',
            subImages : [],
            detail    : '',
            price     : '',
            stock     : ''
        };
    }
    
    componentDidMount() {
      // 初始化一级分类
      this.loadFirstCategory();
      // 初始化产品
      this.loadProduct();
    }
    
    // 加载一级分类信息
    loadFirstCategory() {
      // 加载一级品类不用传参数
      _productService.getCategoryList().then(res => {
        this.setState({
          firstCategoryList : res
        })
      }, errMsg => {
        _mm.errorTips(errMsg || '哪里不对了~');
      })
    }
    
    // 加载二级分类
    loadSecondCategory(){
    	// 一级品类不存在时，不初始化二级分类
    	if(!this.state.firstCategoryId){
    		return;
    	}
    	// 查询一级品类时，不传id
    	_productService.getCategoryList(this.state.firstCategoryId).then(res => {
    		this.setState({
    			secondCategoryList: res
    		});
    	}, errMsg => {
    		alert(errMsg || '哪里不对了~');
    	});
    }
    
    // 编辑的时候，需要初始化商品信息
    loadProduct(){
    	// 有id参数时，读取商品信息
    	if(this.state.productId){
    		// 查询一级品类时，不传id
    		_productService.getDetail(this.state.productId).then(res => {
    			let product = this.productAdapter(res);
    			this.setState(product);
    			// 有二级分类时，load二级列表
    			if(product.firstCategoryId){
    				this.loadSecondCategory();
    			}
    		}, errMsg => {
    			_mm.errorTips(errMsg);
    		});
    	}
    }
    
    // 适配接口返回的数据
    productAdapter(product){
    	// 如果父品类是0（根品类），则categoryId作为一级品类
    	let firstCategoryId   = product.parentCategoryId == 0 ? product.categoryId : product.parentCategoryId,
    		  secondCategoryId  = product.parentCategoryId == 0 ? '' : product.categoryId;
    	return {
    		categoryId          : product.categoryId,
    		name                : product.name,
    		subtitle            : product.subtitle,
    		subImages           : product.subImages.split(','),
    		detail              : product.detail,
    		price               : product.price,
    		stock               : product.stock,
    		firstCategoryId     : firstCategoryId,
    		secondCategoryId    : secondCategoryId,
    		status              : product.status
    	}
    }
    
    // 普通字段更新
    onValueChange(e){
    	let name    = e.target.name,
    		value   = e.target.value;
    	// 更改state
    	this.setState({
    		[name] : e.target.value
    	});
    }
    //  富文本编辑器字段更改处理
    handleChange(editorState) {
        this.setState({
            detail : editorState.toHTML()
        });
    }
    
    // 一级品类变化
    onFirstCategoryChange(e){
    	let newValue    = e.target.value || 0;
    	// 更新一级选中值，并清除二级选中值
    	this.setState({
    		firstCategoryId     : newValue,
    		secondCategoryId    : 0,
    		secondCategoryList  : [],
    	}, () => {
    		// 更新二级品类列表
    		this.loadSecondCategory();
    	});
    }
    
    // 二级品类变化
    onSecondCategoryChange(e){
        let newValue    = e.target.value || 0;
        this.setState({
            secondCategoryId  : newValue,
        });
    }
    
    // 点击上传图片按钮
    onClickUploadFileBtn() {
      document.getElementById("upload_file").click();
    }
    
    // 上传图片
    onUploadFile() {
      var files = document.getElementById("upload_file").files;
      var params = new FormData();
      params.append('upload_file', files[0]);
      var $this = this;
      if (this.state.subImages.length < 5) {
      	$.ajax({
      		url   : 'http://47.95.255.212:8080/manage/product/upload.do',
      		type  : 'POST',
      		xhrFields : {
      			withCredentials : true
      		},
      		data  : params,
      		cache : false,
      		contentType : false,
      		processData : false,
      		success : function(res) {
      			let subImages = $this.state.subImages;
      			subImages.push(res.data.uri);
      			$this.setState({
      				subImages : subImages
      			});
      		},
      		error : function(err) {
      			alert(err.msg || '哪里不对了~');
      		}
      	})
      } else {
      	alert("最多上传5张图片");
      }
    }
    
    // 点击删除图片
    onDeleteImage(image) {
      let subImages   = this.state.subImages,
      	  imageIndex  = subImages.indexOf(image);
        
      if(imageIndex >= 0){
      	subImages.splice(imageIndex, 1);
      }
      this.setState({
      	subImages: subImages
      });
    }
    
    // 验证要提交的产品信息是否符合规范
    checkProduct(product){
    	let result = {
    		status  : true,
    		msg     : '验证通过'
    	};
    	if(!product.name){
    		result = {
    			status  : false,
    			msg     : '请输入商品名称'
    		}
    	}
    	if(!product.subtitle){
    		result = {
    			status  : false,
    			msg     : '请输入商品描述'
    		}
    	}
    	if(!product.price){
    		result = {
    			status  : false,
    			msg     : '请输入商品价格'
    		}
    	}
    	if(!product.stock){
    		result = {
    			status  : false,
    			msg     : '请输入商品描述'
    		}
    	}
    	return result;
    }
    
    // 提交表单
    onSubmit(e){
    	// 阻止提交
    	e.preventDefault();
    	// 需要提交的字段
    	let product = {
    			categoryId          : this.state.secondCategoryId || this.state.firstCategoryId || 0,
    			name                : this.state.name,
    			subtitle            : this.state.subtitle,
                price               : this.state.price,
                stock               : this.state.stock,
    			subImages           : this.state.subImages.join(','),
    			detail              : this.state.detail
    		},
        checkProduct = this.checkProduct(product);
    	// 当为编辑时，添加id字段
    	if(this.state.productId){
    		product.id = this.state.productId;
    	}
    	// 验证通过后，提交商品信息
    	if(checkProduct.status){
    		// 保存product
    		_productService.saveOrUpdateProduct(product).then(res => {
    			alert(res);
    			window.location.href = '/product';
    		}, errMsg => {
    			alert(errMsg || '哪里不对了~');
    		});
    	}else{
    		alert(checkProduct.msg);
    	}
    	return false;
    }
    
    render() {
        return (
        	<div className="wrapper">
        		<TopNav />
        		<SideNav />
                <div id="page-wrapper">
                	<div className="productSave">
                	<div className="panel">
                		<div className="panel-heading">
                			<p className="panel-title">
                                商品管理&nbsp;--&nbsp;
                                {
                                    this.state.productId ? 
                                        <span>修改商品</span>
                                    :
                                        <span>添加商品</span>
                                }
                            </p>
                		</div>
                		<div className="panel-body">
                            <div className="save-form">
                                <form className="form-horizontal">
                                  <div className="form-group">
                                    	<label htmlFor="select-con" className="col-md-2 control-label">所属分类</label>
                                        <div id="select-con" className="select-con">
                                        <div className="col-md-2">
                                          <select className="form-control" defaultValue={this.state.firstCategoryId} onClick={this.onFirstCategoryChange}>
                                          	<option value="">一级品类</option>
                                            {
                                                this.state.firstCategoryList.length > 0 ? 
                                                    this.state.firstCategoryList.map((category, index) => {
                                                        return(
                                                            <option key={index} value={category.id}>{category.name}</option>
                                                        )
                                                    })
                                                : 
                                                    null
                                            }
                                          </select>
                                        </div>
                                    		<div className="col-md-2">
                                          <select className="form-control" defaultValue={this.state.secondCategoryId} onClick={this.onSecondCategoryChange}>
                                          	<option value="">二级品类</option>
                                          	{
                                          		this.state.secondCategoryList.length > 0 ? 
                                          			this.state.secondCategoryList.map((category, index) => {
                                          				return(
                                          					<option key={index} value={category.id}>{category.name}</option>
                                          				)
                                          			})
                                          		: 
                                          			null
                                          	}
                                          </select>
                                        </div>
                                    	</div>
                                  </div>
                                	<div className="form-group">
                                		<label htmlFor="name" className="col-md-2 control-label">商品名称</label>
                                		<div className="col-md-4">
                                			<input type="text" className="form-control" id="name" name="name" 
                                                   placeholder="请输入商品名称" value={this.state.name} onChange={this.onValueChange}/>
                                		</div>
                                	</div>
                                	<div className="form-group">
                                		<label htmlFor="subtitle" className="col-md-2 control-label">商品描述</label>
                                		<div className="col-md-4">
                                			<input type="text" className="form-control" id="subtitle" name="subtitle"
                                                   placeholder="请输入商品描述信息" value={this.state.subtitle} onChange={this.onValueChange}/>
                                		</div>
                                	</div>
                                  <div className="form-group">
                                    <label htmlFor="price" className="col-md-2 control-label">商品价格</label>
                                    <div className="col-md-4">
                                      <div className="input-group">
                                        <input type="number" className="form-control" id="price" name="price" 
                                               placeholder="请输入商品价格" value={this.state.price} onChange={this.onValueChange}/>
                                        <div className="input-group-addon">元</div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="form-group">
                                    	<label htmlFor="stock" className="col-md-2 control-label">商品库存</label>
                                    	<div className="col-md-4">
                                    		<input type="number" className="form-control" id="stock" name="stock" 
                                                   placeholder="请输入商品库存" value={this.state.stock} onChange={this.onValueChange}/>
                                    	</div>
                                  </div>
                                  <div className="form-group">
                                  	<label htmlFor="stock" className="col-md-2 control-label">商品图片</label>
                                  	<div className="col-md-4 img-con">
                                        {
                                        	this.state.subImages.length > 0 ? 
                                            this.state.subImages.map((image, index) => {
                                              return (
                                                <div key={index} className="sub-img" >
                                                  <img className="img" src={_mm.getImageUrl(image)}/>
                                                  <i className="fa fa-close fa-fw" onClick={this.onDeleteImage.bind(this, image)}></i>
                                                </div>
                                              );
                                            }) 
                                          : 
                                            <div className="notice">请上传图片(最多5张)</div>
                                        }
                                  	</div>
                                  </div>
                                  <div className="form-group">
                                      <label htmlFor="stock" className="col-md-2 control-label"></label>
                                      <div className="col-md-4 uploadFileBtn">
                                      		<button type="button" className="btn btn-default" onClick={this.onClickUploadFileBtn}>上传图片</button>
                                      </div>
                                  </div>
                                  <div className="form-group">
                                  		<label htmlFor="detail" className="col-md-2 control-label">商品详情</label>
                                      <div className="col-md-4 uploadFileBtn">
                                         <RichEditor onChange={this.handleChange} productId={this.state.productId} />
                                      </div>
                                  </div>
                                  <div className="form-group">
                                    <div className="col-sm-offset-2 col-md-4">
                                		<button type="button" className="btn btn-primary" onClick={this.onSubmit}>提交</button>
                               		</div>
                                  </div>
                                </form>
                            </div>
                            <div className="uploadFile">
                                <form action="">
                                    <input type="file" name="upload_file" id="upload_file" onChange={this.onUploadFile}/>
                                </form>
                            </div>
                        </div>
                  </div>
                  </div>
                </div>
        	</div>	
        );	
    }
}