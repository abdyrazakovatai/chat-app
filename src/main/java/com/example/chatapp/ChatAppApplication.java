package com.example.chatapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ChatAppApplication {

    public static void main(String[] args) {
        String port = System.getenv("PORT");
        System.out.println("PORT from environment: " + (port != null ? port : "Not set, using default"));
        SpringApplication.run(ChatAppApplication.class, args);
    }

}
