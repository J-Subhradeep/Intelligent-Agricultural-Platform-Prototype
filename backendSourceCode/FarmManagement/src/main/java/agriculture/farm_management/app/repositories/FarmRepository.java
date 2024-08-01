package agriculture.farm_management.app.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import agriculture.farm_management.app.entities.FarmInfo;
import java.util.List;


public interface FarmRepository extends MongoRepository<FarmInfo, String>{
	List<FarmInfo> findByManagerId(String managerId);
}
