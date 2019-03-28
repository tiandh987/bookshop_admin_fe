import React    from 'react';
import ReactDOM from 'react-dom';

import MMUtile  from 'util/mm.jsx';
import UserService     from 'service/userService.jsx'; 

import './index.scss';

const _mm       = new MMUtile();
const _userService     = new UserService();

export default class TopNav extends React.Component {
    constructor(props) {
       super(props);
       this.state = {
         userName : ""
       };
    }
    
    componentDidMount(){
        let userInfo = _mm.getStorage('userInfo');
        if(userInfo){
            this.setState({
                userName : userInfo.username || ''
            });
        }
    }
    
    onLogout(){
        _mm.removeStorage('userInfo');
        _userService.logout().then(res => {
            window.location.href = '/home';
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    }
    
    render() {
        return (
          <div>
            <nav className="navbar navbar-default navbar-static-top">
              <div className="brand">
                <a href="/home"><b>SHOP ADMIN</b></a>
              </div>
                  
              <div className="collapse navbar-collapse">
                <ul className="navbar-right">
                  {
                    this.state.userName ?
                      <li>
                        <span className="navbar-text">欢迎，{this.state.userName}</span>
                        <span className="navbar-text btn-logout" onClick={this.onLogout}>退出</span>
                      </li> :
                      <li>
                        <span className="navbar-text"><a href="/login" className="btn-login">请登录</a></span>
                      </li>
                  }
                </ul>
              </div>
            </nav>
          </div>
        );
    }
}
