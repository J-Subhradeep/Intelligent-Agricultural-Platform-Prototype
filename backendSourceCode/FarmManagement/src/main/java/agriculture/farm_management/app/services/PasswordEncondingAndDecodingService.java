package agriculture.farm_management.app.services;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.springframework.stereotype.Service;

@Service
public class PasswordEncondingAndDecodingService {

	public String encode(String password) {
		MessageDigest messageDigest;
		try {
			messageDigest = MessageDigest.getInstance("SHA-256");
			messageDigest.update(password.getBytes());
			String stringHash = new String(messageDigest.digest());
			return stringHash;
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			throw new RuntimeException("Algorithm is invalid");
		}
	}
	
	public boolean matchPasswordWithEncodedPassword(String password, String encodedPassword) {
		MessageDigest messageDigest;
		try {
			messageDigest = MessageDigest.getInstance("SHA-256");
			messageDigest.update(password.getBytes());
			String stringHash = new String(messageDigest.digest());
			return stringHash.equals(encodedPassword);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			throw new RuntimeException("Wrong Password");
		}
	}
}
