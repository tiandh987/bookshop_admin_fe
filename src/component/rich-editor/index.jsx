import React from 'react';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
// 引入编辑器样式
import 'node_modules/braft-editor/dist/index.css';

import './index.scss'; 

import MMUtil from 'util/mm.jsx';
import ProductService from 'service/productService.jsx';

const _mm = new MMUtil();
const _productService = new ProductService();

export default class RichEditor extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            handleChange : props.onChange,
            productId    : props.productId
        }
    }
    
    componentDidMount () {
        const productId = this.state.productId;
        if (productId) {
            _productService.getDetail(productId).then(res => {
            	this.setState({
            	    editorState : BraftEditor.createEditorState(res.detail)
            	})
            }, errMsg => {
            	_mm.errorTips('哪里不对了~');
            });
        } else {
        	this.setState({
                editorState : BraftEditor.createEditorState('<p>请输入商品详情</p>')
            })
        }
    }
    
    componentWillUnmount () {
        
    }
    
    // 富文本上传图片，返回url，否则会以base64格式处理图片
    uploadFile (param) {
        var file = param.file;
        var params = new FormData();
        params.append('upload_file', file);
        $.ajax({
        	url   : 'http://47.95.255.212:8080/manage/product/upload.do',
        	type  : 'POST',
//         	xhrFields : {
//         		withCredentials : true
//         	},
        	data  : params,
        	cache : false,
        	contentType : false,
        	processData : false,
        	success : function(res) {
                param.success({
                    url: res.data.url,
                    meta: {
                        title: '商品详情图片',
                        alt: '商品详情图片',
                        loop: true, // 指定音视频是否循环播放
                        autoPlay: true // 指定音视频是否自动播放
                    }
                })
        	},
        	error : function(err) {
                param.error({
                    msg: '上传失败，请重试'
                });
        		alert(err.msg || '哪里不对了~');
        	}
        })
    }
    
    render () {
        const { editorState, handleChange } = this.state
        return (
            <div className="editor-wrapper">
                <BraftEditor
                    defaultValue={editorState}
                    onChange={this.state.handleChange}
                    media={{uploadFn : this.uploadFile}}
                />
            </div>
        )
    }
}