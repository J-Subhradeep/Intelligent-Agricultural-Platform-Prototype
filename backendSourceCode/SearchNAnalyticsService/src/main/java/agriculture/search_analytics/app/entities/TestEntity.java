package agriculture.search_analytics.app.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import lombok.Data;

@Document(indexName = "mongo_test_index")
@Data
public class TestEntity {
	@Id
	private String id;
	private String name;
	
}
