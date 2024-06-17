package ourhourback.dtos;



import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@ToString
@Getter
@Setter
@NoArgsConstructor
public class UserDTO {

    private String nickName;
    private String email;
    private String language;


}
