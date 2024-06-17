package ourhourback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ourhourback.entities.Member;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member,Long> {
    Optional<Member> findByEmail(String email);
    Optional<Member> findById(Long id);
    List<Member> findByNickname(String nickname);
}
