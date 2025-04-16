FROM openjdk:21 as build
WORKDIR /app
COPY . ./
RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

FROM openjdk:21-jdk-slim
WORKDIR /app
COPY --from=build /app/target/chat-app-0.0.1-SNAPSHOT.jar .
CMD ["java", "-jar", "chat-app-0.0.1-SNAPSHOT.jar"]
EXPOSE 2025