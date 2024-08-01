package agriculture.farm_management.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import agriculture.farm_management.app.dtos.AuthRequest;
import agriculture.farm_management.app.dtos.RegisterUserDto;
import agriculture.farm_management.app.payloads.ApiResponse;
import agriculture.farm_management.app.payloads.JwtResponse;
import agriculture.farm_management.app.services.auths.ManagerAuthenticationService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@RestController
@RequestMapping("/agriculture")

public class AuthenticationController {
	
	@Autowired
	private ManagerAuthenticationService managerAuthenticationService;

	@PostMapping("/auth/register")
	public ResponseEntity<ApiResponse> register(@RequestBody RegisterUserDto registerUserDto){
		
		ApiResponse apiResponse = managerAuthenticationService.registerManager(registerUserDto);
		
		return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.CREATED);
	}
	
	@PostMapping("/auth/login")
	public ResponseEntity<JwtResponse> login(@RequestBody AuthRequest authRequest){
		
		JwtResponse response = managerAuthenticationService.getToken(authRequest);
		
		return new ResponseEntity<JwtResponse>(response, HttpStatus.OK);
	}
	
}
