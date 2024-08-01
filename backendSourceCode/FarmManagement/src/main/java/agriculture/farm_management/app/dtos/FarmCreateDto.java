package agriculture.farm_management.app.dtos;

import lombok.Data;

@Data
public class FarmCreateDto {
	private String name;
	private String address;
	private String contactNumber;
	private String managerId;
}
