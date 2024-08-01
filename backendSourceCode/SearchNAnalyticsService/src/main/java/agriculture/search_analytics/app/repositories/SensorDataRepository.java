package agriculture.search_analytics.app.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import agriculture.search_analytics.app.entities.SensorData;

public interface SensorDataRepository extends ElasticsearchRepository<SensorData, String>{

	@Query("""
{
    "bool": {
      "must": [
        {
          "terms": {
            "sensorId": #{#sensorIds}
          } 
        },
        {
          "range": {
            "timestamp": {
              "gte": "#{#startDate}",
              "lte": "#{#endDate}"
            }
          } 
        }
      ]
    }
  }

			""")
	Page<SensorData> findSensorDataByDatetimeAndIds(List<String> sensorIds, String startDate, String endDate, Pageable pageable);
}
