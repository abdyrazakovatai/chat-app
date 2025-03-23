// import SockJS from 'sockjs-client';
//
// console.log("index.js загружен!");
// const socket = new SockJS('https://my-websocket-chat.herokuapp.com/chat');
// const stompClient = StompJs.Stomp.over(socket);
//
// // Глобальные переменные
// let currentUser = { id: 1, username: "Я" };
// let currentChat = { id: 1 };
// let unreadCount = 0;
// let isWindowFocused = document.hasFocus();
//
// stompClient.connect({}, function (frame) {
//     console.log('Подключено: ' + frame);
//     stompClient.subscribe('/topic/messages', function (messageOutput) {
//         const message = JSON.parse(messageOutput.body);
//         displayMessage(message);
//     });
// }, function (error) {
//     console.error('Ошибка подключения:', error);
// });
//
// // Функция генерации случайного ID
// function generateMessageId() {
//     const randomIdLength = Math.floor(Math.random() * 2) + 3; // 3 или 4 цифры
//     const randomId = Math.floor(Math.random() * Math.pow(10, randomIdLength));
//     return randomId.toString().padStart(randomIdLength, '0');
// }
//
// // Динамическая функция отправки сообщения
// function sendMessage(content = null) {
//     const messageContent = content || document.getElementById('messageInput').value;
//     if (!messageContent.trim()) {
//         console.log("Сообщение пустое, отправка отменена");
//         return;
//     }
//
//     const message = {
//         id: generateMessageId(),
//         content: messageContent,
//         chatId: currentChat.id,
//         userId: currentUser.id,
//         sender: currentUser.username
//     };
//
//     console.log("Отправка сообщения:", message);
//     stompClient.send("/app/sendMessage", {}, JSON.stringify(message));
//
//     if (!content) {
//         document.getElementById('messageInput').value = '';
//     }
// }
//
// // Функция отображения сообщения
// function displayMessage(message) {
//     const messageElement = document.createElement('div');
//     messageElement.classList.add('message');
//     messageElement.classList.add(message.sender === currentUser.username ? 'user-message' : 'friend-message');
//
//     const senderElement = document.createElement('span');
//     senderElement.classList.add('sender');
//     senderElement.innerText = message.sender;
//
//     const textElement = document.createElement('span');
//     textElement.innerText = `: ${message.content}`;
//
//     messageElement.appendChild(senderElement);
//     messageElement.appendChild(textElement);
//     document.getElementById('messages').appendChild(messageElement);
//
//     const messagesContainer = document.getElementById('messages');
//     messagesContainer.scrollTop = messagesContainer.scrollHeight;
//
//     updateUnreadCounter(message);
// }
//
// // Обновление счетчика непрочитанных
// function updateUnreadCounter(message) {
//     if (!isWindowFocused && message.sender !== currentUser.username) {
//         unreadCount++;
//         document.getElementById('unreadCounter').innerText = `(${unreadCount})`;
//     }
// }
//
// // Обработчики событий
// document.getElementById('sendMessageButton').addEventListener('click', () => sendMessage());
// document.getElementById('messageInput').addEventListener('keypress', function (e) {
//     if (e.key === 'Enter') sendMessage();
// });
//
// window.addEventListener('focus', () => {
//     unreadCount = 0;
//     document.getElementById('unreadCounter').innerText = `(0)`;
//     isWindowFocused = true;
// });
//
// window.addEventListener('blur', () => {
//     isWindowFocused = false;
// });

// import SockJS from "sockjs-client";
// import { Client } from "@stomp/stompjs";

window.onload = function () {
    console.log("Stomp.Js: ", window.Stomp);
    if (!window.Stomp) {
        console.error("Stomp.js failed to load!");
        return;
    }

    const socket = new SockJS("https://my-websocket-chat-545a0987aa03.herokuapp.com");
    const stompClient = window.Stomp.over(socket);

    console.log("Stomp.Client: ", stompClient);

    // const socket = new SockJS('https://my-websocket-chat-545a0987aa03.herokuapp.com/chat');
    // const stompClient = window.Stomp.over(socket);

    let unreadCount = 0;
    const currentUserId = 1; // Замените на реальный ID текущего пользователя

    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/messages', function (message) {
            const msg = JSON.parse(message.body);
            showMessage(msg.content, msg.user.id === currentUserId);
        });
    }, function (error) {
        console.error('Connection error: ' + error);
    });

    document.getElementById('sendMessageButton').addEventListener('click', function () {
        const content = document.getElementById('messageInput').value;
        if (content.trim()) {
            stompClient.send('/app/send', {}, JSON.stringify({
                content: content,
                chatId: 1, // Замените на реальный chatId
                userId: currentUserId,
                sender: 'User' // Замените на реальное имя
            }));
            document.getElementById('messageInput').value = '';
        }
    });

    function showMessage(content, isUserMessage) {
        const messagesDiv = document.getElementById('messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message ' + (isUserMessage ? 'user-message' : 'friend-message');
        messageDiv.innerHTML = '<span class="sender">' + (isUserMessage ? 'Вы' : 'Друг') + '</span>' + content;
        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        unreadCount++;
        document.getElementById('unreadCounter').textContent = '(' + unreadCount + ')';
    }
}