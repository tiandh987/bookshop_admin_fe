import React from 'react';
import MMUtil from 'util/mm.jsx';

const _mm = new MMUtil();

export default class ProductService extends React.Component {
    //  ====================category==================
     
    // 添加品类
    addCategory(parentId, categoryName) {
        return _mm.request({
        	url  : _mm.getServerUrl('/manage/category/add_category.do'),
        	data : {
        		categoryId   : categoryId || '',
                categoryName : categoryName || ''
        	}
        });
    }
    
    // 获取子节点的平级节点
    getCategoryList(categoryId) {
        return _mm.request({
            url  : _mm.getServerUrl('/manage/category/get_category.do'),
            data : {
                categoryId : categoryId || 0
            }
        });
    }
    
    // 递归查询本节点id及孩子节点的id
    getDeepCategory(categoryId) {
    	return _mm.request({
    		url  : _mm.getServerUrl('/manage/category/get_deep_category.do'),
    		data : {
    			categoryId : categoryId || 0
    		}
    	});
    }
    
    // 修改品类名称
    setCategoryName(categoryId, categoryName) {
        return _mm.request({
            url  : _mm.getServerUrl('/manage/category/set_category_name.do'),
            data : {
                categoryId   : categoryId || '',
                categoryName : categoryName || ''
            }
        });
    }
    
    // 添加品类
    addCategory(parentId, categoryName) {
    	return _mm.request({
    		url  : _mm.getServerUrl('/manage/category/add_category.do'),
    		data : {
    			parentId   : parentId || '',
    			categoryName : categoryName || ''
    		}
    	});
    }
    
    // =====================product===================
    
    // 获取商品列表
    getProductList(pageNum, pageSize) {
        return _mm.request({
            url  : _mm.getServerUrl('/manage/product/list.do'),
            data : {
                pageNum  : pageNum  || '1',
                pageSize : pageSize || '10'
            }
        })
    }
    
    // 更改产品销售状态 1:在售 2:下架 3:删除
    setSaleStatus(productId, status) {
        return _mm.request({
            url  : _mm.getServerUrl('/manage/product/set_sale_status.do'),
            data : {
                productId : productId || '',
                status    : status || ''
            }
        })
    }
    
    // 新增或更新产品
    saveOrUpdateProduct(product) {
        return _mm.request({
        	url  : _mm.getServerUrl('/manage/product/save.do'),
        	data : product
        })
    }
    
    // 获取商品详情
    getDetail(productId) {
        return _mm.request({
            url  : _mm.getServerUrl('/manage/product/detail.do'),
            data : {
                productId : productId || ''
            }
        })
    }
    
    // 搜索商品
    productSearch (searchType, keyword) {
        if (searchType == 'id') {
        	return _mm.request({
        	    url  : _mm.getServerUrl('/manage/product/search.do'),
        	    data : {
        	        productId : keyword,
        	    }
        	})
        } else if (searchType == 'name') {
        	return _mm.request({
        	    url  : _mm.getServerUrl('/manage/product/search.do'),
        	    data : {
        	        productName : keyword
        	    }
        	})
        }
    }
}