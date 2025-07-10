package pibd.application.application.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import pibd.application.domain.enums.Role;
import pibd.application.domain.model.User;
import pibd.application.infra.persistence.jpa.UserJpaRepository;


@Component
public class DataSeeder implements CommandLineRunner {
    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);
    private final UserJpaRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserJpaRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        log.info("Iniciando o seeder de dados...");
        seedAdminUser();
        log.info("Seeder de dados finalizado.");
    }

    private void seedAdminUser() {
        if (userRepository.findByEmail("admin@dominio.com").isEmpty()) {

            User adminUser = new User();
            adminUser.setEmail("admin@dominio.com");

            adminUser.setPassword(passwordEncoder.encode("admin123"));

            adminUser.setRole(Role.ADMIN);

            userRepository.save(adminUser);
            log.info("Usuário administrador criado com sucesso!");
        } else {
            log.info("Usuário administrador já existe. Nenhuma ação necessária.");
        }
    }
}