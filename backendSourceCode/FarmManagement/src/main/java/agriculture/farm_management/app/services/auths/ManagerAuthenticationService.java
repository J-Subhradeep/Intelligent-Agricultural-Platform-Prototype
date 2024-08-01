package agriculture.farm_management.app.services.auths;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import agriculture.farm_management.app.dtos.AuthRequest;
import agriculture.farm_management.app.dtos.RegisterUserDto;
import agriculture.farm_management.app.entities.AuthenticationCollection;
import agriculture.farm_management.app.entities.FarmInfo;
import agriculture.farm_management.app.payloads.ApiResponse;
import agriculture.farm_management.app.payloads.JwtResponse;
import agriculture.farm_management.app.repositories.AuthenticationRepository;
import agriculture.farm_management.app.services.JwtService;
import agriculture.farm_management.app.services.PasswordEncondingAndDecodingService;
import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class ManagerAuthenticationService {
	private AuthenticationRepository authenticationRepository;
	private JwtService jwtService;
	private PasswordEncondingAndDecodingService passService;
	
	
	public ApiResponse registerManager(RegisterUserDto registerUserDto) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
		
		AuthenticationCollection user = new AuthenticationCollection();
		user.setId(UUID.randomUUID().toString());
		user.setName(registerUserDto.getName());
		user.setRole(registerUserDto.getRole());
		user.setEmail(registerUserDto.getEmail());
		user.setAddress(registerUserDto.getAddress());
		user.setMobile(registerUserDto.getMobile());
		user.setUsername(registerUserDto.getRole()+"-"+registerUserDto.getUsername());
		user.setPassword(passService.encode(registerUserDto.getPassword()));
		user.setFarmId(registerUserDto.getFarmId());
		user.setZoneId(registerUserDto.getZoneId());
		user.setCreatedOn(ZonedDateTime.now(ZoneId.of("Asia/Kolkata")).format(formatter).toString()+"+05:30");
		user = authenticationRepository.save(user);
		return new ApiResponse(registerUserDto.getRole()+" Saved with ID : "+user.getId(), true);
	}
	
	
	public Optional<AuthenticationCollection> authenticate(AuthRequest loginDto) {
		Optional<AuthenticationCollection> systemUser = authenticationRepository.findByUsername(loginDto.getRole()+"-"+loginDto.getUsername());
		if(systemUser.isPresent()) {
			AuthenticationCollection user = systemUser.get();
//			String password = passwordManagement.encode(loginDto.getPassword());
			if(passService.matchPasswordWithEncodedPassword(loginDto.getPassword(), user.getPassword()) && user.getRole().equals(loginDto.getRole())) {
				return systemUser;
			}
			else throw new RuntimeException("Authentication Error");
			
		}
		else {
			throw new RuntimeException("Authentication Error");
		}
	}
	
	public JwtResponse getToken(AuthRequest loginDto) {
		Optional<AuthenticationCollection> user = authenticate(loginDto);
		if(user.isPresent()) {
			JwtResponse response = new JwtResponse();
			response.setToken(jwtService.generateToken(loginDto.getUsername(), loginDto.getRole()));
			response.setUserId(user.get().getId());
			response.setSuccess(true);
			return response;
		}
		else {
			throw new RuntimeException("Authentication Error");
		}
	}
	

}
