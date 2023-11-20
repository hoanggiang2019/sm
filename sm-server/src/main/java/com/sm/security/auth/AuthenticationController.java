package com.sm.security.auth;

import com.sm.security.dto.UserDto;
import com.sm.security.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final UserService service;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody UserDto request) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody UserDto request) {

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/refresh-token")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        service.refreshToken(request, response);
    }

}
