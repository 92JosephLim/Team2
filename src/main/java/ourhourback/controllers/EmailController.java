package ourhourback.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ourhourback.dtos.Email;
import ourhourback.dtos.VerificationRequest;
import ourhourback.services.EmailService;

@RestController
@RequiredArgsConstructor
public class EmailController {
    private final EmailService emailService;

    // 인증번호 요청을 받는 엔드포인트
    @PostMapping("/api/emailSend")
    public String mailSend(@RequestBody Email email) {
        System.out.println(email.getEmail());

        return emailService.sendEmail(email.getEmail());
    }

    // 인증번호를 확인하는 엔드포인트
    @PostMapping("/api/emailConfirm")
    public String emailConfirm(@RequestBody VerificationRequest verificationRequest){
        System.out.println(verificationRequest.getEmail() + verificationRequest.getCode());
        boolean isValid = emailService.verifyCode(verificationRequest.getEmail(), verificationRequest.getCode());
        if (isValid){
            return "인증에 성공했습니다.";
        }else {
            return "인증에 실패했습니다.";
        }
    }
}
