package com.example.chatapp.config;

import org.springframework.stereotype.Component;

@Component
public class WebSocketEvenListener {
//    private final SimpMessageSendingOperations messagingTemplate;
//
//    public WebSocketEvenListener(SimpMessageSendingOperations messagingTemplate) {
//        this.messagingTemplate = messagingTemplate;
//    }
//
//    @EventListener
//    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
//        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
//        User username = (User) headerAccessor.getSessionAttributes().get("username");
//        if (username != null){
//            var chatMessage = new Message(MessageType.LEAVE, username);
//            messagingTemplate.convertAndSend("/topic/public", chatMessage);
//        }
//    }
}
