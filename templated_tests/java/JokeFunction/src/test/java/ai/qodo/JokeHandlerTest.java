package ai.qodo;

import org.junit.Test;

import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import java.util.Map;
import static org.junit.Assert.assertTrue;
import java.util.Map;
import static org.junit.Assert.assertTrue;
public class JokeHandlerTest {
    // Verify successful creation of JokeHandler instance
    @Test
    public void test_joke_handler_creation() {
        JokeHandler jokeHandler = new JokeHandler();
      assertTrue(true);
    }

    @Test
    public void test_handle_request_with_invalid_headers() {
        JokeHandler jokeHandler = new JokeHandler();
        APIGatewayProxyRequestEvent requestEvent = new APIGatewayProxyRequestEvent();
        requestEvent.setHeaders(Map.of("token", "invalid_token"));
    
        APIGatewayProxyResponseEvent responseEvent = jokeHandler.handleRequest(requestEvent, null);
    
        assertTrue(responseEvent.getStatusCode() == 401);
        assertTrue(responseEvent.getBody().equals("Unauthorized"));
    }


    @Test
    public void test_handle_request_success_with_valid_headers_and_path_parameters() {
        JokeHandler jokeHandler = new JokeHandler();
        APIGatewayProxyRequestEvent requestEvent = new APIGatewayProxyRequestEvent();
        requestEvent.setHeaders(Map.of("token", "uspaaageyjtccfstuacmuyjqazwollym"));
        requestEvent.setPathParameters(Map.of("rename", "John Doe"));
    
        APIGatewayProxyResponseEvent responseEvent = jokeHandler.handleRequest(requestEvent, null);
    
        assertTrue(responseEvent.getStatusCode() == 200);
        assertTrue(responseEvent.getBody().contains("John Doe"));
    }


}
