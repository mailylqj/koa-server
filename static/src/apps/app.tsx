import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Layout } from 'antd';
import { BrowserRouter } from 'react-router-dom';

import Topmenu from '../include/header/index'
import Main from '../include/main/index'

import store from '../store/stores';
import { Provider } from 'mobx-react';

const { Header, Content, Footer } = Layout;

class App extends React.Component{
    render(){
        return (
            <Provider {...store}>
                <BrowserRouter>
                    <Layout className="layout">
                        <Header><Topmenu/></Header>
                        <Content style={{ padding: '0 50px' }}><Main/></Content>
                        <Footer style={{ textAlign: 'center' }}>Morning meeting ©2018 Created by leeli</Footer>
                    </Layout>
                </BrowserRouter>
            </Provider>
        );
    }
}

ReactDOM.render(<App/>,
    document.getElementById('root') as HTMLElement
);