package agriculture.farm_management.app.dtos;

import lombok.Data;

@Data
public class CreateSensorDto {
	private String sensorName;
	private String zoneId;
}
