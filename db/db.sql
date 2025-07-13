-- Database Schema Creation

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY, -- Unique user identifier
    email VARCHAR(255) UNIQUE NOT NULL, -- Unique email for login
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL, -- Defines user type (CITIZEN or ADMIN)
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS citizens (
    id INT PRIMARY KEY, -- Primary and foreign key to user (specialization)
    name VARCHAR(255) NOT NULL,
    birth_date DATE NOT NULL,
    cpf VARCHAR(11) UNIQUE NOT NULL, -- Unique CPF for each citizen
    phone VARCHAR(20),
    age INT, -- Age calculated by trigger
    address_type VARCHAR(50) NOT NULL, -- Address type (Street, Avenue, etc.)
    street VARCHAR(255) NOT NULL,
    number VARCHAR(10) NOT NULL,
    complement VARCHAR(255),
    neighborhood VARCHAR(255) NOT NULL,
    cep VARCHAR(9) NOT NULL,
    CONSTRAINT fk_citizens_users FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY, -- Unique post identifier
    title VARCHAR(255) NOT NULL,
    content TEXT,
    description TEXT,
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    category VARCHAR(255) NOT NULL, -- Post category (VARCHAR)
    status VARCHAR(255) NOT NULL, -- Current post status (VARCHAR)
    user_id INT NOT NULL, -- User who created the post
    CONSTRAINT fk_posts_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS post_media_urls (
    post_id INT NOT NULL, -- Post to which the media belongs
    media_url VARCHAR(255) NOT NULL,
    CONSTRAINT fk_posts_media_url_posts FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY, -- Unique comment identifier
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    post_id INT NOT NULL, -- Post to which the comment belongs
    user_id INT NOT NULL, -- User who made the comment
    parent_comment_id INT, -- Parent comment (for comment hierarchy)
    CONSTRAINT fk_comments_posts FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    CONSTRAINT fk_comments_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_comments_parent FOREIGN KEY (parent_comment_id) REFERENCES comments(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS post_reactions (
    user_id INT NOT NULL, -- User who made the reaction
    post_id INT NOT NULL, -- Post that received the reaction
    type VARCHAR(255) NOT NULL, -- Reaction type (VARCHAR)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, post_id), -- Ensures one reaction per user per post
    CONSTRAINT fk_post_reactions_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_post_reactions_posts FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS comment_reactions (
    user_id INT NOT NULL, -- User who made the reaction
    comment_id INT NOT NULL, -- Comment that received the reaction
    type VARCHAR(255) NOT NULL, -- Reaction type (VARCHAR)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, comment_id), -- Ensures one reaction per user per comment
    CONSTRAINT fk_comment_reactions_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_comment_reactions_comments FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE
);

-- Indexes created on columns frequently used in
-- WHERE clauses, JOINs and to ensure uniqueness of values.

CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users (email);
CREATE UNIQUE INDEX IF NOT EXISTS idx_citizens_cpf ON citizens (cpf);
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts (user_id);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments (post_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments (user_id);

-- Seed Data

INSERT INTO users (email, password, role) VALUES
('joao.silva@email.com', 'senha123', 'CITIZEN'),
('maria.santos@email.com', 'senha456', 'CITIZEN'),
('pedro.souza@email.com', 'senha789', 'CITIZEN'),
('ana.oliveira@email.com', 'senhaabc', 'CITIZEN'),
('carlos.fernandes@email.com', 'senhaxyz', 'CITIZEN'),
('admin1@prefeitura.com', 'adminpass', 'ADMIN'),
('lucia.lima@email.com', 'senha7890', 'CITIZEN'),
('marcos.pereira@email.com', 'senhaabc1', 'CITIZEN'),
('sofia.rodrigues@email.com', 'senhaxyz2', 'CITIZEN'),
('admin2@prefeitura.com', 'adminpass2', 'ADMIN'),
('bruno.costa@email.com', 'senha111', 'CITIZEN'),
('carla.almeida@email.com', 'senha222', 'CITIZEN');


INSERT INTO citizens (id, name, birth_date, cpf, phone, age, address_type, street, number, complement, neighborhood, cep) VALUES
(1, 'João Silva', '1985-03-15', '11122233344', '991234567', 39, 'Rua', 'das Flores', '100', 'Apto 101', 'Centro', '12345-000'),
(2, 'Maria Santos', '1990-07-22', '22233344455', '998765432', 34, 'Avenida', 'Principal', '250', NULL, 'Boa Vista', '54321-000'),
(3, 'Pedro Souza', '1978-11-01', '33344455566', '993456789', 46, 'Praça', 'da Liberdade', '15', NULL, 'Vila Nova', '09876-000'),
(4, 'Ana Oliveira', '1995-01-30', '44455566677', '992345678', 29, 'Rua', 'do Comércio', '300', 'Sala 5', 'Industrial', '67890-000'),
(5, 'Carlos Fernandes', '1980-05-10', '55566677788', '994567890', 44, 'Travessa', 'da Paz', '50', NULL, 'Jardim Primavera', '11223-000'),
(7, 'Lucia Lima', '1989-09-05', '66677788899', '995678901', 35, 'Rua', 'das Acácias', '75', 'Casa B', 'Parque das Árvores', '33445-000'),
(8, 'Marcos Pereira', '1992-04-18', '77788899900', '996789012', 32, 'Avenida', 'do Sol', '1200', 'Bloco C', 'Nascente', '98765-000'),
(9, 'Sofia Rodrigues', '1983-12-25', '88899900011', '997890123', 41, 'Alameda', 'dos Ipês', '20', NULL, 'Centro', '10112-000'),
(11, 'Bruno Costa', '1998-02-14', '99900011122', '998901234', 26, 'Rua', 'Sete', '45', 'Fundos', 'Cohab', '20230-000'),
(12, 'Carla Almeida', '1987-06-03', '00011122233', '990123456', 37, 'Avenida', 'Nove', '99', NULL, 'Alphaville', '30340-000');


INSERT INTO posts (title, content, description, location, category, status, user_id) VALUES
('Buraco na Rua', 'Existe um grande buraco na Rua das Flores, causando problemas aos veículos.', 'Perigo na via pública', 'Rua das Flores, Centro', 'COMPLAINT', 'OPEN', 1),
('Dúvida sobre IPTU', 'Gostaria de saber como consultar o valor do IPTU para o próximo ano.', NULL, NULL, 'QUESTION', 'OPEN', 2),
('Elogio ao Serviço de Limpeza', 'Parabéns à equipe de limpeza do bairro Vila Nova, excelente trabalho!', NULL, 'Vila Nova', 'COMPLIMENT', 'RESPONDED', 3),
('Denúncia de Descarte Irregular', 'Pessoas descartando lixo em terreno baldio na Rua do Comércio.', 'Lixo acumulado', 'Rua do Comércio, Industrial', 'DENUNCIATION', 'OPEN', 4),
('Requisição de Poda de Árvore', 'Solicito poda de árvore que está com galhos baixos na Travessa da Paz.', NULL, 'Travessa da Paz, Jardim Primavera', 'REQUEST', 'OPEN', 5),
('Problema com Iluminação Pública', 'Poste de luz queimado na Rua das Acácias, à noite fica muito escuro.', NULL, 'Rua das Acácias, Parque das Árvores', 'COMPLAINT', 'OPEN', 7),
('Sugestão para Parque', 'Proponho a instalação de mais bancos no parque da Avenida do Sol.', NULL, 'Parque da Avenida do Sol, Nascente', 'REQUEST', 'OPEN', 8),
('Dúvida sobre Horário de Ônibus', 'Qual o horário do ônibus que passa na Alameda dos Ipês?', NULL, NULL, 'QUESTION', 'RESPONDED', 9),
('Elogio ao Atendimento Online', 'O atendimento via chat da prefeitura foi muito eficiente. Ótimo trabalho!', NULL, NULL, 'COMPLIMENT', 'RESPONDED', 11),
('Denúncia de Barulho Excessivo', 'Vizinhos com som alto todos os dias após as 22h na Avenida Nove.', NULL, 'Avenida Nove, Alphaville', 'DENUNCIATION', 'OPEN', 12);


INSERT INTO post_media_urls (post_id, media_url) VALUES
(1, 'https://example.com/foto_buraco1.jpg'),
(1, 'https://example.com/foto_buraco2.png'),
(4, 'https://example.com/video_lixo.mp4'),
(7, 'https://example.com/foto_poste.jpg'),
(10, 'https://example.com/audio_barulho.mp3'),
(4, 'https://example.com/foto_lixo_2.jpg'),
(5, 'https://example.com/foto_arvore_1.jpg'),
(7, 'https://example.com/foto_poste_queimado.jpg'),
(8, 'https://example.com/foto_parque_sem_bancos.jpg'),
(1, 'https://example.com/video_buraco_carro.mp4');


INSERT INTO comments (content, post_id, user_id, parent_comment_id) VALUES
('Concordo, esse buraco está enorme!', 1, 2, NULL),
('Verdade! Quase caí de bicicleta lá.', 1, 3, NULL),
('Olá, você pode consultar o IPTU no portal da prefeitura, seção "Serviços ao Cidadão".', 2, 6, NULL),
('Isso é um absurdo, precisamos de fiscalização!', 4, 8, NULL),
('Obrigado pela informação! A equipe de limpeza é realmente boa.', 3, 1, NULL),
('Sim, o meu bairro também está sofrendo com a falta de iluminação.', 7, 9, NULL),
('Já abrimos uma ordem de serviço para a manutenção do poste.', 7, 6, NULL),
('Ótima sugestão! Apoio a iniciativa.', 8, 12, NULL),
('O ônibus passa a cada 30 minutos, das 06h às 23h.', 9, 6, NULL),
('Já denunciei algo parecido, é bem chato.', 10, 1, NULL),
('A prefeitura precisa tomar uma atitude urgente!', 1, 5, NULL);


INSERT INTO post_reactions (user_id, post_id, type) VALUES
(2, 1, 'SUPPORT'),
(3, 1, 'AGREE'),
(6, 3, 'RELEVANT'),
(1, 3, 'SUPPORT'),
(4, 5, 'URGENT'),
(7, 1, 'OUTRAGEOUS'),
(8, 8, 'SUPPORT'),
(9, 9, 'AGREE'),
(11, 3, 'SUPPORT'),
(12, 10, 'URGENT'),
(5, 4, 'OUTRAGEOUS'),
(1, 8, 'SUPPORT');


INSERT INTO comment_reactions (user_id, comment_id, type) VALUES
(1, 1, 'AGREE'),
(2, 3, 'SUPPORT'),
(4, 1, 'RELEVANT'),
(5, 5, 'URGENT'),
(7, 3, 'AGREE'),
(8, 6, 'OUTRAGEOUS'),
(9, 7, 'SUPPORT'),
(11, 8, 'RELEVANT'),
(12, 2, 'AGREE'),
(3, 5, 'OUTRAGEOUS'),
(1, 9, 'SUPPORT');

-- Procedures

CREATE OR REPLACE PROCEDURE register_new_user_and_citizen(
    p_email VARCHAR,
    p_password VARCHAR,
    p_name VARCHAR,
    p_birth_date DATE,
    p_cpf VARCHAR,
    p_phone VARCHAR,
    p_address_type VARCHAR,
    p_street VARCHAR,
    p_number VARCHAR,
    p_complement VARCHAR,
    p_neighborhood VARCHAR,
    p_cep VARCHAR
)
LANGUAGE plpgsql
AS $$
DECLARE
    new_user_id INT;
    calculated_age INT;
BEGIN
    INSERT INTO users (email, password, role)
    VALUES (p_email, p_password, 'CITIZEN')
    RETURNING id INTO new_user_id;

    SELECT EXTRACT(YEAR FROM AGE(p_birth_date)) INTO calculated_age;

    INSERT INTO citizens (id, name, birth_date, cpf, phone, age, address_type, street, number, complement, neighborhood, cep)
    VALUES (new_user_id, p_name, p_birth_date, p_cpf, p_phone, calculated_age, p_address_type, p_street, p_number, p_complement, p_neighborhood, p_cep);

    COMMIT;
END;
$$;

CREATE OR REPLACE PROCEDURE update_post_status(
    p_post_id INT,
    p_new_status VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE posts
    SET status = p_new_status
    WHERE id = p_post_id;
    COMMIT;
END;
$$;

CREATE OR REPLACE PROCEDURE delete_user_and_related_records(
    p_user_id INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM users WHERE id = p_user_id;
    COMMIT;
END;
$$;

-- Functions

CREATE OR REPLACE FUNCTION count_posts_by_category(
    p_category VARCHAR
)
RETURNS BIGINT
LANGUAGE plpgsql
AS $$
DECLARE
    post_count BIGINT;
BEGIN
    SELECT COUNT(*) INTO post_count
    FROM posts
    WHERE category = p_category;

    RETURN post_count;
END;
$$;

CREATE OR REPLACE FUNCTION get_citizen_age(
    p_birth_date DATE
)
RETURNS INT
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN EXTRACT(YEAR FROM AGE(p_birth_date));
END;
$$;

CREATE OR REPLACE FUNCTION check_email_exists(
    p_email VARCHAR
)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
DECLARE
    email_exists BOOLEAN;
BEGIN
    SELECT EXISTS (SELECT 1 FROM users WHERE email = p_email) INTO email_exists;
    RETURN email_exists;
END;
$$;

-- Triggers

CREATE OR REPLACE FUNCTION update_citizen_age_trigger_func()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.age = EXTRACT(YEAR FROM AGE(NEW.birth_date));
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS tg_update_citizen_age ON citizens;
CREATE TRIGGER tg_update_citizen_age
BEFORE INSERT OR UPDATE OF birth_date ON citizens
FOR EACH ROW
EXECUTE FUNCTION update_citizen_age_trigger_func();


CREATE OR REPLACE FUNCTION update_user_last_activity_func()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE users
    SET last_activity = NOW()
    WHERE id = NEW.user_id;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS tg_update_last_activity_post ON posts;
CREATE TRIGGER tg_update_last_activity_post
AFTER INSERT ON posts
FOR EACH ROW
EXECUTE FUNCTION update_user_last_activity_func();

DROP TRIGGER IF EXISTS tg_update_last_activity_comment ON comments;
CREATE TRIGGER tg_update_last_activity_comment
AFTER INSERT ON comments
FOR EACH ROW
EXECUTE FUNCTION update_user_last_activity_func();
