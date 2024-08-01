package agriculture.farm_management.app.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import agriculture.farm_management.app.dtos.CreateZoneDto;
import agriculture.farm_management.app.dtos.SensorNameRecord;
import agriculture.farm_management.app.dtos.ZoneNameRecord;
import agriculture.farm_management.app.entities.FarmInfo;
import agriculture.farm_management.app.entities.ZoneInfo;
import agriculture.farm_management.app.payloads.ApiResponse;
import agriculture.farm_management.app.repositories.FarmRepository;
import agriculture.farm_management.app.repositories.ZoneRepository;

@Service
public class ZoneService {

	@Autowired
	private FarmService farmService;
	@Autowired
	private ZoneRepository zoneRepository;

	public ApiResponse createZone(CreateZoneDto createZoneDto) {
		FarmInfo farm = farmService.getFarm(createZoneDto.getFarmId());
		ZoneInfo zone = new ZoneInfo();
		zone.setId("zone-" + UUID.randomUUID().toString());
		zone.setName(createZoneDto.getName());
		zone.setFarmId(farm.getId());
		List<SensorNameRecord> sensors = new ArrayList<>();
		zone.setSoilMoistureSensors(sensors);
		zone.setIrrigationControllerId("");
		zone = zoneRepository.save(zone);




		return new ApiResponse("Zone Created with ID: " + zone.getId(), true);
	}

	public ZoneInfo getZone(String id) {
		Optional<ZoneInfo> zone = zoneRepository.findById(id);
		if (zone.isPresent())
			return zone.get();
		else
			throw new RuntimeException("Zone with ID :" + id + " Not Found");
	}
	
	
	public ApiResponse addSensorId(String zoneId, String sensorName) {
		
		Optional<ZoneInfo> zone = zoneRepository.findById(zoneId);
		if(zone.isEmpty()) throw new RuntimeException("Zone with ID :" + zoneId + " Not Found");
		
		ZoneInfo zoneInfo = zone.get();
		String sensorId = "moisture-sensor-"+UUID.randomUUID().toString();
		zoneInfo.getSoilMoistureSensors().add(new SensorNameRecord(sensorName, sensorId));
		zoneRepository.save(zoneInfo);
		return new ApiResponse("Sensor Created with ID: "+sensorId, true);
		
	}
	
	public List<SensorNameRecord> getAllSensorsOfAZone(String zoneId){
		Optional<ZoneInfo> zone = zoneRepository.findById(zoneId);
		if(zone.isEmpty()) throw new RuntimeException("Zone with ID :" + zoneId + " Not Found");

		return zone.get().getSoilMoistureSensors();
	}
	
	public List<ZoneInfo> findZonesByFarmId(String farmId){
		return zoneRepository.findByFarmId(farmId);
	}
}
