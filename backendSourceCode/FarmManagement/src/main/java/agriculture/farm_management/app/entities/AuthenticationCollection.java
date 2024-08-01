package agriculture.farm_management.app.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;


@Data
@Document(value = "AuthenticationCollection")
public class AuthenticationCollection {
	
	@Id
	private String id;
	
	private String name;
	
	@Indexed(unique = true)
	private String username;
	private String email;
	private String address;
	private String mobile;
	private String role;
	private String password;
	private String farmId;
	private String zoneId;
	private String createdOn;

}
