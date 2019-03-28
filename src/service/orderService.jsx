import React from 'react';
import MMUtil from 'util/mm.jsx';

const _mm = new MMUtil();

export default class OrderService extends React.Component {
    // 获取订单列表
    getOrderList(pageNum, pageSize) {
        return _mm.request({
            url  : _mm.getServerUrl('/manage/order/list.do'),
            data : { 
                pageNum  : pageNum  || '1',
                pageSize : pageSize || '10' 
            }
        })
    }
    
    // 根据订单号查询订单
    orderSearch(orderNo) {
        return _mm.request({
            url  : _mm.getServerUrl('/manage/order/search.do'),
            data : {
                orderNo : orderNo 
            }
        })
    }
    
    // 查看订单详情
    orderDetail(orderNo) {
        return _mm.request({
            url  : _mm.getServerUrl('/manage/order/detail.do'),
            data : {
                orderNo : orderNo 
            }
        })
    }
    
    // 发货
    sendGoods(orderNo) {
        return _mm.request({
            url  : _mm.getServerUrl('/manage/order/send_goods.do'),
            data : {
                orderNo : orderNo 
            }
        })
    }
}