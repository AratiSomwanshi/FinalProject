package com.ecommerce.service;

import com.ecommerce.enums.Role;
import com.ecommerce.exception.UnauthorizedException;
import com.ecommerce.exception.UserNotFoundException;
import com.ecommerce.model.User;
import com.ecommerce.repository.UserRepository;
import com.ecommerce.util.JwtUtil;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.logging.Logger;

@Service
public class UserService {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final Logger logger = Logger.getLogger(UserService.class.getName());

    @Value("${jwt.secret}")
    private String secretKey;

    // Register a new user with encrypted password
    @Transactional
    public User registerUser(String username, String email, Role role, String address, String password) {
        // Check if username or email already exists
        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("Username already exists");
        }
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already exists");
        }

        // Create a new user and save to the repository
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setRole(role);
        user.setAddress(address);
        user.setPassword(password); // Already encoded in controller
        return userRepository.save(user);
    }

    // Authenticate user by checking username and password
    public User authenticateUser(String username, String password) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found with username: " + username));
        
        // Compare the provided password with the stored hashed password
        if (passwordEncoder.matches(password, user.getPassword())) {
            return user;         }

        return null; 
    }

    // Extract user profile from JWT token
    @Transactional
    public User findUserProfileByJwt(String jwt) throws UnauthorizedException {
        try {
            // Use JwtUtil to extract claims from the JWT
            Claims claims = jwtUtil.extractClaims(jwt);

            // Extract username from the 'sub' (subject) claim
            String username = claims.getSubject();
            if (username == null) {
                throw new UnauthorizedException("Invalid token: Subject is null");
            }

            // Find the user by username
            return userRepository.findByUsername(username)
                                 .orElseThrow(() -> new UnauthorizedException("User not found"));
        } catch (JwtException e) {
            throw new UnauthorizedException("Invalid token: " + e.getMessage());
        }
    }

	public User getUserById(Long userId) {
		// TODO Auto-generated method stub
		return null;
	}

	public User getUserProfileFromJwt(String jwtToken) {
		// TODO Auto-generated method stub
		return null;
	}
}
