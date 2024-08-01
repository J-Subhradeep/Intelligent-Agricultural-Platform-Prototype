package agriculture.search_analytics.app.dtos;

import java.util.List;

import agriculture.search_analytics.app.entities.SensorData;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class SensorDataAnalyticsResponseDto {
	private List<SensorData> data;
	private Double averageMoistureLevel;
}
