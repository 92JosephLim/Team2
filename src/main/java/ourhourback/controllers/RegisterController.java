package ourhourback.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ourhourback.entities.Member;
import ourhourback.enums.Authority;
import ourhourback.enums.LoginType;
import ourhourback.jwt.JwtTokenProvider;
import ourhourback.repositories.MemberRepository;
import ourhourback.services.FileStorageService;


import java.util.HashMap;
import java.util.Map;

@RestController
public class RegisterController {
    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/api/register")
    public ResponseEntity<?> registerUser(@RequestParam("email") String email,
                                          @RequestParam("password") String password,
                                          @RequestParam("phoneNumber") String phoneNumber,
                                          @RequestParam("gender") String gender,
                                          @RequestParam("language") String language,
                                          @RequestParam("nickName") String nickname,
                                          @RequestParam(value = "profilePicture", required = false) MultipartFile profilePicture) {
        // 파일 저장 로직
        String profilePicturePath = null;
        if (profilePicture != null && !profilePicture.isEmpty()) {
            profilePicturePath = fileStorageService.storeFile(profilePicture);
        }

        // 비밀번호 인코딩
        String encodedPassword = passwordEncoder.encode(password);

        // 새로운 회원 생성
        Member newMember = Member.builder()
                .email(email)
                .password(encodedPassword)
                .phoneNumber(phoneNumber)
                .gender(gender)
                .nickname(nickname)
                .language(language)
                .profileImage(profilePicturePath)
                .authority(Authority.ROLE_USER)
                .loginType(LoginType.LOCAL)
                .build();
        memberRepository.save(newMember);

        // JWT 토큰 생성
        Map<String, Object> userAttributes = new HashMap<>();
        userAttributes.put("email", newMember.getEmail());
        userAttributes.put("authority", newMember.getAuthority().name());
        userAttributes.put("loginType",newMember.getLoginType());
        userAttributes.put("nickName",newMember.getNickname());
        userAttributes.put("phoneNumber",newMember.getPhoneNumber());
        userAttributes.put("gender",newMember.getGender());


        String jwtToken = jwtTokenProvider.createToken(userAttributes);

        // 응답 데이터 구성
        Map<String, Object> response = new HashMap<>();
        response.put("email", newMember.getEmail());
        response.put("token", jwtToken);
        response.put("success", true); // 성공 여부를 나타내는 필드 추가

        // 성공 응답 반환
        return ResponseEntity.ok(response);
    }

}
