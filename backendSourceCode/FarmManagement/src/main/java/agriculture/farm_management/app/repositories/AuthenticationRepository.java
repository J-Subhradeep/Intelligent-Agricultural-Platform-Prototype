package agriculture.farm_management.app.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import agriculture.farm_management.app.entities.AuthenticationCollection;
import java.util.List;
import java.util.Optional;


public interface AuthenticationRepository extends MongoRepository<AuthenticationCollection, String> {
	Optional<AuthenticationCollection> findByUsername(String username);
	List<AuthenticationCollection> findByRoleAndFarmId(String role, String farmId);
	List<AuthenticationCollection> findByRoleAndFarmIdAndZoneId(String role, String farmId, String zoneId);
}
