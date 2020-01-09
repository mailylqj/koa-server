import * as React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import Userinfo from '../../components/userInfo';

class Topmenu extends React.Component{
    constructor(props:any){
        super(props);
    }
    render(){
        const path = location.pathname;
        return(
            <div>
                <Userinfo/>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[path]} style={{ lineHeight: '64px' }} >
                    <Menu.Item key="/"><Link to="/">早会系统</Link></Menu.Item>
                    <Menu.Item key="/meals"><Link to="/meals">点餐系统</Link></Menu.Item>
                </Menu>
            </div>
        )
    }
}

export default Topmenu;