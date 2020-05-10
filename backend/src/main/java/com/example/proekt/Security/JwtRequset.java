package com.example.proekt.Security;


import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Data
public class JwtRequset {
    private String userName;
    private String password;

    @Slf4j
    public static class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

        @Override
        public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
            log.debug("Jwt authentication failed:" + authException);
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED	, "Jwt authentication failed");
        }
    }
}
