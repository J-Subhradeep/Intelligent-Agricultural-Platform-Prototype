package agriculture.farm_management.app.payloads;

import lombok.Data;

@Data
public class JwtResponse {
	String token;
	String userId;
	Boolean success;
}
