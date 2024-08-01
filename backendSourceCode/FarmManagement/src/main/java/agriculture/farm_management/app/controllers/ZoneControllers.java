package agriculture.farm_management.app.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import agriculture.farm_management.app.dtos.CreateSensorDto;
import agriculture.farm_management.app.dtos.CreateZoneDto;
import agriculture.farm_management.app.dtos.SensorNameRecord;
import agriculture.farm_management.app.entities.ZoneInfo;
import agriculture.farm_management.app.payloads.ApiResponse;
import agriculture.farm_management.app.services.ZoneService;

@RestController
@RequestMapping("/agriculture/zones")
public class ZoneControllers {

	@Autowired
	private ZoneService zoneService;
	
	@PostMapping("/create-zone")
	public ResponseEntity<ApiResponse> createZone(@RequestBody CreateZoneDto createZoneDto){
		
		ApiResponse response = zoneService.createZone(createZoneDto);
		return new ResponseEntity<ApiResponse>(response, HttpStatus.CREATED);
	}
	
	@PostMapping("/create-sensor")
	public ResponseEntity<ApiResponse> createSensor(@RequestBody CreateSensorDto createSensorDto){
		
		ApiResponse response = zoneService.addSensorId(  createSensorDto.getZoneId(), createSensorDto.getSensorName());
		return new ResponseEntity<ApiResponse>(response, HttpStatus.CREATED);
	}
	
	@GetMapping("/get-zones")
	public ResponseEntity<List<ZoneInfo>> getZonesByFarmID(@RequestParam String farmId){
		List<ZoneInfo> response = zoneService.findZonesByFarmId(farmId);
		return new ResponseEntity<List<ZoneInfo>>(response, HttpStatus.OK);
	}
	
	@GetMapping("/get-sensors")
	public ResponseEntity<List<SensorNameRecord>> getSensors(@RequestParam String zoneId){
		
		List<SensorNameRecord> response = zoneService.getAllSensorsOfAZone(zoneId);
		return new ResponseEntity<List<SensorNameRecord>>(response, HttpStatus.OK);
	}
	
	
}
