package agriculture.search_analytics.app.dtos;

import java.util.List;

import lombok.Data;

@Data
public class SensorDataAnalytics {

	private List<String> ids;
	private String startDate;
	private String endDate;
}
