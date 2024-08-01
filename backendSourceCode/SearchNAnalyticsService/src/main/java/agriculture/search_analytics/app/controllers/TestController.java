package agriculture.search_analytics.app.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import agriculture.search_analytics.app.dtos.SensorDataAnalytics;
import agriculture.search_analytics.app.dtos.SensorDataAnalyticsResponseDto;
import agriculture.search_analytics.app.entities.SensorData;
import agriculture.search_analytics.app.entities.TestEntity;
import agriculture.search_analytics.app.payloads.ApiResponse;
import agriculture.search_analytics.app.services.SensorService;
import agriculture.search_analytics.app.services.TestService;
import co.elastic.clients.elasticsearch._types.ElasticsearchException;

@RestController
@RequestMapping("/search-n-analytics")
public class TestController {
	@Autowired
	private TestService testService;
	@Autowired
	private SensorService sensorService;

	@PostMapping("/test/add")
	public ResponseEntity<SensorDataAnalyticsResponseDto> addTestData(@RequestBody TestEntity testEntity) throws ElasticsearchException, IOException
	{
		SensorDataAnalytics sensorDataAnalytics = new SensorDataAnalytics();
		sensorDataAnalytics.setIds(List.of("moisture-sensor-406a6804-7137-4564-a5f0-15856f4268cc","moisture-sensor-d42317b6-f02e-42ec-afeb-6ec3541cad57"));
		sensorDataAnalytics.setStartDate("2024-07-28T21:42:46+05:30");
		sensorDataAnalytics.setEndDate("2024-07-29T19:41:46+05:30");
		SensorDataAnalyticsResponseDto response = sensorService.getAnalyticsUsingJava(sensorDataAnalytics);
		return new ResponseEntity<SensorDataAnalyticsResponseDto>(response, HttpStatus.OK);
	}
}
