import { observer } from 'mobx-react-lite';
import {useEffect, useRef, useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import canvasState from '../../store/canvasState';
import toolState from '../../store/toolState';
import BrushTool from '../../tools/BrushTool';
import cls from './Canvas.module.css';

export const Canvas = observer(() => {
	const canvasRef = useRef<null | HTMLCanvasElement>(null);
    const param = useParams();
    const [show, setShow] = useState(true);

    const nameRef = useRef(null);

    const handleClose = () => {
        if (nameRef.current.value) {
            setShow(false);
            canvasState.setUsername(nameRef.current.value)
            console.log(nameRef.current.value)
        }

    }

	useEffect(() => {
		if (canvasRef.current !== null) {
            canvasState.setCanvas(canvasRef.current as HTMLCanvasElement);
            toolState.setTool(new BrushTool(canvasRef.current));
        }
	}, []);

    useEffect(() => {
        if (canvasState.username) {
            const socket = new WebSocket('ws://localhost:8000')
            socket.onopen = () => {
                socket.send(JSON.stringify({
                    id: param.id,
                    username: canvasState.username,
                    method: 'connection'
                }))
                console.log('Подключение установлено');
            }
            socket.onmessage = (e) => {
                console.log(e.data);
            }
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
			<canvas onMouseDown={mouseDownHandler} style={{ zoom: '100%' }} ref={canvasRef} height={480} width={840} />
		</div>
	);
});
