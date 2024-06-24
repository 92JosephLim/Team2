package ourhourback.entities;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "friendship",
        uniqueConstraints = @UniqueConstraint(columnNames = {"from_user_id", "to_user_id"}),
        indexes = {
                @Index(name = "idx_from_user_id", columnList = "from_user_id"),
                @Index(name = "idx_to_user_id", columnList = "to_user_id")
        })
public class Friendship {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "from_user_id", nullable = false)
    private Member fromUser;

    @ManyToOne
    @JoinColumn(name = "to_user_id", nullable = false)
    private Member toUser;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.PENDING;

    @Column(nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createDate;

    public enum Status {
        PENDING,
        ACCEPTED,
        REJECTED
    }
}

