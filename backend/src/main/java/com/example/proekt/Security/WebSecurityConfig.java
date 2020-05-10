package com.example.proekt.Security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    JwtResponse.JwtTokenProvider jwtTokenProvider;

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {

        httpSecurity.httpBasic().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/auth/register","/auth/signin","/auth/admin").permitAll()
                .antMatchers(HttpMethod.POST,"/rezervacija").hasAnyRole("USER","ADMIN")
                .antMatchers(HttpMethod.POST,"/airport","/drzava","/flight","/city","/passenger").hasRole("ADMIN")
                .antMatchers(HttpMethod.DELETE,"/airport/**","/airport/**","/drzava/**","/flight/**","/city/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.PUT,"/drzava/**","/flight/**","/Passenger/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.GET).permitAll()
                .antMatchers(HttpMethod.OPTIONS).permitAll()
                .anyRequest().authenticated()
                .and()
                .apply(new JwtSecurityConfigurer(jwtTokenProvider));



    }


    public static class JwtSecurityConfigurer extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {
        private JwtResponse.JwtTokenProvider jwtTokenProvider;

        public JwtSecurityConfigurer(JwtResponse.JwtTokenProvider jwtTokenProvider){
            this.jwtTokenProvider = jwtTokenProvider;
        }

        @Override
        public void configure(HttpSecurity httpSecurity) throws Exception{
            JwtTokenAuthenticationFilter customFilter = new JwtTokenAuthenticationFilter(jwtTokenProvider);
            httpSecurity.exceptionHandling()
                    .authenticationEntryPoint(new JwtRequset.JwtAuthenticationEntryPoint())
                    .and()
                    .addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);
        }
    }

    public static class JwtTokenAuthenticationFilter extends GenericFilterBean {

        private JwtResponse.JwtTokenProvider jwtTokenProvider;
        public JwtTokenAuthenticationFilter(JwtResponse.JwtTokenProvider jwtTokenProvider){
            this.jwtTokenProvider = jwtTokenProvider;
        }
        @Override
        public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
            String token = this.jwtTokenProvider.resolveToken((HttpServletRequest) request);
            if(token!= null && this.jwtTokenProvider.validateToken(token)){
                Authentication auth = jwtTokenProvider.getAuthentication(token);

                if (auth != null) {
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            }
            chain.doFilter(request,response);

        }
    }
}





