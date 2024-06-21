package ourhourback.entities;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import ourhourback.enums.Authority;
import ourhourback.enums.LoginType;

import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@Table(name = "member")
public class Member implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true)
    private String userId; // 소셜 로그인 ID 카카오는숫자, 구글은 이메일

    @Column(nullable = true)
    private String email; // 자체 회원가입 이메일

    @Column(nullable = true)
    private String password; // 자체 회원가입 비밀번호

    @Column(nullable = true)
    private String phoneNumber; // 핸드폰 번호

    @Column(nullable = true)
    private String gender; // 성별 (선택안함, 남자, 여자)

    @Column(nullable = true)
    private String language; // 언어 (한국어, 영어, 일본어, 중국어, 스페인어, 아랍어)

    @Column(nullable = true)
    private String profileImage; // 프로필 사진 이미지

    @Column(nullable = true)
    private String nickname; // 닉네임 (소셜 로그인 시 필수)

    @Enumerated(EnumType.STRING)
    private Authority authority; // 권한

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LoginType loginType; // 로그인 유형 (자체, 카카오, 구글 등)

    @Builder
    public Member(Long id, String userId, String email, String password, String phoneNumber, String gender,
                  String language, String profileImage, String nickname, Authority authority, LoginType loginType) {
        this.id = id;
        this.userId = userId;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.gender = gender;
        this.language = language;
        this.profileImage = profileImage;
        this.nickname = nickname;
        this.authority = authority;
        this.loginType = loginType;
    }

    public Member(String email, String encodedPassword, String phoneNumber, String gender, String language, String profilePicturePath) {
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(authority.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }
}
