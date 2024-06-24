package ourhourback.services;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ourhourback.configures.VerificationCodeStore;
import ourhourback.entities.Member;
import ourhourback.repositories.MemberRepository;

import java.security.SecureRandom;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;
    private final String senderEmail= "qusdml123@gmail.com"; // 보내는 이메일 주소
    private int number;  // 랜덤 인증 코드
    private final VerificationCodeStore verificationCodeStore;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    // 인증 코드 생성
    public void createNumber() {
        number = (int)(Math.random() * (90000)) + 100000; // (int) Math.random() * (최댓값-최소값+1) + 최소값
    }

    // 메일 양식 작성
    public MimeMessage createMail(String mail){
        createNumber();  // 인증 코드 생성
        verificationCodeStore.saveCode(mail, number); // 인증 코드와 이메일 저장
        MimeMessage message = mailSender.createMimeMessage();

        try {
            message.setFrom(senderEmail);   // 보내는 이메일 설정
            message.setRecipients(MimeMessage.RecipientType.TO, mail); // 받는 이메일 설정
            message.setSubject("[Ourhour] 회원가입을 위한 이메일 인증");  // 제목 설정
            String body = "";
            body += "<h1>" + "안녕하세요." + "</h1>";
            body += "<h1>" + "ourhour 입니다." + "</h1>";
            body += "<h3>" + "회원가입을 위한 요청하신 인증 번호입니다." + "</h3><br>";
            body += "<h2>" + "아래 코드를 회원가입 창으로 돌아가 입력해주세요." + "</h2>";

            body += "<div align='center' style='border:1px solid black; font-family:verdana;'>";
            body += "<h2>" + "회원가입 인증 코드입니다." + "</h2>";
            body += "<h1 style='color:blue'>" + number + "</h1>";
            body += "</div><br>";
            body += "<h3>" + "감사합니다." + "</h3>";
            message.setText(body,"UTF-8", "html");
        } catch (Exception e) {
            e.printStackTrace();
        }

        return message;
    }

    // 실제 메일 전송
    public String sendEmail(String userEmail) {
        Optional<Member> existingMember = memberRepository.findByEmail(userEmail);
        if (existingMember.isPresent()) {
            return "동일한 이메일이 존재합니다.";
        }

        // 메일 전송에 필요한 정보 설정
        MimeMessage message = createMail(userEmail);
        // 실제 메일 전송
        mailSender.send(message);
        return "인증 이메일이 전송되었습니다.";
    }

    // 이메일 인증 코드 확인
    public boolean verifyCode(String email, int code) {
        return verificationCodeStore.verifyCode(email, code);
    }

    // 임시 비밀번호 생성
    public String generateTemporaryPassword() {
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder();
        String upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
        String digits = "0123456789";
        String specialCharacters = "!@#$%^&*()-_+=<>?";
        String allCharacters = upperCaseLetters + lowerCaseLetters + digits + specialCharacters;

        // 적어도 하나의 대문자, 소문자, 숫자, 특수문자를 포함하도록 합니다.
        sb.append(upperCaseLetters.charAt(random.nextInt(upperCaseLetters.length())));
        sb.append(lowerCaseLetters.charAt(random.nextInt(lowerCaseLetters.length())));
        sb.append(digits.charAt(random.nextInt(digits.length())));
        sb.append(specialCharacters.charAt(random.nextInt(specialCharacters.length())));

        // 나머지 비밀번호를 랜덤하게 채웁니다.
        int passwordLength = 8 + random.nextInt(13); // 8자리 이상 20자리 이하
        for (int i = 4; i < passwordLength; i++) {
            sb.append(allCharacters.charAt(random.nextInt(allCharacters.length())));
        }

        // 생성된 비밀번호를 셔플하여 랜덤성을 높입니다.
        List<Character> passwordCharacters = sb.chars()
                .mapToObj(c -> (char) c)
                .collect(Collectors.toList());
        Collections.shuffle(passwordCharacters);
        String shuffledPassword = passwordCharacters.stream()
                .collect(StringBuilder::new, StringBuilder::append, StringBuilder::append)
                .toString();
        return shuffledPassword;
    }

    // 임시 비밀번호 메일 양식 작성
    public MimeMessage createTemporaryPasswordMail(String email, String tempPassword) {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            message.setFrom(senderEmail);
            message.setRecipients(MimeMessage.RecipientType.TO, email);
            message.setSubject("[Ourhour] 임시 비밀번호 발송");
            String body = "<h1>안녕하세요.</h1>"
                    + "<h1>Ourhour 입니다.</h1>"
                    + "<h3>요청하신 임시 비밀번호입니다.</h3><br>"
                    + "<h2>아래 임시 비밀번호로 로그인 후 비밀번호를 변경해주세요.</h2>"
                    + "<div align='center' style='border:1px solid black; font-family:verdana;'>"
                    + "<h2>임시 비밀번호</h2>"
                    + "<h1 style='color:blue'>" + tempPassword + "</h1>"
                    + "</div><br>"
                    + "<h3>감사합니다.</h3>";
            message.setText(body, "UTF-8", "html");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return message;
    }

    // 임시 비밀번호 이메일 전송
    public String sendTemporaryPasswordEmail(String email) {
        Optional<Member> existingMember = memberRepository.findByEmail(email);
        if (existingMember.isEmpty()) {
            return "해당 이메일의 사용자가 존재하지 않습니다.";
        }

        Member member = existingMember.get();
        String tempPassword = generateTemporaryPassword();
        String newEncodedPassword = passwordEncoder.encode(tempPassword);
        member.setPassword(newEncodedPassword); // 임시비밀번호 설정
        memberRepository.save(member);

        MimeMessage message = createTemporaryPasswordMail(email, tempPassword);
        mailSender.send(message);

        return "임시 비밀번호가 이메일로 전송되었습니다.";
    }
}
