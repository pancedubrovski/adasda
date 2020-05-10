package com.example.proekt.Web;

import com.example.proekt.Model.AccountUser;
import com.example.proekt.Model.Exception.InvalidUserName;
import com.example.proekt.Model.request.AuthenticationRequest;
import com.example.proekt.Repository.AccountUserRepository;
import com.example.proekt.Security.JwtResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtResponse.JwtTokenProvider jwtTokenProvider;

    @Autowired
    AccountUserRepository users;
    private final PasswordEncoder passwordEncoder;

    public AuthenticationController(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/signin")
    public ResponseEntity signin(@RequestBody AuthenticationRequest data) {

        try {
            String username = data.getUsername();
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, data.getPassword()));
            AccountUser user = this.users.findByUsername(username).orElseThrow(()->new UsernameNotFoundException("Username " + username + "not found"));
            String token = jwtTokenProvider.createToken(username, user.getRoles());


            Map<Object, Object> model = new HashMap<>();
            model.put("username", username);
            model.put("token", token);
            model.put("role",user.getRoles());
            return ok(model);
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid username/password supplied");
        }
    }
    @PostMapping("/register")
    public AccountUser registerAccount(@RequestBody AuthenticationRequest data){
        AccountUser accountUser = new AccountUser();
        if(this.users.findByUsername(data.getUsername()).isPresent()){
            throw new InvalidUserName(data.getUsername());
        }
        accountUser.setUsername(data.getUsername());
        accountUser.setPassword(this.passwordEncoder.encode(data.getPassword()));
        accountUser.setRoles(Arrays.asList("ROLE_USER"));
        return this.users.save(accountUser);

    }
    @PostMapping("/admin")
    public AccountUser registerAccountAdmin(@RequestBody AuthenticationRequest data, @RequestHeader int password) {
        AccountUser accountUser = new AccountUser();
        if (password == 1234) {

            accountUser.setUsername(data.getUsername());
            accountUser.setPassword(this.passwordEncoder.encode(data.getPassword()));
            accountUser.setRoles(Arrays.asList("ROLE_USER", "ROLE_ADMIN"));
        }
        return this.users.save(accountUser);

    }

}
