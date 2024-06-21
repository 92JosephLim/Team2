package ourhourback.configures;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@Configuration
public class CorsConfig {

    /**
     * CORS 필터를 설정하는 메서드입니다.
     * @return 설정된 CORS 필터
     */
    @Bean
    public CorsFilter corsFilter() {
        // 새로운 CORS 구성 인스턴스를 생성합니다.
        CorsConfiguration config = new CorsConfiguration();

        // 허용할 도메인 목록을 설정합니다. 여기서는 로컬호스트의 3000번 포트를 허용합니다.
        config.setAllowedOrigins(Arrays.asList("http://localhost:3000","https://js2.jsflux.co.kr"));

        // 허용할 HTTP 메서드 목록을 설정합니다.
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // 허용할 HTTP 헤더 목록을 설정합니다.
        config.setAllowedHeaders(Arrays.asList("*"));

        // 자격 증명을 허용하도록 설정합니다.
        config.setAllowCredentials(true);

        // URL 기반 CORS 구성 소스를 생성하고, 모든 경로에 대해 위에서 설정한 CORS 구성을 등록합니다.
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        // 위에서 설정한 소스를 기반으로 CORS 필터를 생성하여 반환합니다.
        return new CorsFilter(source);
    }
}
