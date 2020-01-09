import * as React from 'react';
import { Avatar } from 'antd';
import { observer, inject } from 'mobx-react';

@inject('userStore')
@observer

class Userinfo extends React.Component<any>{
    constructor(props:any) {
        super(props);
    }
    componentDidMount():void{
        this.props.userStore.getInfo();
    }
    render(){
        const { name } = this.props.userStore;
        return(
            <div style={{color: '#fff', float: 'left', marginRight: 50}}>
                <Avatar icon="user" style={{marginRight: 10}}/>
                <span>{ name }</span>
            </div>
        )
    }
}

export default Userinfo;