-- Definição dos tipos ENUM
CREATE TYPE papel_enum AS ENUM ('CIDADAO', 'ADMIN');
CREATE TYPE categoria_enum AS ENUM ('RECLAMACAO', 'DUVIDA', 'REQUISICAO', 'ELOGIO', 'DENUNCIA');
CREATE TYPE status_enum AS ENUM ('ABERTO', 'EM AVALIACAO', 'RESPONDIDO', 'FECHADO', 'ARQUIVADO');
CREATE TYPE tipo_reacao_enum AS ENUM ('Concordo', 'Apoio', 'Revoltante', 'Urgente', 'Relevante');

-- Criação das Tabelas

CREATE TABLE Usuario (
    id SERIAL PRIMARY KEY, -- Identificador único do usuário
    email VARCHAR(255) UNIQUE NOT NULL, -- Email único para login
    senha VARCHAR(255) NOT NULL,
    papel papel_enum NOT NULL, -- Define o tipo de usuário (CIDADÃO ou ADMIN)
    ultima_atividade TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Cidadao (
    id INT PRIMARY KEY, -- Chave primária e estrangeira para Usuario (especialização)
    nome VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    cpf VARCHAR(11) UNIQUE NOT NULL, -- CPF único para cada cidadão
    telefone VARCHAR(20),
    idade INT, -- Idade calculada por trigger
    tipo_logradouro VARCHAR(50) NOT NULL, -- Tipo de logradouro (Rua, Avenida, etc.)
    logradouro VARCHAR(255) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    complemento VARCHAR(255),
    bairro VARCHAR(255) NOT NULL,
    cep VARCHAR(9) NOT NULL,
    CONSTRAINT fk_cidadao_usuario FOREIGN KEY (id) REFERENCES Usuario(id) ON DELETE CASCADE
);

CREATE TABLE Post (
    id SERIAL PRIMARY KEY, -- Identificador único do post
    id_usuario INT NOT NULL, -- Usuário que criou o post
    titulo VARCHAR(255) NOT NULL,
    texto TEXT,
    descricao TEXT,
    localizacao VARCHAR(255),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    categoria categoria_enum NOT NULL, -- Categoria do post (ENUM)
    status status_enum NOT NULL, -- Status atual do post (ENUM)
    CONSTRAINT fk_post_usuario FOREIGN KEY (id_usuario) REFERENCES Usuario(id) ON DELETE CASCADE
);

CREATE TABLE Midia_Post (
    id SERIAL PRIMARY KEY, -- Identificador único da mídia
    id_post INT NOT NULL, -- Post ao qual a mídia pertence
    url_midia VARCHAR(255) NOT NULL,
    CONSTRAINT fk_midia_post FOREIGN KEY (id_post) REFERENCES Post(id) ON DELETE CASCADE
);

CREATE TABLE Comentario (
    id SERIAL PRIMARY KEY, -- Identificador único do comentário
    id_post INT NOT NULL, -- Post ao qual o comentário pertence
    id_usuario INT NOT NULL, -- Usuário que fez o comentário
    id_comentario_pai INT, -- Comentário pai (para hierarquia de comentários)
    texto TEXT NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_comentario_post FOREIGN KEY (id_post) REFERENCES Post(id) ON DELETE CASCADE,
    CONSTRAINT fk_comentario_usuario FOREIGN KEY (id_usuario) REFERENCES Usuario(id) ON DELETE CASCADE,
    CONSTRAINT fk_comentario_pai FOREIGN KEY (id_comentario_pai) REFERENCES Comentario(id) ON DELETE CASCADE
);

CREATE TABLE Reacao_Post (
    id_usuario INT NOT NULL, -- Usuário que fez a reação
    id_post INT NOT NULL, -- Post que recebeu a reação
    tipo tipo_reacao_enum NOT NULL, -- Tipo de reação (ENUM)
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_usuario, id_post), -- Garante uma reação por usuário por post
    CONSTRAINT fk_reacao_post_usuario FOREIGN KEY (id_usuario) REFERENCES Usuario(id) ON DELETE CASCADE,
    CONSTRAINT fk_reacao_post_post FOREIGN KEY (id_post) REFERENCES Post(id) ON DELETE CASCADE
);

CREATE TABLE Reacao_Comentario (
    id_usuario INT NOT NULL, -- Usuário que fez a reação
    id_comentario INT NOT NULL, -- Comentário que recebeu a reação
    tipo tipo_reacao_enum NOT NULL, -- Tipo de reação (ENUM)
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_usuario, id_comentario), -- Garante uma reação por usuário por comentário
    CONSTRAINT fk_reacao_comentario_usuario FOREIGN KEY (id_usuario) REFERENCES Usuario(id) ON DELETE CASCADE,
    CONSTRAINT fk_reacao_comentario_comentario FOREIGN KEY (id_comentario) REFERENCES Comentario(id) ON DELETE CASCADE
);

-- Foram criados índices em colunas frequentemente usadas em
-- cláusulas WHERE, JOINs e para garantir a unicidade de valores.

