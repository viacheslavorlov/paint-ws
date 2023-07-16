const btn = document.querySelector('#button')

const socket = new WebSocket('ws://localhost:8000')

socket.onopen = () => {
	socket.send(JSON.stringify({
		method: 'connection',
		id: 1235,
	}))
}

socket.onmessage = (event) => {
	console.log('Сообщение с сервера', event.data);
}

btn.addEventListener('click', () => {
	socket.send(JSON.stringify({message: 'Сообщение с клиента!', id: 1235, method: 'connection'}))
})
