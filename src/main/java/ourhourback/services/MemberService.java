package ourhourback.services;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ourhourback.entities.Friendship;
import ourhourback.entities.Member;
import ourhourback.repositories.FriendshipRepository;
import ourhourback.repositories.MemberRepository;

import java.util.*;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final FriendshipRepository friendshipRepository;

    public Optional<Member> findByEmail(String email) {
        return memberRepository.findByEmail(email);
    }

    @Transactional
    public void addFriend(String senderEmail, String receiverEmail) {
        Member sender = memberRepository.findByEmail(senderEmail)
                .orElseThrow(() -> new IllegalArgumentException("Sender not found"));
        Member receiver = memberRepository.findByEmail(receiverEmail)
                .orElseThrow(() -> new IllegalArgumentException("Receiver not found"));

        // 친구관계 중복체크
        if (friendshipRepository.existsByFromUserAndToUser(sender, receiver)) {
            throw new IllegalArgumentException("Friend request already sent");
        }
        // 친구관계 생성
        Friendship friendship = Friendship.builder()
                .fromUser(sender)
                .toUser(receiver)
                .status(Friendship.Status.PENDING)
                .build();

        friendshipRepository.save(friendship);

    }

    @Transactional
    public void acceptFriendRequest(String senderEmail, String receiverEmail) {
        Member sender = memberRepository.findByEmail(senderEmail)
                .orElseThrow(() -> new IllegalArgumentException("Sender not found"));
        Member receiver = memberRepository.findByEmail(receiverEmail)
                .orElseThrow(() -> new IllegalArgumentException("Receiver not found"));

        Friendship friendship = friendshipRepository.findByFromUserAndToUser(sender, receiver)
                .orElseThrow(() -> new IllegalArgumentException("Friend request not found"));

        if (friendship.getStatus() != Friendship.Status.PENDING) {
            throw new IllegalArgumentException("Friend request is not pending");
        }

        friendship.setStatus(Friendship.Status.ACCEPTED);
        friendshipRepository.save(friendship);
    }

    @Transactional
    public void rejectFriendRequest(String senderEmail, String receiverEmail) {
        Member sender = memberRepository.findByEmail(senderEmail)
                .orElseThrow(() -> new IllegalArgumentException("Sender not found"));
        Member receiver = memberRepository.findByEmail(receiverEmail)
                .orElseThrow(() -> new IllegalArgumentException("Receiver not found"));

        Friendship friendship = friendshipRepository.findByFromUserAndToUser(sender, receiver)
                .orElseThrow(() -> new IllegalArgumentException("Friend request not found"));

        if (friendship.getStatus() != Friendship.Status.PENDING) {
            throw new IllegalArgumentException("Friend request is not pending");
        }

        friendship.setStatus(Friendship.Status.REJECTED);
        friendshipRepository.save(friendship);
    }



    public List<Member> getFriends(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<Friendship> fromUserFriends = friendshipRepository.findAllByFromUserAndStatus(member, Friendship.Status.ACCEPTED);
        List<Friendship> toUserFriends = friendshipRepository.findAllByToUserAndStatus(member, Friendship.Status.ACCEPTED);

        Set<Member> allFriends = new HashSet<>();
        for (Friendship friendship : fromUserFriends) {
            allFriends.add(friendship.getToUser());
        }
        for (Friendship friendship : toUserFriends) {
            allFriends.add(friendship.getFromUser());
        }

        return new ArrayList<>(allFriends);
    }

    public List<Friendship> getSentRequests(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return friendshipRepository.findAllByFromUserAndStatus(member, Friendship.Status.PENDING);
    }

    public List<Friendship> getReceivedRequests(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return friendshipRepository.findAllByToUserAndStatus(member, Friendship.Status.PENDING);
    }

    public void deleteFriend(String userEmail, String friendEmail) {
        Member user = memberRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Member friend = memberRepository.findByEmail(friendEmail)
                .orElseThrow(() -> new IllegalArgumentException("Friend not found"));

        // Check both directions
        Friendship friendship = friendshipRepository.findByFromUserAndToUser(user, friend)
                .orElseGet(() -> friendshipRepository.findByFromUserAndToUser(friend, user)
                        .orElseThrow(() -> new IllegalArgumentException("Friendship not found")));

        friendshipRepository.delete(friendship);
    }

}
