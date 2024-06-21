package ourhourback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ourhourback.entities.Member;

import java.util.Optional;

public interface GoogleUserRepo extends JpaRepository<Member,Long> {
    Optional<Member> findByEmail(String email);
}
