package ourhourback.configures;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    /**
     * 메시지 브로커를 구성하는 메서드입니다.
     * @param config MessageBrokerRegistry 인스턴스
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // 간단한 메모리 기반 메시지 브로커를 활성화하고, 해당 브로커가 "/topic"으로 시작하는 목적지의 메시지를 처리하도록 설정합니다.
        config.enableSimpleBroker("/topic");
        // 애플리케이션 목적지 접두사를 "/app"으로 설정합니다. 클라이언트는 "/app" 접두사를 사용하여 메시지를 보냅니다.
        config.setApplicationDestinationPrefixes("/app");
    }

    /**
     * STOMP 엔드포인트를 등록하는 메서드입니다.
     * @param registry StompEndpointRegistry 인스턴스
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // "/chat" 엔드포인트를 등록하고, SockJS를 사용하도록 설정합니다. 이 엔드포인트는 웹 소켓 연결이 가능하도록 합니다.
        registry.addEndpoint("/chat").setAllowedOrigins("http://localhost:3000","https://js2.jsflux.co.kr").withSockJS();
    }
}
