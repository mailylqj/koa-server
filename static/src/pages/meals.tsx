import * as React from 'react'
import * as moment from 'moment';
import { Row, Col, Descriptions, Table, InputNumber, Button } from 'antd';
import { observer, inject } from 'mobx-react';

@inject('mealsStore')
@observer

class Meals extends React.Component<IProps, IState>{
    constructor(props:any){
        super(props);
        this.state = {
            num1: 0
        }
    }

    increment1 = () =>{
        this.setState({ num1: this.state.num1 + 1 })
        console.log(this.state.num1);
        this.setState({ num1: this.state.num1 - 2 })
        console.log(this.state.num1);
        this.setState({ num1: this.state.num1 + 3 })
        console.log(this.state.num1);
    }

    render(){
        const columns = [
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
            }
        ]
        const {menuList, increment} = this.props.mealsStore;
        return (
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                <Row gutter={16}>
                    <Col className="gutter-row" span={14}>
                        <Table bordered size="small" pagination={false} columns={columns} dataSource={menuList} title={()=>`${moment().format('YYYY-MM-DD')} 今日供应：`}/>
                    </Col>
                    <Col className="gutter-row" span={10}>
                        <Descriptions bordered>
                            <Descriptions.Item label="团长" span={3}>沃尔语</Descriptions.Item>
                            <Descriptions.Item label="参团成员" span={3}>沃尔语</Descriptions.Item>
                            <Descriptions.Item label="我要参团">
                                <InputNumber min={1} max={10} defaultValue={1} style={{verticalAlign:'middle'}}/>
                                <Button style={{marginLeft:15, verticalAlign:'middle'}} type="primary" onClick={this.increment1}>参团</Button>
                                <span>{this.state.num1}</span>
                            </Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default Meals;