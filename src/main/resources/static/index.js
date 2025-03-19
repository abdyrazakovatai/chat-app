// Инициализация WebSocket
console.log("index.js загружен!");
const socket = new SockJS('wss://localhost:8443/chat');
const stompClient = StompJs.Stomp.over(socket);

// Глобальные переменные
let currentUser = { id: 1, username: "Я" };
let currentChat = { id: 1 };

stompClient.connect({}, function (frame) {
    console.log('Подключено: ' + frame);
    stompClient.subscribe('/topic/messages', function (messageOutput) {
        const message = JSON.parse(messageOutput.body);
        displayMessage(message);
    });
}, function (error) {
    console.error('Ошибка подключения:', error);
});

// Функция генерации случайного ID
function generateMessageId() {
    const randomIdLength = Math.floor(Math.random() * 2) + 3; // 3 или 4 цифры
    const randomId = Math.floor(Math.random() * Math.pow(10, randomIdLength));
    return randomId.toString().padStart(randomIdLength, '0');
}

// Динамическая функция отправки сообщения
function sendMessage(content = null) {
    const messageContent = content || document.getElementById('messageInput').value;
    if (!messageContent.trim()) {
        console.log("Сообщение пустое, отправка отменена");
        return;
    }

    const message = {
        id: generateMessageId(),
        content: messageContent,
        chatId: currentChat.id, // Используем chatId вместо chat
        userId: currentUser.id, // Используем userId вместо user
        sender: currentUser.username
    };

    console.log("Отправка сообщения:", message);
    stompClient.send("/app/sendMessage", {}, JSON.stringify(message));

    if (!content) {
        document.getElementById('messageInput').value = '';
    }
}

// Функция отображения сообщения
function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(message.sender === currentUser.username ? 'user-message' : 'friend-message');

    const senderElement = document.createElement('span');
    senderElement.classList.add('sender');
    senderElement.innerText = `${message.sender}: `;

    const textElement = document.createElement('span');
    textElement.innerText = message.content; // Убрали type, так как его нет

    messageElement.appendChild(senderElement);
    messageElement.appendChild(textElement);
    document.getElementById('messages').appendChild(messageElement);
}

// Обработчики событий
document.getElementById('sendMessageButton').addEventListener('click', () => sendMessage());
document.getElementById('messageInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') sendMessage();
});