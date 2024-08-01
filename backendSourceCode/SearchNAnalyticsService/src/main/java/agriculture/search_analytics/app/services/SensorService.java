package agriculture.search_analytics.app.services;

import java.io.IOException;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Supplier;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.elasticsearch.ElasticsearchRestClientAutoConfiguration;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchAggregation;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchAggregations;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.client.elc.NativeQueryBuilder;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHitSupport;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.SearchOperations;
import org.springframework.data.elasticsearch.core.SearchPage;
import org.springframework.data.elasticsearch.core.query.Criteria;
import org.springframework.data.elasticsearch.core.query.CriteriaQuery;
import org.springframework.stereotype.Service;

import agriculture.search_analytics.app.dtos.SensorDataAnalytics;
import agriculture.search_analytics.app.dtos.SensorDataAnalyticsResponseDto;
import agriculture.search_analytics.app.dtos.SensorDataDto;
import agriculture.search_analytics.app.entities.SensorData;
import agriculture.search_analytics.app.payloads.ApiResponse;
import agriculture.search_analytics.app.repositories.SensorDataRepository;
import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.ElasticsearchException;
import co.elastic.clients.elasticsearch._types.FieldValue;
import co.elastic.clients.elasticsearch._types.SortOrder;
import co.elastic.clients.elasticsearch._types.aggregations.Aggregation;
import co.elastic.clients.elasticsearch._types.aggregations.AvgAggregate;
import co.elastic.clients.elasticsearch._types.aggregations.MultiBucketBase;
import co.elastic.clients.elasticsearch._types.query_dsl.MatchAllQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch._types.query_dsl.QueryBuilders;
import co.elastic.clients.elasticsearch._types.query_dsl.TermsQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.TermsQuery.Builder;
import co.elastic.clients.elasticsearch._types.query_dsl.TermsQueryFieldBuilders;
import co.elastic.clients.elasticsearch.core.SearchRequest;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.json.JsonData;

@Service
public class SensorService {

	@Autowired
	private SensorDataRepository sensorDataRepository;

	@Autowired
	private SearchOperations searchOperations;

	@Autowired
	private ElasticsearchClient elasticsearchClient;
	
	@Autowired
	private ElasticsearchOperations operations;

	public ApiResponse uploadSensorData(SensorDataDto sensorDataDto) {

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");

		SensorData sensorData = new SensorData();
		sensorData.setId(UUID.randomUUID().toString());
		sensorData.setSensorId(sensorDataDto.getSensorId());
		sensorData.setSensorType(sensorDataDto.getSensorType());
		sensorData.setMoistureLevel(sensorDataDto.getMoistureLevel());
		sensorData.setTimestamp(ZonedDateTime.now(ZoneId.of("Asia/Kolkata")).format(formatter) + "+05:30");
		sensorData.setSensorName(sensorDataDto.getSensorName());
		sensorDataRepository.save(sensorData);

		return new ApiResponse("Sensor Data Added with id : " + sensorData.getId(), true);
	}

	public List<SensorData> getAnalytics(SensorDataAnalytics sensorDataAnalytics) {
		Pageable pageable = PageRequest.of(0, 1000, Sort.by("timestamp").ascending());

		Page<SensorData> page = sensorDataRepository.findSensorDataByDatetimeAndIds(sensorDataAnalytics.getIds(),
				sensorDataAnalytics.getStartDate(), sensorDataAnalytics.getEndDate(), pageable);
		return page.getContent();
	}

	public SensorDataAnalyticsResponseDto getAnalyticsUsingJava(SensorDataAnalytics sensorDataAnalyticsDto)
			throws ElasticsearchException, IOException {
		NativeQuery query;

		query = NativeQuery.builder()
				.withQuery(q -> q.bool(b -> b.must(
						QueryBuilders.terms(t -> t.field("sensorId")
								.terms(te -> te.value(sensorDataAnalyticsDto.getIds().stream()
										.map(el -> FieldValue.of(el)).toList()))),
						QueryBuilders.range(r -> r.field("timestamp").from(sensorDataAnalyticsDto.getStartDate())
								.to(sensorDataAnalyticsDto.getEndDate())))))
				.withSort(s -> s.field(f -> f.field("timestamp").order(SortOrder.Asc)))
				.withPageable(PageRequest.of(0, 2000))
				.withAggregation("aggr-moisture", Aggregation.of(ag -> ag.avg(av -> av.field("moistureLevel")))).build();
		
		SearchHits<SensorData> hits = operations.search(query, SensorData.class);
		SearchPage<SensorData> page = SearchHitSupport.searchPageFor(hits, PageRequest.of(0, 2000));
		SearchHits<SensorData> searchHits = page.getSearchHits();
		
		AvgAggregate aggregatedData = ((ElasticsearchAggregations) searchHits
			      .getAggregations())
			      .get("aggr-moisture")
			      .aggregation()
			      .getAggregate()
			      .avg()
			      ;
		
//		System.out.println(aggregatedData);
		
		List<SensorData> list = hits.stream().map(el -> el.getContent()).toList();
		
		return new SensorDataAnalyticsResponseDto(list, aggregatedData.value());
	}
}
