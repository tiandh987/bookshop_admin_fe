import React from 'react';
import ReactDOM from 'react-dom';

import MMUtile from 'util/mm.jsx';
import UserService from 'service/userService.jsx';
import "./index.scss";

const _mm    = new MMUtile();
const _userService  = new UserService();
 
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        /*
            关键就是这里，把要使用this的函数  在构造函数中用bind方法传入this,
            否则会出现 Cannot read property 'setState' of undefined
        */
        this.onLogin = this.onLogin.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        
        this.state = {
            username : "",
            password : "",
            redirect : _mm.getUrlParam('redirect')
        };
    }
    
    // 点击登录
    onLogin(e){
        e.preventDefault();
        let loginInfo   = {
                username: this.state.username,
                password: this.state.password
            },
            checkLogin  = _userService.checkLoginInfo(loginInfo);
            
        if(checkLogin.state){
            // 登录成功后进行跳转
            _userService.login(loginInfo).then(res => {
                _mm.setStorage('userInfo', res);
                window.location.href = this.state.redirect || '/home';
            }, errMsg => {
                _mm.errorTips(errMsg);
            });
        }else{
            _mm.errorTips(checkLogin.msg);
        }
    }
    
    // 输入框内容变化时，更新state中的字段
    onInputChange(e){
        let ele         = e.target,
            inputValue  = e.target.value,
            inputName   = e.target.name;
        this.setState({
            [inputName] : inputValue
        });
    }
    
    render() {
        return (
        <div className="login">
            <div className="panel panel-info">
                <div className="panel-heading">
                    <span className="panel-title">管理员</span>
                </div>
                <div className="panel-body">
                    <form role="form" onSubmit={this.onLogin}>
                        <div className="form-group">
                            <input className="form-control" 
                                placeholder="请输入管理员账号" 
                                name="username" 
                                type="text" 
                                autoComplete="off" 
                                autoFocus 
                                onChange={this.onInputChange}/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" 
                                placeholder="请输入密码" 
                                name="password" 
                                type="password" 
                                onChange={this.onInputChange}/>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">登录</button>
                    </form>
                </div>
            </div>
        </div>
        );
    }
}