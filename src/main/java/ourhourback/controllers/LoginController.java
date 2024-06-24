package ourhourback.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ourhourback.entities.Member;
import ourhourback.jwt.JwtTokenProvider;
import ourhourback.services.MemberService;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "https://js2.jsflux.co.kr")
public class LoginController {

    @Autowired
    private MemberService memberService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/api/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData){
        String email = loginData.get("email");
        String password = loginData.get("password");

        // 데이터가 제대로 들어왔는지 확인하기 위해 로그 출력
        System.out.println("Email: " + email + ", Password: " + password);

        // 이메일로 회원 검색
        Optional<Member> memberOpt = memberService.findByEmail(email);

        if (memberOpt.isEmpty()) {
            // 회원이 존재하지 않는 경우
            return ResponseEntity.status(401).body(Map.of("message", "아이디 또는 비밀번호를 확인해 주세요."));
        }

        Member member = memberOpt.get();

        // 비밀번호 확인
        if (!passwordEncoder.matches(password, member.getPassword())) {
            // 비밀번호가 일치하지 않는 경우
            return ResponseEntity.status(401).body(Map.of("message", "아이디 또는 비밀번호를 확인해 주세요."));
        }

        // JWT 토큰 생성
        Map<String, Object> claims = new HashMap<>();

        claims.put("email", member.getEmail());
        claims.put("phoneNumber", member.getPhoneNumber());
        claims.put("gender", member.getGender());
        claims.put("profileImage", member.getProfileImage());
        claims.put("authority", member.getAuthority().name());
        claims.put("loginType",member.getLoginType());
        claims.put("nickName",member.getNickname());

        String token = jwtTokenProvider.createToken(claims);

        // 로그인 성공 응답
        return ResponseEntity.ok().body(Map.of("token", token));
    }
}
