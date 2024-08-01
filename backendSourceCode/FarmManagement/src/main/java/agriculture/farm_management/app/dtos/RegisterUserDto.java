package agriculture.farm_management.app.dtos;

import lombok.Data;

@Data
public class RegisterUserDto{
	private String name;
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
