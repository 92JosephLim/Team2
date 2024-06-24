package ourhourback.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.google.api.client.json.webtoken.JsonWebSignature;
import com.google.auth.oauth2.IdToken;
import com.google.auth.oauth2.TokenVerifier;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import ourhourback.entities.Member;
import ourhourback.enums.Authority;
import ourhourback.enums.LoginType;
import ourhourback.jwt.JwtTokenProvider;
import ourhourback.repositories.GoogleUserRepo;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;


@Service

public class GoogleOauthService {
    private final GoogleUserRepo googleUserRepo;
    private final JwtTokenProvider jwtTokenProvider;
    @Value("${google.client.id}")
    private String googleClientId;

    public GoogleOauthService(GoogleUserRepo googleUserRepo, JwtTokenProvider jwtTokenProvider) {
        this.googleUserRepo = googleUserRepo;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public Map<String,Object> verifyAndExtractUser(String idTokenString){
        TokenVerifier verifier = TokenVerifier.newBuilder()
                .setAudience(googleClientId)
                .setIssuer("https://accounts.google.com")
                .build();

        try {
            JsonWebSignature idToken = verifier.verify(idTokenString);
            System.out.println(idToken);
            DecodedJWT decodedJWT = JWT.decode(idTokenString);
            System.out.println(decodedJWT);

            String email = decodedJWT.getClaim("email").asString();
            String name = decodedJWT.getClaim("name").asString();
            String pictureUrl = decodedJWT.getClaim("picture").asString();

            Map<String, Object> userInfo = new HashMap<>();
            userInfo.put("email","google_"+email);
            userInfo.put("name",name);
            userInfo.put("pictureUrl",pictureUrl);

            return userInfo;

        } catch (TokenVerifier.VerificationException e) {
            throw new RuntimeException(e);
        }

    }

    public Map<String,Object> handleGoogleLoginResponse(Map<String, Object> googleUserInfo){
        String googleEmail = (String) googleUserInfo.get("email");
        String googleName = (String) googleUserInfo.get("name");
        String profileImageUrl = (String) googleUserInfo.get("pictureUrl");

        Optional<Member> optionalMember = googleUserRepo.findByEmail(googleEmail);
        boolean isUserExists = optionalMember.isPresent();

        if (!isUserExists) {
            // 처음 회원가입하는 사용자 처리
            Member newMember = Member.builder()
                    .email(googleEmail)
                    .nickname(googleName)
                    .authority(Authority.ROLE_USER)
                    .loginType(LoginType.GOOGLE)
                    .profileImage(profileImageUrl)
                    .build();
            googleUserRepo.save(newMember);

            Map<String, Object> userAttributes = new HashMap<>();
//            userAttributes.put("id", googleEmail);
            userAttributes.put("nickName", googleName);
            userAttributes.put("email", googleEmail);
            userAttributes.put("pictureUrl", profileImageUrl);
            userAttributes.put("authority", Authority.ROLE_USER);
            userAttributes.put("loginType", LoginType.GOOGLE);
            String jwtToken = jwtTokenProvider.createToken(userAttributes);

            System.out.println("처음 회원가입하는 사용자입니다. 사용자 정보를 데이터베이스에 저장하고 JWT 토큰을 생성하여 반환합니다.");
            Map<String, Object> response = new HashMap<>();
            response.put("nickName", googleName);
            response.put("token", jwtToken);
            return response;
        } else {
            // 이미 가입한 사용자 처리
            Member existingMember = optionalMember.get();
            System.out.println("이미 가입한 사용자입니다. 기존 사용자 정보를 가져와 업데이트하거나 그대로 사용합니다.");

            Map<String, Object> userAttributes = new HashMap<>();
//            userAttributes.put("id", existingMember.getEmail());
            userAttributes.put("nickName", existingMember.getNickname());
            userAttributes.put("email", existingMember.getEmail());
            userAttributes.put("pictureUrl", profileImageUrl);
            userAttributes.put("authority", Authority.ROLE_USER);
            userAttributes.put("loginType", LoginType.GOOGLE);
            userAttributes.put("phoneNumber", existingMember.getPhoneNumber());
            userAttributes.put("gender", existingMember.getGender());

            String jwtToken = jwtTokenProvider.createToken(userAttributes);
            Map<String, Object> response = new HashMap<>();
            response.put("nickname", existingMember.getNickname());
            response.put("token", jwtToken);
            return response;
        }

    }



}
