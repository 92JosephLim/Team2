package ourhourback.services;

import org.json.JSONObject;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import ourhourback.entities.Member;
import ourhourback.enums.Authority;
import ourhourback.enums.LoginType;
import ourhourback.jwt.JwtTokenProvider;
import ourhourback.repositories.KakaoUserRepo;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;


@Service

public class KakaoOauthService {
    private final KakaoUserRepo kakaoUserRepo;
    private final JwtTokenProvider jwtTokenProvider;
    private final RestTemplate restTemplate;

    public KakaoOauthService(KakaoUserRepo kakaoUserRepo, JwtTokenProvider jwtTokenProvider, RestTemplateBuilder restTemplateBuilder) {
        this.kakaoUserRepo = kakaoUserRepo;
        this.jwtTokenProvider = jwtTokenProvider;
        this.restTemplate = restTemplateBuilder.build();
    }


    public String getAccessToken(String uri){

        String response = restTemplate.postForObject(uri,null, String.class);
        System.out.println("전체응답 : "+ response);
        JSONObject jsonResponse = new JSONObject(response);
        String accessToken = jsonResponse.getString("access_token");
        return accessToken;
    }

    public Map<String, Object> getKakaoUserInfo(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        HttpEntity<String> entity = new HttpEntity<>("", headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.GET,
                entity,
                Map.class
        );

        System.out.println(response);
        return response.getBody();
    }

    public Map<String,Object> handleKakaoLoginResponse(Map<String,Object> kakaoUserInfo){
        Long kakaoUserId = (Long) kakaoUserInfo.get("id");
        String kakaoConnectedAt = (String) kakaoUserInfo.get("connected_at");
        Map<String, Object> properties = (Map<String, Object>) kakaoUserInfo.get("properties");
        Map<String, Object> kakaoAccount = (Map<String, Object>) kakaoUserInfo.get("kakao_account");
        Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");
        String kakaoNickname = (String) profile.get("nickname");
        String profileImageUrl = (String) properties.get("profile_image");
        String kakaoEmail = "kakao_" + kakaoAccount.get("email");
        System.out.println(profileImageUrl);

        Optional<Member> optionalMember = kakaoUserRepo.findByUserId(String.valueOf(kakaoUserId));
        boolean isUserExists = optionalMember.isPresent();


        if (!isUserExists) {
            // 처음 회원가입하는 사용자 처리
            // 데이터베이스에 새로운 사용자 정보를 저장하고, 해당 사용자와 연관된 JWT 토큰을 생성하여 반환합니다.
            // 여기서는 간단히 출력하는 것으로 대체하겠습니다.
            Member newMember = Member.builder()
                    .userId(String.valueOf(kakaoUserId))
                    .email(kakaoEmail)
                    .nickname(kakaoNickname)
                    .authority(Authority.ROLE_USER)
                    .loginType(LoginType.KAKAO)
                    .profileImage(profileImageUrl)
                    .build();
            kakaoUserRepo.save(newMember);

            Map<String,Object> userAttributes = new HashMap<>();
//            userAttributes.put("id",kakaoEmail);
            userAttributes.put("nickName",kakaoNickname);
            userAttributes.put("authority",Authority.ROLE_USER);
            userAttributes.put("loginType",LoginType.KAKAO);
            userAttributes.put("email",kakaoEmail);
            userAttributes.put("profileImage",profileImageUrl);
            String jwtToken = jwtTokenProvider.createToken(userAttributes);

            System.out.println("처음 회원가입하는 사용자입니다. 사용자 정보를 데이터베이스에 저장하고 JWT 토큰을 생성하여 반환합니다.");
            Map<String,Object> response = new HashMap<>();
            response.put("nickName",kakaoNickname);
            response.put("token",jwtToken);
            return response;
        } else {
            // 이미 가입한 사용자 처리
            // 데이터베이스에서 해당 사용자 정보를 가져와 업데이트하거나 그대로 사용합니다.
            // 여기서는 간단히 출력하는 것으로 대체하겠습니다.
            Member existingMember = optionalMember.get();
            System.out.println("이미 가입한 사용자입니다. 기존 사용자 정보를 가져와 업데이트하거나 그대로 사용합니다.");

            Map<String,Object> userAttributes = new HashMap<>();
//            userAttributes.put("id",existingMember.getEmail());
            userAttributes.put("nickName", existingMember.getNickname());
            userAttributes.put("authority", existingMember.getAuthority());
            userAttributes.put("loginType", existingMember.getLoginType());
            userAttributes.put("email", existingMember.getEmail());
            userAttributes.put("profileImage", existingMember.getProfileImage());
            userAttributes.put("gender",existingMember.getGender());
            userAttributes.put("phoneNumber", existingMember.getPhoneNumber());

            String jwtToken = jwtTokenProvider.createToken(userAttributes);
            Map<String,Object> response = new HashMap<>();
            response.put("nickname",existingMember.getNickname());
            response.put("token",jwtToken);
            return response;
        }

    }

    private boolean checkIfUserExists(Long kakaoUserId){

        Optional<Member> existingMember = kakaoUserRepo.findByUserId(String.valueOf(kakaoUserId));
        //사용자가존재하는지 아닌지에 따라 달라져야함
        return existingMember != null;
    }



}
