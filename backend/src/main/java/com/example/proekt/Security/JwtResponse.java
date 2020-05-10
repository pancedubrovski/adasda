package com.example.proekt.Security;

import com.example.proekt.Model.AccountUser;
import com.example.proekt.Model.Exception.InvalidJwtAuthenticationException;
import com.example.proekt.Repository.AccountUserRepository;
import io.jsonwebtoken.*;
import lombok.Data;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.io.Serializable;
import java.util.Base64;
import java.util.Date;
import java.util.List;

import static org.springframework.http.HttpStatus.UNAUTHORIZED;
import static org.springframework.http.ResponseEntity.status;

@Getter
public class JwtResponse implements Serializable {

    private AccountUser accountUser;
    private final String tokent;
    private Long tokenExpirationDate;
    public JwtResponse(AccountUser ac, String token,Long tokenExpriation){
        this.accountUser = ac;
        this.tokent = token;
        this.tokenExpirationDate = tokenExpriation;
    }

    @Component
    public static class CustomUserDetails implements UserDetailsService {

        private final AccountUserRepository userRepository;

        public CustomUserDetails(AccountUserRepository userRepository) {
            this.userRepository = userRepository;
        }

        @Override
        public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
            return (UserDetails) this.userRepository.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("Username: " + username + " not found"));
        }
    }

    @Configuration
    @ConfigurationProperties(prefix = "jwt")
    @Data
    public static class JwtProperties {
        private String securityKey = "secret";
        private long validityInMs= 36000000;
    }

    @Component
    public static class JwtTokenProvider {

        @Autowired
        private JwtProperties jwtProperties;

        @Autowired
        private UserDetailsService userDetailsService;

        private String secretKey;

        @PostConstruct
        protected void init(){
            this.secretKey = Base64.getEncoder().encodeToString(jwtProperties.getSecurityKey().getBytes());
        }
        public String createToken(String username, List<String> roles){

            Claims claims = Jwts.claims().setSubject(username);
            claims.put("roles",roles);

            Date now = new Date();
            Date validateDate = new Date(now.getTime() + jwtProperties.getValidityInMs());

            return Jwts.builder()
                    .setClaims(claims)
                    .setIssuedAt(now)
                    .setExpiration(validateDate)
                    .signWith(SignatureAlgorithm.HS512,secretKey)
                    .compact();

        }
        public Authentication getAuthentication(String token){
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(getUsername(token));
            return new UsernamePasswordAuthenticationToken(userDetails,"",userDetails.getAuthorities());
        }
        public String getUsername(String token){
            return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
        }
        public String resolveToken(HttpServletRequest request){
            String bearerToken = request.getHeader("Authorization");
            if (bearerToken != null && bearerToken.startsWith("Bearer ")){
                return bearerToken.substring(7);
            }
            return null;
        }
        public boolean validateToken(String token){
            try{
                Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);

                if (claims.getBody().getExpiration().before(new Date())) {
                    return false;
                }

                 return true;
            } catch (JwtException | IllegalArgumentException e) {
                throw new InvalidJwtAuthenticationException("Expired or invalid JWT token");
            }
        }

    }

    @RestControllerAdvice
    @Slf4j
    public static class RestExceptionHandler {



     //   @ExceptionHandler(value = {InvalidJwtAuthenticationException.class})
        public ResponseEntity invalidJwtAuthentication(InvalidJwtAuthenticationException ex, WebRequest request) {
            log.debug("handling InvalidJwtAuthenticationException...");
            return status(UNAUTHORIZED).build();
        }
    }
}
