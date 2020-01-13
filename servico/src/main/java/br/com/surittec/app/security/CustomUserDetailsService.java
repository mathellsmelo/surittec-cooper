package br.com.surittec.app.security;

import br.com.surittec.app.repository.UsuarioRepository;
import br.com.surittec.app.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    UsuarioRepository usuarioRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        // Let people login with either username or email
        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("Nome de Usuário inválido : " + username)
                );

        return UsuarioPrincipal.create(usuario);
    }

    // This method is used by JWTAuthenticationFilter
    @Transactional
    public UserDetails loadUserById(Integer id) {
        Usuario usuario = usuarioRepository.findById(id).orElseThrow(
                () -> new UsernameNotFoundException("Usuário não encontrado pelo Id : " + id)
        );

        return UsuarioPrincipal.create(usuario);
    }
}
