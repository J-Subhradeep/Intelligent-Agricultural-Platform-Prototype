package agriculture.farm_management.app.entities;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import agriculture.farm_management.app.dtos.SensorNameRecord;
import lombok.Data;

@Data
@Document("ZoneInfo")
public class ZoneInfo {
	@Id
	private String id;
	private String name;
	private String farmId;
	private List<SensorNameRecord> soilMoistureSensors;
	private String irrigationControllerId;
	
}