CREATE UNIQUE INDEX idx_usuario_email ON Usuario (email);
CREATE UNIQUE INDEX idx_cidadao_cpf ON Cidadao (cpf);
CREATE INDEX idx_post_id_usuario ON Post (id_usuario);
CREATE INDEX idx_comentario_id_post ON Comentario (id_post);
CREATE INDEX idx_comentario_id_usuario ON Comentario (id_usuario);

INSERT INTO Usuario (email, senha, papel) VALUES
('joao.silva@email.com', 'senha123', 'CIDADAO'),
('maria.santos@email.com', 'senha456', 'CIDADAO'),
('pedro.souza@email.com', 'senha789', 'CIDADAO'),
('ana.oliveira@email.com', 'senhaabc', 'CIDADAO'),
('carlos.fernandes@email.com', 'senhaxyz', 'CIDADAO'),
('admin1@prefeitura.com', 'adminpass', 'ADMIN'),
('lucia.lima@email.com', 'senha7890', 'CIDADAO'),
('marcos.pereira@email.com', 'senhaabc1', 'CIDADAO'),
('sofia.rodrigues@email.com', 'senhaxyz2', 'CIDADAO'),
('admin2@prefeitura.com', 'adminpass2', 'ADMIN'),
('bruno.costa@email.com', 'senha111', 'CIDADAO'),
('carla.almeida@email.com', 'senha222', 'CIDADAO');


INSERT INTO Cidadao (id, nome, data_nascimento, cpf, telefone, idade, tipo_logradouro, logradouro, numero, complemento, bairro, cep) VALUES
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


INSERT INTO Post (id_usuario, titulo, texto, descricao, localizacao, categoria, status) VALUES
(1, 'Buraco na Rua', 'Existe um grande buraco na Rua das Flores, causando problemas aos veículos.', 'Perigo na via pública', 'Rua das Flores, Centro', 'RECLAMACAO', 'ABERTO'),
(2, 'Dúvida sobre IPTU', 'Gostaria de saber como consultar o valor do IPTU para o próximo ano.', NULL, NULL, 'DUVIDA', 'EM AVALIACAO'),
(3, 'Elogio ao Serviço de Limpeza', 'Parabéns à equipe de limpeza do bairro Vila Nova, excelente trabalho!', NULL, 'Vila Nova', 'ELOGIO', 'RESPONDIDO'),
(4, 'Denúncia de Descarte Irregular', 'Pessoas descartando lixo em terreno baldio na Rua do Comércio.', 'Lixo acumulado', 'Rua do Comércio, Industrial', 'DENUNCIA', 'ABERTO'),
(5, 'Requisição de Poda de Árvore', 'Solicito poda de árvore que está com galhos baixos na Travessa da Paz.', NULL, 'Travessa da Paz, Jardim Primavera', 'REQUISICAO', 'EM AVALIACAO'),
(7, 'Problema com Iluminação Pública', 'Poste de luz queimado na Rua das Acácias, à noite fica muito escuro.', NULL, 'Rua das Acácias, Parque das Árvores', 'RECLAMACAO', 'ABERTO'),
(8, 'Sugestão para Parque', 'Proponho a instalação de mais bancos no parque da Avenida do Sol.', NULL, 'Parque da Avenida do Sol, Nascente', 'REQUISICAO', 'ABERTO'),
(9, 'Dúvida sobre Horário de Ônibus', 'Qual o horário do ônibus que passa na Alameda dos Ipês?', NULL, NULL, 'DUVIDA', 'RESPONDIDO'),
(11, 'Elogio ao Atendimento Online', 'O atendimento via chat da prefeitura foi muito eficiente. Ótimo trabalho!', NULL, NULL, 'ELOGIO', 'FECHADO'),
(12, 'Denúncia de Barulho Excessivo', 'Vizinhos com som alto todos os dias após as 22h na Avenida Nove.', NULL, 'Avenida Nove, Alphaville', 'DENUNCIA', 'ABERTO');


INSERT INTO Midia_Post (id_post, url_midia) VALUES
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


INSERT INTO Comentario (id_post, id_usuario, id_comentario_pai, texto) VALUES
(1, 2, NULL, 'Concordo, esse buraco está enorme!'),
(1, 3, 1, 'Verdade! Quase caí de bicicleta lá.'),
(2, 6, NULL, 'Olá, você pode consultar o IPTU no portal da prefeitura, seção "Serviços ao Cidadão".'),
(4, 8, NULL, 'Isso é um absurdo, precisamos de fiscalização!'),
(3, 1, NULL, 'Obrigado pela informação! A equipe de limpeza é realmente boa.'),
(7, 9, NULL, 'Sim, o meu bairro também está sofrendo com a falta de iluminação.'),
(7, 6, 6, 'Já abrimos uma ordem de serviço para a manutenção do poste.'),
(8, 12, NULL, 'Ótima sugestão! Apoio a iniciativa.'),
(9, 6, NULL, 'O ônibus passa a cada 30 minutos, das 06h às 23h.'),
(10, 1, NULL, 'Já denunciei algo parecido, é bem chato.'),
(1, 5, 2, 'A prefeitura precisa tomar uma atitude urgente!');


