package agriculture.farm_management.app.dtos;

import lombok.Data;

@Data
public class AuthRequest {
	String role;
	String username;
	String password;
}
