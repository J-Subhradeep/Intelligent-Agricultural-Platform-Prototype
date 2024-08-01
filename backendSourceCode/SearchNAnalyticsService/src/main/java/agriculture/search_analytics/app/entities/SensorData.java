package agriculture.search_analytics.app.entities;

import java.time.ZonedDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Document(indexName = "sensor_data")
@Data
@JsonIgnoreProperties
public class SensorData {
	@Id
	private String id;
	
	@Field(type = FieldType.Keyword)
	private String sensorType;
	
	@Field(type = FieldType.Keyword)
	private String sensorId;
	
	@Field(type = FieldType.Keyword)
	private String sensorName;
	
	private Long moistureLevel;
	
	@Field(type = FieldType.Date)
	private String timestamp;
}
