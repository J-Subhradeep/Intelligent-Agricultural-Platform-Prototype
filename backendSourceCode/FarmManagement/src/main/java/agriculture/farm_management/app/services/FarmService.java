package agriculture.farm_management.app.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import agriculture.farm_management.app.dtos.FarmCreateDto;
import agriculture.farm_management.app.dtos.ZoneNameRecord;
import agriculture.farm_management.app.entities.AuthenticationCollection;
import agriculture.farm_management.app.entities.FarmInfo;
import agriculture.farm_management.app.entities.ZoneInfo;
import agriculture.farm_management.app.payloads.ApiResponse;
import agriculture.farm_management.app.repositories.AuthenticationRepository;
import agriculture.farm_management.app.repositories.FarmRepository;

@Service
public class FarmService {

	@Autowired
	private FarmRepository farmRepository;

	@Autowired
	private AuthenticationRepository authenticationRepository;

	public ApiResponse createFarm(FarmCreateDto farmCreateDto) {

		Optional<AuthenticationCollection> managerInstance = authenticationRepository
				.findById(farmCreateDto.getManagerId());
		if (managerInstance.isPresent()) {

			FarmInfo farmInfo = new FarmInfo();

			farmInfo.setId("farm" + "-" + UUID.randomUUID().toString());
			farmInfo.setName(farmCreateDto.getName());
			farmInfo.setAddress(farmCreateDto.getAddress());
			farmInfo.setManagerId(farmCreateDto.getManagerId());
			farmInfo.setContactNumber(farmCreateDto.getContactNumber());
			farmInfo = farmRepository.save(farmInfo);
			
			AuthenticationCollection manager = managerInstance.get();
			manager.setFarmId(farmInfo.getId());
			
			return new ApiResponse("Farm Registered with ID : "+farmInfo.getId(), true);
		}
		return new ApiResponse("Manager Not Exists", false);
	}
	
	public FarmInfo getFarm(String id) {
		Optional<FarmInfo> farm = farmRepository.findById(id);
		if(farm.isPresent()) return farm.get();
		else throw new RuntimeException("Farm with id "+id+" not found");
	}
	
	public List<FarmInfo> getFarmByManagerID(String managerId){
		return farmRepository.findByManagerId(managerId);
	}
}
