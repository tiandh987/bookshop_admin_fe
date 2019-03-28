import React from 'react';
import "./index.scss";
 
export default class Pagination extends React.Component {
    constructor(props){
        super(props);
        this.renderPgPre = this.renderPgPre.bind(this);
        this.renderPgItem = this.renderPgItem.bind(this);
        this.renderPgNext = this.renderPgNext.bind(this);
        this.state = {
            data : props.data,
            url  : props.url
        }
    }
    
    componentDidMount() {
        // console.log(this.state.data);
    }
    
    // 上一页
    renderPgPre(){
        if (this.state.data.pages > 1) {
            if (this.state.data.hasPreviousPage) {
            	return (<li><a href={"/" + this.state.url + "/" + (this.state.data.pageNum - 1)}><span>&laquo;</span></a></li>);
            }else {
                return (<li className="disabled"><a><span>&laquo;</span></a></li>);
            }
        } else {
        	return;
        }
    }
    
    // 分页按钮
    renderPgItem(){
        // 少于9页
    	if (this.state.data.pages < 9) {
    		var pageNums = [],
    			i = 1,
                j = 1;
                
    		while(this.state.data.pages >= i){
    			pageNums.push(i);
    			i++;
    		}
            
            if (pageNums.length > 1) {
                return (
                    pageNums.map((pageNum) => {
                        if (pageNum == this.state.data.pageNum) {
                        	return <li key={pageNum} className="active"><a>{pageNum}</a></li>
                        }
                    	return <li key={pageNum}><a href={"/" + this.state.url + "/" + pageNum}>{pageNum}</a></li>
                    })
                )
            }
    	} else {
            // 大于9页
            // pageNum >= 1 && pageNum < 5
    		if (this.state.data.pageNum < 5 && this.state.data.pageNum >= 1) {
                var pageNums = [1,2,3,4,5,6,7];
                return (
                    pageNums.map((pageNum) => {
                        if (pageNum <= 5) {
                        	if (pageNum == this.state.data.pageNum) {
                        		return <li key={pageNum} className="active"><a>{pageNum}</a></li>
                        	}
                        	return <li key={pageNum}><a href={"/" + this.state.url + "/" + pageNum}>{pageNum}</a></li>
                        } else {
                        	if (pageNum == 6) {
                                return <li key={pageNum}><span>...</span></li>
                            }else {
                                if(pageNum == 7) {
                                    return <li key={pageNum}><a href={"/" + this.state.url + "/" + this.state.data.pages}>{this.state.data.pages}</a></li>
                                }
                            }
                        }
                    })
                )
    		}else {
                // pageNum >= 5 && pageNum < pages - 3
                if (this.state.data.pageNum >= 5 && this.state.data.pageNum < (this.state.data.pages - 3)) {
                    var currPageNum = this.state.data.pageNum;
                    var pageNums = [0,1,currPageNum - 2,currPageNum - 1,currPageNum,currPageNum + 1,currPageNum + 2,7,8];
                    return (
                        pageNums.map((pageNum, index) => {
                            if (index == 0) {
                            	return <li key={index}><a href={"/" + this.state.url + "/1"}>1</a></li>
                            } else {
                            	if (index == 1) {
                            		return <li key={index}><span>...</span></li>
                            	} else {
                            		if (index >= 2 && index <= 6) {
                                        if (index == 4) {
                                        	return <li key={index} className="active"><a>{pageNum}</a></li>
                                        }
                            			return <li key={index}><a href={"/" + this.state.url + "/" + pageNum}>{pageNum}</a></li>
                            		} else {
                            			if (index == 7) {
                            				return <li key={index}><span>...</span></li>
                            			} else {
                            				if (index == 8) {
                            					return <li key={index}><a href={"/" + this.state.url + "/" + this.state.data.pages}>{this.state.data.pages}</a></li>
                            				}
                            			}
                            		}
                            	}
                            }
                        })
                    )
                }else {
                    // pageNum >= pages - 3 && pageNum <= pages
                    // return <li><span>...</span></li>
                    var pages = this.state.data.pages;
                    var pageNums = [0,1,pages-4,pages-3,pages-2,pages-1,pages];
                    if (this.state.data.pageNum >= pages -3 && this.state.data.pageNum <= pages) {
                    	return (
                            pageNums.map((pageNum, index) => {
                            	if (0 == index) {
                            		return <li key={index}><a href={"/" + this.state.url + "/1"}>1</a></li>
                            	} else {
                            		if (1 == index) {
                            			return <li key={index}><span>...</span></li>
                            		} else {
                            			if (2 <= index && 6 >= index) {
                            				if (pageNum == this.state.data.pageNum) {
                            					return <li key={pageNum} className="active"><a>{pageNum}</a></li>
                            				}
                            				return <li key={pageNum}><a href={"/" + this.state.url + "/" + pageNum}>{pageNum}</a></li>
                            			}
                            		}
                            	}
                            })
                        )
                    }
                }
            }
    	}
    }    
    
    // 下一页
    renderPgNext(){
        if (this.state.data.pages > 1) {
        	if (this.state.data.hasNextPage) {
        		return (<li><a href={"/" + this.state.url + "/" + (this.state.data.pageNum + 1)}><span>&raquo;</span></a></li>);
        	} else {
        		return (<li className="disabled"><a><span>&raquo;</span></a></li>);
        	}
        } else {
        	return;
        }
    }
    
    render(){
        return (
            <div className="page-wrapper">
            	<ul className="pagination">
                    {
                        this.renderPgPre()
                    }
                    {
                    	this.renderPgItem()
                    }
                    {
                    	this.renderPgNext()
                    }
            	</ul>
            </div>
        )
    }
}