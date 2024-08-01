package agriculture.farm_management.app.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import agriculture.farm_management.app.payloads.ApiResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	

	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ApiResponse> handleException(Exception ex){
		
		String message = ex.getClass() +":"+ ex.getMessage();
		
		ApiResponse response = new ApiResponse(message, false);
		return new ResponseEntity<>(response,HttpStatus.BAD_REQUEST);
	}


}