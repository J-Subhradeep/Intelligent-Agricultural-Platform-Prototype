package agriculture.search_analytics.app.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import agriculture.search_analytics.app.dtos.SensorDataAnalytics;
import agriculture.search_analytics.app.dtos.SensorDataAnalyticsResponseDto;
import agriculture.search_analytics.app.dtos.SensorDataDto;
import agriculture.search_analytics.app.entities.SensorData;
import agriculture.search_analytics.app.payloads.ApiResponse;
import agriculture.search_analytics.app.repositories.SensorDataRepository;
import agriculture.search_analytics.app.services.SensorService;
import co.elastic.clients.elasticsearch._types.ElasticsearchException;

@RestController
@RequestMapping("/search-n-analytics/sensor-data")
public class SensorDataController {

	@Autowired
	private SensorService sensorService;

	@PostMapping("/add-data")
	public ResponseEntity<ApiResponse> uploadSensorData(@RequestBody SensorDataDto sensorData) {
		ApiResponse response = sensorService.uploadSensorData(sensorData);
		return new ResponseEntity<ApiResponse>(response, HttpStatus.CREATED);
	}

	@PostMapping("/analytics")
	public ResponseEntity<List<SensorData>> getAnalytics(@RequestBody SensorDataAnalytics sensorDataAnalytics) {
		List<SensorData> response = sensorService.getAnalytics(sensorDataAnalytics);
		return new ResponseEntity<List<SensorData>>(response, HttpStatus.OK);
	}
	
	@PostMapping("/analytics-with-avg")
	public ResponseEntity<SensorDataAnalyticsResponseDto> getAnalyticsWithAvg(@RequestBody SensorDataAnalytics sensorDataAnalytics) throws ElasticsearchException, IOException{
		
		
		SensorDataAnalyticsResponseDto analyticsWithAvg = sensorService.getAnalyticsUsingJava(sensorDataAnalytics);
		return new ResponseEntity<>(analyticsWithAvg, HttpStatus.OK);
	}

}
