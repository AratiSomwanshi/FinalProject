package com.ecommerce.controller;

import com.ecommerce.model.User;
import com.ecommerce.request.LoginRequest;
import com.ecommerce.request.RegisterRequest;
import com.ecommerce.response.LoginResponse;
import com.ecommerce.service.UserService;
import com.ecommerce.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

   

    
    @PreAuthorize("hasRole('ADMIN')")
    // Get all users (admin access)
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // Get user profile by ID
    @GetMapping("/profile/{id}")
    public ResponseEntity<User> getProfile(@PathVariable Long id) {
        User user = userService.getProfile(id);
        return ResponseEntity.ok(user);
    }

    // Edit user profile
    @PutMapping("/profile/{id}")
    public ResponseEntity<User> editProfile(@PathVariable Long id,
                                            @RequestParam String username,
                                            @RequestParam String email,
                                            @RequestParam String address) {
        User updatedUser = userService.editProfile(id, username, email, address);
        return ResponseEntity.ok(updatedUser);
    }

    // Delete user by ID (admin access)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully");
    }

    // Get user profile using JWT token
    @GetMapping("/profile")
    public ResponseEntity<User> getProfileFromJwt(@RequestHeader("Authorization") String token) {
        try {
            String jwtToken = token.replace("Bearer ", "");  // Extract the token from Authorization header
            User user = userService.getUserProfileFromJwt(jwtToken);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(null); // Return null or an appropriate error message or response
        }
    }
}
