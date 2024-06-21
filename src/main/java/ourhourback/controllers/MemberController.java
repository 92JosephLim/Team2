package ourhourback.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import ourhourback.dtos.UserDTO;
import ourhourback.entities.Friendship;
import ourhourback.entities.Member;
import ourhourback.repositories.MemberRepository;
import ourhourback.services.EmailService;
import ourhourback.services.MemberService;

import java.util.List;
import java.util.Map;

import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class MemberController {

    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final EmailService emailService;

    //닉네임으로 사람검색
    @PostMapping("/members/search")
    public ResponseEntity<?> searchMemberByNickName(@RequestBody Map<String, String> payload) {
        String nickName = payload.get("nickName");
        System.out.println(nickName);

        List<Member> members = memberRepository.findByNickname(nickName);
        if (!members.isEmpty()) {
            List<UserDTO> userDTOs = members.stream().map(member -> {
                UserDTO userDTO = new UserDTO();
                userDTO.setEmail(member.getEmail());
                userDTO.setLanguage(member.getLanguage());
                userDTO.setNickName(member.getNickname());
                return userDTO;
            }).collect(Collectors.toList());

            System.out.println(userDTOs);
            return ResponseEntity.ok(userDTOs);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No members found with this nickname.");
    }
    }

    @PostMapping("/findpassword")
    public ResponseEntity<?> findPassword(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        System.out.println(email);

        //여기에서 받아온 email을 이용해서 새로운 임시 비밀번호를 생성하고 db에 저장후,
        //email로 임시비밀번호 보내주기
        String result = emailService.sendTemporaryPasswordEmail(email);
        if (result.equals("임시 비밀번호가 이메일로 전송되었습니다.")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(404).body(result);
        }

    }
    //친구추가요청 보내기
    @PostMapping("/friends/add")
    public ResponseEntity<?> addFriend(@RequestBody Map<String, String> payload) {
        String senderEmail = payload.get("senderEmail");
        String receiverEmail = payload.get("receiverEmail");
        System.out.println(senderEmail);
        System.out.println(receiverEmail);
        try {
            memberService.addFriend(senderEmail, receiverEmail);
            return ResponseEntity.ok("Friend request sent");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    //친구요청 수락
    @PostMapping("/friends/accept")
    public ResponseEntity<?> acceptFriendRequest(@RequestBody Map<String, String> payload) {
        String senderEmail = payload.get("senderEmail");
        String receiverEmail = payload.get("receiverEmail");

        try {
            memberService.acceptFriendRequest(senderEmail, receiverEmail);
            return ResponseEntity.ok("Friend request accepted");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    //친구요청 거절
    @PostMapping("/friends/reject")
    public ResponseEntity<?> rejectFriendRequest(@RequestBody Map<String, String> payload) {
        String senderEmail = payload.get("senderEmail");
        String receiverEmail = payload.get("receiverEmail");

        try {
            memberService.rejectFriendRequest(senderEmail, receiverEmail);
            return ResponseEntity.ok("Friend request rejected");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    //친구목록 가져오기
    @GetMapping("/friends/list")
    public ResponseEntity<?> getFriends(@RequestParam String email) {
        try {
            List<Member> friends = memberService.getFriends(email);
            return ResponseEntity.ok(friends);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    //보낸 친구요청
    @GetMapping("/friends/requests/sent")
    public ResponseEntity<?> getSentRequests(@RequestParam String email) {
        try {
            List<Friendship> sentRequests = memberService.getSentRequests(email);
            return ResponseEntity.ok(sentRequests);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    //받은 친구요청
    @GetMapping("/friends/requests/received")
    public ResponseEntity<?> getReceivedRequests(@RequestParam String email) {
        try {
            List<Friendship> receivedRequests = memberService.getReceivedRequests(email);
            return ResponseEntity.ok(receivedRequests);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    //친구 삭제
    @PostMapping("/friends/delete")
    public ResponseEntity<?> deleteFriend(@RequestBody Map<String, String> payload) {
        String userEmail = payload.get("userEmail");
        String friendEmail = payload.get("friendEmail");

        try {
            memberService.deleteFriend(userEmail, friendEmail);
            return ResponseEntity.ok("Friend deleted");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}

