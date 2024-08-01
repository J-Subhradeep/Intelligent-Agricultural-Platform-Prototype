package agriculture.farm_management.app.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import agriculture.farm_management.app.dtos.RegisterUserDto;
import agriculture.farm_management.app.entities.AuthenticationCollection;
import agriculture.farm_management.app.payloads.ApiResponse;
import agriculture.farm_management.app.repositories.AuthenticationRepository;
import agriculture.farm_management.app.services.auths.ManagerAuthenticationService;

@Service
public class UserManagementService {

	@Autowired
	private AuthenticationRepository authenticationRepository;
	@Autowired
	private ManagerAuthenticationService authenticationService;
	
	public List<AuthenticationCollection> getAllUsers(){
		return authenticationRepository.findAll();
	}
	
	public AuthenticationCollection getUser(String id) {
		Optional<AuthenticationCollection> user = authenticationRepository.findById(id);
		if(user.isPresent()) return user.get();
		else throw new RuntimeException("Farm with id "+id+" not found");
	}
	
	public ApiResponse addWorker(RegisterUserDto registerUserDto) {
		return authenticationService.registerManager(registerUserDto);
	}

	public List<AuthenticationCollection> getFarmWorkers(String farmId) {
		// TODO Auto-generated method stub
		return authenticationRepository.findByRoleAndFarmId("WORKER", farmId);
	}
	
	
	public List<AuthenticationCollection> getZoneWorkers(String farmId, String zoneId){
		return authenticationRepository.findByRoleAndFarmIdAndZoneId("WORKER", farmId, zoneId);
	}
}
