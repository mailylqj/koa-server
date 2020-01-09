import axios from 'axios';
import * as moment from 'moment';
import { observable, action, autorun, runInAction, values } from "mobx";

interface Message {
    [key: string]: string;
}

interface Meeting {
    name?:string
    task:string
    progress:string
    remark?:string
}

class UserStore{
    @observable name: string;
    @observable message: string;
    @observable loading: boolean = false;
    @observable socket: WebSocket;
    @observable tableData:any[] = [];
    
    @observable userList: string[] = ['卢兴元','谭洪招','李乔军','万川','何武','唐超','唐谢军','冉君军','李畅','喻乐','胡宇'];

    @action
    getInfo = ():void => {
        this.loading = true
        axios.get('/ajax/userinfo').then((result: any) => {
            runInAction(()=>{
                let {data} = result;
                if(data){
                    this.loading = false
                    this.name = data.fullName;
                }
                console.log(result);
            })
        }, err => {
            runInAction(() => {
                this.loading = false
            })
        })
    }

    @action
    initConnection = ():void =>{
        this.socket = new WebSocket(`ws://${location.host}/ws/socket`);
		this.socket.onopen = () => this.onSocketOpen();
		this.socket.onmessage = (m) => this.onSocketData(m);
		this.socket.onclose = () => this.onSocketClose();
    }

    @action
    enterMsg = (e:any):void => {
        this.message = e.target.value;
    }

    @action
    sendMessage = () =>{
        const data = {
            [this.name]: this.message
        };
        this.socket.send(JSON.stringify(data));
        this.tableData = this.makeTableData(data);
    }

    onSocketOpen() {
		console.log('Connection established!');
	}
	onSocketData(data: any) {
        const result:Message = JSON.parse(data.data);
        this.tableData = this.makeTableData(result);
        console.log(this.tableData);
	}
	onSocketClose() {
		console.log('Connection closed!');
    }

    makeTableData(result:Message):Meeting[]{
        let data:any[] = [];
        if(this.tableData.length > 0){
            data = Array.from(this.tableData);//类数组转化为一般数组
            for (let i = 0, ii = data.length; i < ii; i++){
                let {name, remark} = data[i];
                let messages = result[name];
                if(messages && messages.trim() !== ''){
                    remark = '';
                    let {task, progress} = this.messageHandle(messages);
                    data[i] = { key: i, name, task, progress, remark }
                    break;
                }
            }
        }else{
            const userList = Array.from(this.userList);
            for (let i = 0, ii = userList.length; i < ii; i++){
                let remark:string = '晚到';
                const name = userList[i];
                let messages = result[name];
                let { task, progress} = this.messageHandle(messages);
                if(task !== '' && progress !== ''){
                    remark = '';
                }
                data.push({key: i, name, task, progress, remark })
            }
        }
        return data;
    }

    messageHandle(messages:string):Meeting {
        let task = '', progress = '';
        if(messages && messages.trim() !== ''){
            let taskArr = [], proArr = [];
            let msgArr = messages.replace(/^\n/,'').split('%');
            for(let j = 0; j < msgArr.length; j++){
                let msg = msgArr[j].trim() + '%';
                if(msg && msg.match(/^\d{1,2}[、.\s]+.+\d{1,3}%/)){
                    let attrs = msg.match(/(\d+)[、.\s]+(.+)\s(\d{1,3}%)/);
                    taskArr.push(`${attrs[1]}、${attrs[2]}`);
                    proArr.push(attrs[3]);
                }
            }
            task = taskArr.join('\n');
            progress = proArr.join('\n');
        }
        return {task, progress}
    }
}

interface Food{
    name: string
    price: number
    enabled: boolean
}

class MealsStore{
    @observable num = 0
    @observable menuList:Food[] = [
        {
            name: '1234',
            price: 1234,
            enabled: true
        },
        {
            name: '1234',
            price: 1234,
            enabled: true
        },
        {
            name: '1234',
            price: 1234,
            enabled: true
        },
    ]

    @action increment = () =>{
        this.num += 1;
        console.log(this.num)
    }
}

export default {
    userStore: new UserStore(),
    mealsStore: new MealsStore()
}