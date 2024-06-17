package ourhourback.services;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileStorageService {

    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucketName}")
    private String bucketName;

    public String storeFile(MultipartFile file) {
        // 파일명 클린업
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        String uniqueFileName = UUID.randomUUID().toString() + "_" + fileName;

        try {
            // 파일명 검증
            if (fileName.contains("..")) {
                throw new IOException("파일명에 부적절한 문자가 포함되어 있습니다: " + fileName);
            }

            // MultipartFile을 File로 변환
            File uploadFile = convert(file)
                    .orElseThrow(() -> new IOException("파일 변환 실패: " + fileName));

            // S3에 파일 업로드
            String uploadImageUrl = putS3(uploadFile, uniqueFileName);

            // 로컬에 생성된 파일 삭제
            removeNewFile(uploadFile);

            return uploadImageUrl; // 업로드된 파일의 URL 반환
        } catch (IOException ex) {
            throw new RuntimeException("파일을 저장할 수 없습니다. 파일명: " + fileName, ex);
        }
    }

    private String putS3(File uploadFile, String fileName) {
        amazonS3.putObject(new PutObjectRequest(bucketName, fileName, uploadFile));
        return amazonS3.getUrl(bucketName, fileName).toString(); // 업로드된 파일의 URL 반환
    }

    private void removeNewFile(File targetFile) {
        if (targetFile.delete()) {
            System.out.println("파일 삭제 완료: " + targetFile.getName());
        } else {
            System.out.println("파일 삭제 실패: " + targetFile.getName());
        }
    }

    private Optional<File> convert(MultipartFile file) throws IOException {
        File convertFile = new File(System.getProperty("java.io.tmpdir") + "/" + file.getOriginalFilename());
        if (convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }
        return Optional.empty();
    }
}
