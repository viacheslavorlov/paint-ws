import {observer} from 'mobx-react-lite';
import {useEffect, useRef, useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import canvasState from '../../store/canvasState.ts';
import toolState from '../../store/toolState.ts';
import BrushTool from '../../tools/BrushTool.ts';
import EraiserTool from '../../tools/EraizerTool.js';
import RectangleTool from '../../tools/RectangleTool.js';
import cls from './Canvas.module.css';

export type Method = 'connection' | 'draw';

export type FigureType = 'brush' | 'line' | 'circle' | 'rect' | 'eraser' | 'finish';

export interface Figure {
    x?: number;
    y?: number;
    type: FigureType;
    width?: number;
    height?: number;
}

interface Message {
    method?: Method;
    username?: string;
    id?: string;
    figure?: Figure;
}


export const Canvas = observer(() => {
    const canvasRef = useRef<null | HTMLCanvasElement>(null);
    const param = useParams();
    const [show, setShow] = useState(true);
    const nameRef = useRef(null);

    const drawHandler = (msg: Message) => {
        console.log('draw works');
        const figure = msg.figure;
        //@ts-ignore
        const ctx = canvasRef.current.getContext('2d');
        if (figure && figure.type) {
            const {
                x,
                y,
                width,
                height,
                type
            } = figure;
            switch (type) {
                case 'brush':
                    BrushTool.draw(ctx, x, y);
                    break;
                case 'rect':
                    RectangleTool.staticDraw(ctx, x, y, width, height);
                    break;
                case 'eraser':
                    if (x && y) {
                        EraiserTool.draw(ctx, x, y);
                    }
                    break;
                case 'finish':
                    ctx.beginPath();
                    break;

            }
        }
    };

    const handleClose = () => {
        if (nameRef.current && nameRef.current.value) {
            setShow(false);
            canvasState.setUsername(nameRef.current.value);
            console.log(nameRef.current.value);
        }

    };

    useEffect(() => {
        //@ts-ignore
        canvasState.setCanvas(canvasRef.current);
    }, []);

    useEffect(() => {
        if (canvasState.username) {
            const socket = new WebSocket('ws://localhost:8000');
            canvasState.setSocket(socket);
            canvasState.setSessionId(param.id);
            toolState.setTool(new BrushTool(canvasRef.current, socket, param.id));
            socket.onopen = () => {
                socket.send(JSON.stringify({
                    id: param.id,
                    username: canvasState.username,
                    method: 'connection'
                }));
                console.log('Подключение установлено');
            };
            socket.onmessage = (e: MessageEvent) => {
                const message = JSON.parse(e.data);
                switch (message.method) {
                    case 'connection':
                        console.log(`пользователь ${message.username} присоединился`);
                        break;
                    case 'draw':
                        drawHandler(message);
                        break;
                }
            };
        }
    }, [canvasState.username]);


    const mouseDownHandler = () => {
        if (canvasRef.current !== null) {
            canvasState.pushToUndo(canvasRef.current?.toDataURL());
        }
    };

    return (

        <div className={cls.Canvas}>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Введите данные</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cls.modalBody}>
                        <label htmlFor="name">Введите ваше имя: </label>
                        <input id={'name'} type="text" ref={nameRef} placeholder={'Введите ваше имя'}/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Войти
                    </Button>
                </Modal.Footer>
            </Modal>
            <canvas onMouseDown={mouseDownHandler} style={{zoom: '100%'}} ref={canvasRef} height={480} width={840}/>
        </div>
    );
});
