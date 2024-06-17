package ourhourback.configures;

import org.springframework.stereotype.Component;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

@Component
public class VerificationCodeStore {
    private final ConcurrentHashMap<String, VerificationCode> store = new ConcurrentHashMap<>();

    public void saveCode(String email, int code) {
        VerificationCode verificationCode = new VerificationCode(code, System.currentTimeMillis());
        store.put(email, verificationCode);
    }

    public boolean verifyCode(String email, int code) {
        VerificationCode verificationCode = store.get(email);

        if (verificationCode == null) {
            return false;
        }

        long currentTime = System.currentTimeMillis();
        if (currentTime - verificationCode.getTimestamp() > TimeUnit.MINUTES.toMillis(5)) {
            store.remove(email);
            return false;
        }

        return verificationCode.getCode() == code;
    }

    private static class VerificationCode {
        private final int code;
        private final long timestamp;

        public VerificationCode(int code, long timestamp) {
            this.code = code;
            this.timestamp = timestamp;
        }

        public int getCode() {
            return code;
        }

        public long getTimestamp() {
            return timestamp;
        }
    }
}


