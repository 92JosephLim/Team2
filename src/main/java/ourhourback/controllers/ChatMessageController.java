package ourhourback.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import ourhourback.dtos.MessageDTO;

@Controller
public class ChatMessageController {

    // SimpMessagingTemplate을 자동 주입하여 메시지를 클라이언트로 전송하는 데 사용
    @Autowired
    private SimpMessagingTemplate messagingTemplate;


    /**
     * 클라이언트로부터 메시지를 받아 특정 채팅방으로 전송하는 메서드
     * @param roomId 채팅방 ID
     * @param messageDTO 클라이언트로부터 받은 메시지
     */
    @MessageMapping("/rooms/{roomId}/message")
    public void sendMessage(@DestinationVariable String roomId, MessageDTO messageDTO) {


        // 메시지를 해당 채팅방의 모든 구독자에게 전송
        messagingTemplate.convertAndSend("/topic/rooms/" + roomId, messageDTO.getContent());
    }
}

