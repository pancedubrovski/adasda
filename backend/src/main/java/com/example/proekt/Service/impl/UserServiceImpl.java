package com.example.proekt.Service.impl;

import com.example.proekt.Model.Korisnik;
import com.example.proekt.Repository.UserRepository;
import com.example.proekt.Service.UserService;

public class UserServiceImpl implements UserService {
        private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Korisnik save() {
        return null;
    }
}
