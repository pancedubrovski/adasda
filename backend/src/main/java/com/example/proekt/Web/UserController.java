package com.example.proekt.Web;


import com.example.proekt.Model.AccountUser;

import com.example.proekt.Security.JwtRequset;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

import static java.util.stream.Collectors.toList;
import static org.springframework.http.ResponseEntity.ok;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/user")
public class UserController {

    @GetMapping("/me")
    public ResponseEntity currentUser(@AuthenticationPrincipal UserDetails userDetails){
        Map<Object, Object> model = new HashMap<>();
        model.put("username", userDetails.getUsername());
        model.put("roles", userDetails.getAuthorities()
                .stream()
                .map(a -> ((GrantedAuthority) a).getAuthority())
                .collect(toList())
        );
        return ok(model);
    }

}

  //  @PostMapping
   // public
    /*


    private final AccountService accountService;


    public UserController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping
    public AccountUser register(@RequestBody JwtRequset requset){
        return this.accountService.registerAccount(requset);
    }


}

 */



