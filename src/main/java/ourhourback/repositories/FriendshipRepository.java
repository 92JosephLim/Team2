package ourhourback.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ourhourback.entities.Friendship;
import ourhourback.entities.Member;

import java.util.List;
import java.util.Optional;

public interface FriendshipRepository extends JpaRepository<Friendship,Long> {

    boolean existsByFromUserAndToUser(Member fromUser, Member toUser);
    List<Friendship> findAllByFromUserAndStatus(Member fromUser, Friendship.Status status);
    List<Friendship> findAllByToUserAndStatus(Member toUser, Friendship.Status status);
    Optional<Friendship> findByFromUserAndToUser(Member fromUser, Member toUser);

}
