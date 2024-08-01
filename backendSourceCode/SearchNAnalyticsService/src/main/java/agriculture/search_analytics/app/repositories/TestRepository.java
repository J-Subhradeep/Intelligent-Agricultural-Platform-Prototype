package agriculture.search_analytics.app.repositories;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import agriculture.search_analytics.app.entities.TestEntity;

public interface TestRepository extends ElasticsearchRepository<TestEntity, String>{

}
