package agriculture.farm_management.app.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import agriculture.farm_management.app.entities.ZoneInfo;
import java.util.List;


public interface ZoneRepository extends MongoRepository<ZoneInfo, String>{
	List<ZoneInfo> findByFarmId(String farmId);
}
