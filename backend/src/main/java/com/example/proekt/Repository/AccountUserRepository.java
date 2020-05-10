package com.example.proekt.Repository;

import com.example.proekt.Model.AccountUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountUserRepository extends JpaRepository<AccountUser,Long> {

    Optional<AccountUser> findByUsername(String username);
}