INSERT INTO Reacao_Post (id_usuario, id_post, tipo) VALUES
(2, 1, 'Apoio'),
(3, 1, 'Concordo'),
(6, 3, 'Relevante'),
(1, 3, 'Apoio'),
(4, 5, 'Urgente'),
(7, 1, 'Revoltante'),
(8, 8, 'Apoio'),
(9, 9, 'Concordo'),
(11, 3, 'Apoio'),
(12, 10, 'Urgente'),
(5, 4, 'Revoltante'),
(1, 8, 'Apoio');


INSERT INTO Reacao_Comentario (id_usuario, id_comentario, tipo) VALUES
(1, 1, 'Concordo'),
(2, 3, 'Apoio'),
(4, 1, 'Relevante'),
(5, 4, 'Urgente'),
(7, 3, 'Concordo'),
(8, 6, 'Revoltante'),
(9, 7, 'Apoio'),
(11, 8, 'Relevante'),
(12, 2, 'Concordo'),
(3, 4, 'Revoltante'),
(1, 9, 'Apoio');

-- Procedures

CREATE OR REPLACE PROCEDURE cadastrar_novo_usuario_e_cidadao(
    p_email VARCHAR,
    p_senha VARCHAR,
    p_nome VARCHAR,
    p_data_nascimento DATE,
    p_cpf VARCHAR,
    p_telefone VARCHAR,
    p_tipo_logradouro VARCHAR,
    p_logradouro VARCHAR,
    p_numero VARCHAR,
    p_complemento VARCHAR,
    p_bairro VARCHAR,
    p_cep VARCHAR
)
LANGUAGE plpgsql
AS $$
DECLARE
    new_user_id INT;
    calculated_age INT;
BEGIN
    INSERT INTO Usuario (email, senha, papel)
    VALUES (p_email, p_senha, 'CIDADAO')
    RETURNING id INTO new_user_id;

    SELECT EXTRACT(YEAR FROM AGE(p_data_nascimento)) INTO calculated_age;

    INSERT INTO Cidadao (id, nome, data_nascimento, cpf, telefone, idade, tipo_logradouro, logradouro, numero, complemento, bairro, cep)
    VALUES (new_user_id, p_nome, p_data_nascimento, p_cpf, p_telefone, calculated_age, p_tipo_logradouro, p_logradouro, p_numero, p_complemento, p_bairro, p_cep);

    COMMIT;
END;
$$;

CREATE OR REPLACE PROCEDURE atualizar_status_post(
    p_id_post INT,
    p_novo_status status_enum
)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE Post
    SET status = p_novo_status
    WHERE id = p_id_post;
    COMMIT;
END;
$$;

CREATE OR REPLACE PROCEDURE deletar_usuario_e_registros_relacionados(
    p_id_usuario INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    DELETE FROM Usuario WHERE id = p_id_usuario;
    COMMIT;
END;
$$;

-- Functions

CREATE OR REPLACE FUNCTION contar_posts_por_categoria(
    p_categoria categoria_enum
)
RETURNS BIGINT
LANGUAGE plpgsql
AS $$
DECLARE
    post_count BIGINT;
BEGIN
    SELECT COUNT(*) INTO post_count
    FROM Post
    WHERE categoria = p_categoria;

    RETURN post_count;
END;
$$;

CREATE OR REPLACE FUNCTION obter_idade_cidadao(
    p_data_nascimento DATE
)
RETURNS INT
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN EXTRACT(YEAR FROM AGE(p_data_nascimento));
END;
$$;

CREATE OR REPLACE FUNCTION verificar_email_existente(
    p_email VARCHAR
)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
DECLARE
    email_exists BOOLEAN;
BEGIN
    SELECT EXISTS (SELECT 1 FROM Usuario WHERE email = p_email) INTO email_exists;
    RETURN email_exists;
END;
$$;

-- Triggers

CREATE OR REPLACE FUNCTION atualizar_idade_cidadao_trigger_func()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.idade = EXTRACT(YEAR FROM AGE(NEW.data_nascimento));
    RETURN NEW;
END;
$$;

CREATE TRIGGER tg_atualizar_idade_cidadao
BEFORE INSERT OR UPDATE OF data_nascimento ON Cidadao
FOR EACH ROW
EXECUTE FUNCTION atualizar_idade_cidadao_trigger_func();


CREATE OR REPLACE FUNCTION atualizar_ultima_atividade_usuario_func()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE Usuario
    SET ultima_atividade = NOW()
    WHERE id = NEW.id_usuario;
    RETURN NEW;
END;
$$;

CREATE TRIGGER tg_atualizar_ultima_atividade_post
AFTER INSERT ON Post
FOR EACH ROW
EXECUTE FUNCTION atualizar_ultima_atividade_usuario_func();

CREATE TRIGGER tg_atualizar_ultima_atividade_comentario
AFTER INSERT ON Comentario
FOR EACH ROW
EXECUTE FUNCTION atualizar_ultima_atividade_usuario_func();
