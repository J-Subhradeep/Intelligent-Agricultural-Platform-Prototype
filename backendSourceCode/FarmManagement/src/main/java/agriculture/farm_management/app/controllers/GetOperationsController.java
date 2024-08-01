package agriculture.farm_management.app.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import agriculture.farm_management.app.dtos.RegisterUserDto;
import agriculture.farm_management.app.entities.AuthenticationCollection;
import agriculture.farm_management.app.services.UserManagementService;

@RestController
@RequestMapping("/agriculture/get")
public class GetOperationsController {
	
	@Autowired
	private UserManagementService userManagementService;

	@GetMapping("/users")
	public ResponseEntity<List<AuthenticationCollection>> getUsers()
	{
		List<AuthenticationCollection> users = userManagementService.getAllUsers();
		
		return new ResponseEntity<List<AuthenticationCollection>> (users, HttpStatus.OK);
	}
	
	@GetMapping("/user")
	public ResponseEntity<AuthenticationCollection> getUserById(@RequestParam String id)
	{
		AuthenticationCollection user = userManagementService.getUser(id);
		
		return new ResponseEntity<AuthenticationCollection> (user, HttpStatus.OK);
	}
}
