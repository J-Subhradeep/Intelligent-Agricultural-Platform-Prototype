package agriculture.farm_management.app.entities;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import agriculture.farm_management.app.dtos.ZoneNameRecord;
import lombok.Data;

@Document("FarmInfo")
@Data
public class FarmInfo {
	@Id
	private String id;
	private String name;
	private String address;
	private String contactNumber;
	private String managerId;
}
