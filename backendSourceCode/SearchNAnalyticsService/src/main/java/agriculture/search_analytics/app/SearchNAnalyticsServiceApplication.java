package agriculture.search_analytics.app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import agriculture.search_analytics.app.services.SensorService;

@SpringBootApplication
public class SearchNAnalyticsServiceApplication {

	
	public static void main(String[] args) {
		SpringApplication.run(SearchNAnalyticsServiceApplication.class, args);
		
		
	}

}
