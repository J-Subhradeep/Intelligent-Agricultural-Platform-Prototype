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

import agriculture.farm_management.app.dtos.FarmCreateDto;
import agriculture.farm_management.app.dtos.RegisterUserDto;
import agriculture.farm_management.app.entities.AuthenticationCollection;
import agriculture.farm_management.app.entities.FarmInfo;
import agriculture.farm_management.app.payloads.ApiResponse;
import agriculture.farm_management.app.services.FarmService;
import agriculture.farm_management.app.services.UserManagementService;

@RestController
@RequestMapping("/agriculture/farms")
public class FarmControllers {

	@Autowired
	private FarmService farmService;
	@Autowired
	private UserManagementService userManagementService;

	@PostMapping("/create-farm")
	public ResponseEntity<ApiResponse> createFarm(@RequestBody FarmCreateDto farmCreateDto) {

		ApiResponse response = farmService.createFarm(farmCreateDto);

		return new ResponseEntity<ApiResponse>(response, HttpStatus.CREATED);
	}

	@GetMapping("/get")
	public ResponseEntity<FarmInfo> getFarm(@RequestParam String id) {

		return new ResponseEntity<FarmInfo>(farmService.getFarm(id), HttpStatus.OK);
	}
	
	@GetMapping("/get-farms")
	public ResponseEntity<List<FarmInfo>> getFarms(@RequestParam String managerId){
		return new ResponseEntity<List<FarmInfo>>(farmService.getFarmByManagerID(managerId),HttpStatus.OK);
	}

	@PostMapping("/add-worker")
	public ResponseEntity<ApiResponse> addWorker(@RequestBody RegisterUserDto registerUserDto) {
		return new ResponseEntity<ApiResponse>(userManagementService.addWorker(registerUserDto), HttpStatus.CREATED);
	}

	@GetMapping("/get-workers")
	public ResponseEntity<List<AuthenticationCollection>> getFarmWorkers(@RequestParam String farmId,
			@RequestParam(required = false) String zoneId) {
		if (zoneId == null)
			return new ResponseEntity<List<AuthenticationCollection>>(userManagementService.getFarmWorkers(farmId),
					HttpStatus.OK);
		else {
			return new ResponseEntity<List<AuthenticationCollection>>(
					userManagementService.getZoneWorkers(farmId, zoneId), HttpStatus.OK);

		}
	}
	
	
}
