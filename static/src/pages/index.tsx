import * as React from 'react';
import * as moment from 'moment';
import { Row, Col, Descriptions, Table, Input, Button } from 'antd';
import { observer, inject } from 'mobx-react';

const { TextArea } = Input;

@inject('userStore')
@observer

class Index extends React.Component<IProps, IState>{
    constructor(props:any){
        super(props);
        this.state = {
            milepost: ''
        }
    }
    componentDidMount(){
		this.props.userStore.initConnection();
    }

    enterMilepost = (e:any):void => {
        this.setState({milepost: e.target.value})
    }

    render(){
        const result = fibo(5);
        const {name, userList, tableData, message, enterMsg, sendMessage } = this.props.userStore;
        const header = '应用业务产品研发部-智铺研发组-前端组早会会议纪要';
        const columns:any[] = [{
            title: '负责人',
            key: 'value8',
            align: 'center',
            width: 60,
            dataIndex: 'name'
        },{
            title: '任务',
            key: 'value9',
            align: 'center',
            dataIndex: 'task',
            render: (text:string) => {
                return <TextArea style={{border: 'none', resize: 'none', backgroundColor:'transparent'}} autosize={{ minRows: 1, maxRows: 10 }} value={text}/>;
            },
        },{
            title: '进度',
            key: 'value10',
            align: 'center',
            width: 80,
            dataIndex: 'progress',
            render: (text:string) => {
                return <TextArea style={{border: 'none', resize: 'none', backgroundColor:'transparent'}} autosize={{ minRows: 1, maxRows: 10 }} value={text}/>;
            },
        },{
            title: '备注',
            key: 'value11',
            align: 'center',
            width: 60,
            dataIndex: 'remark',
            render: (text:string) => {
                return <Input style={{border: 'none', backgroundColor:'transparent', padding: 0, textAlign:'center'}} defaultValue={text}/>;
            },
        }];
        return(
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                <Row gutter={16}>
                    <Col className="gutter-row" span={10}>
                        <div className="gutter-box">
                            <Descriptions bordered>
                                <Descriptions.Item label="" span={3}>{header}</Descriptions.Item>
                                <Descriptions.Item label="会议时间" span={3}>{moment().format('YYYY-MM-DD') + ' 9:00-9:10'}</Descriptions.Item>
                                <Descriptions.Item label="会议地点" span={3}>办公区</Descriptions.Item>
                                <Descriptions.Item label="会议主持" span={3}>{name}</Descriptions.Item>
                                <Descriptions.Item label="会议记录" span={3}>{name}</Descriptions.Item>
                                <Descriptions.Item label="参会人员" span={3}>{userList.join(',')}</Descriptions.Item>
                                <Descriptions.Item label="会议主题" span={3}>问题反馈、风险评估、今天工作计划</Descriptions.Item>
                                <Descriptions.Item label="里程碑" span={3}>
                                    <TextArea style={{resize: 'none', border:'none'}} autosize={{ minRows: 2, maxRows: 100 }} value={this.state.milepost} onChange={this.enterMilepost}/>
                                </Descriptions.Item>
                                <Descriptions.Item label="会议内容" className="123456">
                                    <Table bordered size="small" pagination={false} columns={columns} dataSource={tableData}/>
                                </Descriptions.Item>
                            </Descriptions>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={14}>
                        <div className="gutter-box">
                            <TextArea placeholder="1、【项目名称】任务描述不少于10个字符  0%(任务进度)" value={message} autosize={{ minRows: 6, maxRows: 100 }} onChange={enterMsg}/>
                            <div style={{paddingTop: 10}}>
                                <Button type="primary" onClick={sendMessage}>发送</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Index;