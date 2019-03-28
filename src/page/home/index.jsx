import React from 'react';
import TopNav from 'component/nav-top/index.jsx';
import SideNav from 'component/nav-side/index.jsx';
import "component/common-css/index.scss";
import "./index.scss";
 

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hello : "Welcome"};
    }
    
    componentDidMount() {
    	console.log('Home did mount');
    }
    
    render() {
        return (
            <div className="wrapper">
                <TopNav />
                <SideNav />
                <div id="page-wrapper">
                	<div className="panel">
                		<div className="panel-heading">
                			<p className="panel-title">首页</p>
                		</div>
                		<div className="panel-body">
                            欢迎使用后台管理系统
                		</div>
                	</div>
                </div>
            </div>
        );
    }
}
