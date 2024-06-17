package ourhourback.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ourhourback.entities.Member;
import ourhourback.repositories.MemberRepository;
import ourhourback.services.FileStorageService;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "https://js2.jsflux.co.kr")
public class ModifyController {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private FileStorageService fileStorageService;

    //유저 정보 수정
    @PostMapping("/api/update")
    public ResponseEntity<?> updateUser(@RequestParam("email") String email,
                                        @RequestParam("phoneNumber") String phoneNumber,
                                        @RequestParam("password") String password,
                                        @RequestParam("newPassword") String newPassword,
                                        @RequestParam("gender") String gender,
                                        @RequestParam(value = "profileImage", required = false) MultipartFile profileImage) {
        // Find the user by email
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (!optionalMember.isPresent()) {
            return ResponseEntity.badRequest().body("User not found");
        }

        Member member = optionalMember.get();

        // Update phone number
        member.setPhoneNumber(phoneNumber);
        member.setGender(gender);

        // Update password if provided
        if (newPassword != null && !newPassword.isEmpty()) {
            if (!passwordEncoder.matches(password, member.getPassword())) {
                return ResponseEntity.badRequest().body("Current password is incorrect");
            }
            member.setPassword(passwordEncoder.encode(newPassword));
        }

        // Handle profile image upload
        String profileImageUrl = null;
        if (profileImage != null && !profileImage.isEmpty()) {
            profileImageUrl = fileStorageService.storeFile(profileImage);
            member.setProfileImage(profileImageUrl);
        }

        memberRepository.save(member);
        System.out.println(profileImageUrl);
        // Prepare response data
        Map<String, Object> response = new HashMap<>();
        response.put("email", member.getEmail());
        response.put("success", true); // Add success flag
        response.put("profileImage", profileImageUrl);
        response.put("phoneNumber", phoneNumber);
        response.put("gender", gender);
        // Return success response
        return ResponseEntity.ok(response);
    }


    //회원정보 수정
    @PostMapping("/api/socialupdate")
    public ResponseEntity<?> updateUser(@RequestParam("email") String email,
                                        @RequestParam("phoneNumber") String phoneNumber,
                                        @RequestParam("gender") String gender,
                                        @RequestParam(value = "profileImage", required = false) MultipartFile profileImage) {

        System.out.println("-------gender-----------");
        System.out.println(gender);

        // Find the user by email
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if (!optionalMember.isPresent()) {
            System.out.println("---------------------/api/socialupdate-------------");
            System.out.println("User not found");
            return ResponseEntity.badRequest().body("User not found");
        }

        Member member = optionalMember.get();

        // Update phone number
        member.setPhoneNumber(phoneNumber);

        member.setGender(gender);

        // Handle profile image upload
        String profileImageUrl = null;
        if (profileImage != null && !profileImage.isEmpty()) {
            profileImageUrl = fileStorageService.storeFile(profileImage);
            member.setProfileImage(profileImageUrl);
        }

        memberRepository.save(member);
        System.out.println("--------------profileImage--------------");
        System.out.println(profileImageUrl);
        // Prepare response data
        Map<String, Object> response = new HashMap<>();
        response.put("email", member.getEmail());
        response.put("success", true); // Add success flag
        response.put("profileImage", profileImageUrl);
        response.put("phoneNumber", phoneNumber);
        response.put("gender", gender);
        // Return success response
        return ResponseEntity.ok(response);
    }


}

