let username = "";
let socket = null;

function login() {
    username = document.getElementById("username").value.trim();

    if (username !== "") {
        document.querySelector('.login-container').style.display = 'none';
        document.querySelector('.chat-container').style.display = 'block';
        initSocket();
    }
}

function initSocket() {
    socket = new WebSocket('ws://localhost:3000'); // Aqui você deve substituir pelo seu endpoint de WebSocket

    socket.onopen = function(event) {
        console.log('Conectado ao servidor WebSocket');
    };

    socket.onmessage = function(event) {
        const data = JSON.parse(event.data);
        showMessage(data.username, data.message);
    };

    socket.onerror = function(error) {
        console.error('Erro WebSocket:', error);
    };

    socket.onclose = function(event) {
        console.log('Conexão WebSocket fechada');
    };
}

function sendMessage() {
    const userInput = document.getElementById("user-input");
    const message = userInput.value.trim();

    if (message !== "") {
        const data = {
            username: username,
            message: message
        };
        socket.send(JSON.stringify(data));

        // Limpar campo de entrada após o envio da mensagem
        userInput.value = "";
    }
}

function showMessage(username, message) {
    const chatBox = document.getElementById("chat-box");
    const newMessage = document.createElement("div");
    newMessage.innerHTML = `<strong>${username}:</strong> ${message}`;
    newMessage.classList.add("message");
    chatBox.appendChild(newMessage);

    // Rolagem automática para a última mensagem
    chatBox.scrollTop = chatBox.scrollHeight;
}


