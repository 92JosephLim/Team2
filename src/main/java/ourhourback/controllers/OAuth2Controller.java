package ourhourback.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import ourhourback.services.GoogleOauthService;
import ourhourback.services.KakaoOauthService;


import java.util.Map;

@RestController
@RequiredArgsConstructor
public class OAuth2Controller {

    @Value("${kakao.client-id}")
    private  String kakaoclientId;

    @Value("${kakao.client-secret}")
    private  String kakaoclientSecret;

    @Value("${kakao.redirect-uri}")
    private String kakaoredirectUri;

    @Value("${kakao.authorization-grant-type}")
    private String grantType;

    @Value("${kakao.token-uri}")
    private String kakaoaccessTokenUrl;


    private final KakaoOauthService kakaoOauthService;
    private final GoogleOauthService googleOauthService;

    @GetMapping("/api/oauth/kakao")
    public ResponseEntity<?> kakaoLogin(@RequestParam("code") String code) {
        System.out.println("엑세스토큰=" + code);

        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(kakaoaccessTokenUrl)
                .queryParam("grant_type", grantType)
                .queryParam("client_id", kakaoclientId)
                .queryParam("redirect_uri", kakaoredirectUri)
                .queryParam("code", code)
                .queryParam("client_secret", kakaoclientSecret);

        String accessToken = kakaoOauthService.getAccessToken(builder.toUriString());
        Map<String,Object> userInfo = kakaoOauthService.getKakaoUserInfo(accessToken);

        //받아온 유저정보로 가입이 되어있으면 로그인, 안되어있으면 가입후 로그인
        Map<String,Object> kakaoLoginResponse = kakaoOauthService.handleKakaoLoginResponse(userInfo);
        System.out.println(kakaoLoginResponse.get("token")); // 토큰한번 출력해보기
        return ResponseEntity.ok(kakaoLoginResponse);
    }
    @PostMapping("/api/auth/google")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> request) {
        String idTokenString = request.get("token");
        System.out.println("Received ID Token: " + idTokenString);

        Map<String,Object> userInfo = googleOauthService.verifyAndExtractUser(idTokenString);

        Map<String,Object> response = googleOauthService.handleGoogleLoginResponse(userInfo);
        return ResponseEntity.ok(response);
    }
}
