import * as WebSocket from 'ws';

import * as schedule from 'node-schedule';

function SocketServ(appServer:any){
    const wss = new WebSocket.Server({
        server: appServer
    });
    
    let meeting = {};
    
    var j = schedule.scheduleJob('0 0 0 * * *', ()=>{
        meeting = {};
    });
    
    wss.on('connection', (ws, req) => {
        console.log(req.url);
        ws.on('message', (message) => {
            const msg = message.toString('utf8');
            const data = JSON.parse(msg);
            Object.assign(meeting, data);
            console.log(meeting);
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        });
        
        ws.send(JSON.stringify(meeting));
    });
}

export default SocketServ;
