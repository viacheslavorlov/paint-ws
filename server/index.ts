import express from 'express';
import expressWs from 'express-ws';
const { app, getWss, applyTo } = expressWs(express());
const aWss = getWss();


const PORT = process.env.PORT || 8000;

function broadcastConnection(ws: any, msg: any) {
    aWss.clients.forEach((client) => {
        //@ts-ignore
        if (client.id === msg.id) {
            client.send(JSON.stringify(msg))
        }
    })
}

function connectionHandler (ws: any, msg: any)  {
    //@ts-ignore
    ws.id = msg.id;
    console.log('connectionHandler');
    broadcastConnection(ws, msg)
}

app.ws('/', (ws, req) => {
    ws.send('Подключение установлено (сообщение с сервера)')
    ws.on('message', (msg: string) => {
        const message = JSON.parse(msg)
        switch (message.method) {
            case 'connection':
                //@ts-ignore
                connectionHandler(ws, message)
                ws.send(JSON.stringify(message))
                break;
                case 'draw':
                    broadcastConnection(ws, msg)
                    break;
        }
    })
})

app.listen(PORT, () => console.log(`server started on port ${PORT}`))
