package agriculture.search_analytics.app.dtos;

import java.time.ZonedDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data

public class SensorDataDto {

	private String sensorType;
	
	private String sensorId;
	
	private String sensorName;
	
	private Long moistureLevel;
	
}
