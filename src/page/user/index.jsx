import React from 'react';
import TopNav from 'component/nav-top/index.jsx';
import SideNav from 'component/nav-side/index.jsx';
import Pagination from 'component/pagination/index.jsx';
import "component/common-css/index.scss";
import "./index.scss";

import MMUtil from 'util/mm.jsx';
import UserService from 'service/userService.jsx';

const _mm = new MMUtil();
const _userService = new UserService();


export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.loadUserList = this.loadUserList.bind(this);
        this.state = { 
            list : [],
            pageNum : props.match.params.pageNum
        };
    }
    
    componentDidMount() {
    	this.loadUserList();
    }
    
    // 加载用户列表
    loadUserList() {
        _userService.getUserList(this.state.pageNum).then(res => {
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
        },errMsg => {
            _mm.errorTips(errMsg);
        });
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
                			<p className="panel-title">用户列表</p>
                		</div>
                		<div className="panel-body">
                            <div className="user-table">
                            	<table className="table table-bordered">
                                    <thead>
                            			<tr>
                            				<th className="user-id">ID</th>
                            				<th className="user-name">用户名</th>
                            				<th className="user-email">邮箱</th>
                            				<th className="user-phone">手机</th>
                            				<th className="user-time">注册时间</th>
                            			</tr>
                                    </thead>
                                    <tbody>
                                        {
                                            (this.state.list.length > 0) ?
                                                this.state.list.map((user) => {
                                                    return(
                                                    <tr key={user.id}>
                                                    	<td className="user-id">{user.id}</td>
                                                    	<td className="user-name">{user.username}</td>
                                                    	<td className="user-email">{user.email}</td>
                                                    	<td className="user-phone">{user.phone}</td>
                                                    	<td className="user-time">{user.createTime}</td>
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
                                        <Pagination data={this.state.pgParam} url="user" />
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
