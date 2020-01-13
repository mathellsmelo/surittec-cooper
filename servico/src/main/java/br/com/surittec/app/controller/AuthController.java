package br.com.surittec.app.controller;

import br.com.surittec.app.repository.RoleRepository;
import br.com.surittec.app.exception.AppException;
import br.com.surittec.app.model.Role;
import br.com.surittec.app.model.RoleNome;
import br.com.surittec.app.model.Usuario;
import br.com.surittec.app.payload.ApiResponse;
import br.com.surittec.app.payload.JwtAuthenticationResponse;
import br.com.surittec.app.payload.LoginRequest;
import br.com.surittec.app.payload.SignUpRequest;
import br.com.surittec.app.repository.UsuarioRepository;
import br.com.surittec.app.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collection;
import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        if(usuarioRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity(new ApiResponse(false, "Nome de usuário já existe"),
                    HttpStatus.BAD_REQUEST);
        }

        // Creating user's account
        Usuario usuario = new Usuario(signUpRequest.getUsername(), signUpRequest.getPassword());

        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));

        Role userRole = roleRepository.findByNome(RoleNome.ROLE_USER)
                .orElseThrow(() -> new AppException("Role não criada"));

        usuario.setRoles(Collections.singleton(userRole));

        Usuario resultado = usuarioRepository.save(usuario);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/users/{username}")
                .buildAndExpand(usuario.getUsername()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "Usuário Registrado com sucesso"));
    }

    @GetMapping(value="/role")
    public Collection<? extends GrantedAuthority> currentUserName(Authentication authentication) {
        return authentication.getAuthorities();
    }

}