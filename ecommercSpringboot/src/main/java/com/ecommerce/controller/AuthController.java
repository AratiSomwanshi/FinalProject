package com.ecommerce.controller;

import com.ecommerce.model.User;
import com.ecommerce.request.LoginRequest;
import com.ecommerce.request.RegisterRequest;
import com.ecommerce.response.LoginResponse;
import com.ecommerce.service.UserService;
import com.ecommerce.util.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        logger.info("Registering user: {}", registerRequest.getUsername());

        // Register user and encode password
        User registeredUser = userService.registerUser(
                registerRequest.getUsername(),
                registerRequest.getEmail(),
                registerRequest.getRole(),
                registerRequest.getAddress(),
                passwordEncoder.encode(registerRequest.getPassword()) // Ensure password is encoded
        );

        logger.info("User registered successfully: {}", registerRequest.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED).body(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@Valid @RequestBody LoginRequest loginRequest) {
        logger.info("User login attempt: {}", loginRequest.getUsername());

        // Authenticate the user
        User user = userService.authenticateUser(loginRequest.getUsername(), loginRequest.getPassword());
        
        if (user != null) {
            // Generate JWT token if authentication is successful
            String token = jwtUtil.generateToken(user.getUsername());
            String role = user.getRole().name(); // Get the role as a string

            logger.info("Login successful for user: {}", loginRequest.getUsername());

            // Send response with role included
            LoginResponse loginResponse = new LoginResponse("Login successful", token, role);
            return ResponseEntity.ok(loginResponse);
        }

        logger.warn("Login failed for user: {}", loginRequest.getUsername());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new LoginResponse("Invalid username or password", null, null));
    }

    @DeleteMapping("/logout")
    public ResponseEntity<String> logoutUser() {
        logger.info("User logged out successfully.");
        return ResponseEntity.ok("Logout successful. Please remove token from client.");
    }
}
