package agriculture.search_analytics.app.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import agriculture.search_analytics.app.entities.TestEntity;
import agriculture.search_analytics.app.payloads.ApiResponse;
import agriculture.search_analytics.app.repositories.TestRepository;

@Service
public class TestService {

	@Autowired
	private TestRepository testRepository;
	
	public ApiResponse addTestData(TestEntity t) {
		t.setId(UUID.randomUUID().toString());
		testRepository.save(t);
		return new ApiResponse("Data Added", true);
	}
}
