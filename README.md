# PIBD_Application

Aplicação do projeto conceitual da matéria Projeto e Implementação de Banco de Dados

## 📋 Descrição

Sistema de Portal do Cidadão que permite aos usuários criar publicações, reagir a posts, comentar e interagir com a prefeitura através de diferentes categorias como reclamações, dúvidas, requisições, elogios e denúncias.

## 🏗️ Arquitetura do Sistema

O sistema segue uma arquitetura com separação clara entre frontend e backend:

### Backend (Spring Boot)

### Frontend (React + TypeScript)

## 🛠️ Tecnologias Utilizadas

### Backend
- **Java 17**
- **Spring Boot 3.5.3**
- **Spring Data JPA**
- **Maven**
- **Bean Validation**
- **Spring Boot Docker Compose** (opcional)

### Frontend
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Axios**
- **Vite**

### Banco de Dados
- **PostgreSQL**
- **JPA/Hibernate**

## 📁 Estrutura do Projeto

```
PIBD_Application/
├── backend/
│   ├── src/main/java/pibd/application/
│   │   ├── api/controller/          # Controllers REST
│   │   ├── application/
│   │   │   ├── dto/                 # Data Transfer Objects
│   │   │   └── service/             # Serviços de aplicação
│   │   ├── domain/
│   │   │   ├── enums/               # Enumerações
│   │   │   ├── model/               # Entidades de domínio
│   │   │   └── utils/               # Classes utilitárias
│   │   └── infra/persistence/jpa/   # Repositórios JPA
│   ├── db/
│   │   └── db.sql                   # Script de criação do banco
│   ├── docker-compose.yml           # Configuração Docker (opcional)
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── components/              # Componentes React
│   │   ├── services/                # Serviços de API
│   │   ├── types/                   # Definições TypeScript
│   │   └── App.tsx                  # Componente principal
│   └── package.json
└── README.md
```

## 🚀 Como Executar

### Pré-requisitos
- Java 17 ou superior
- Node.js 16 ou superior
- PostgreSQL 12 ou superior (ou Docker)
- Maven

### Opção 1: Usando Docker (Recomendado para desenvolvimento)

#### 1. Configuração do Banco de Dados com Docker

1. Navegue para o diretório do backend:
```bash
cd backend
```

2. Execute o Docker Compose para subir o PostgreSQL:
```bash
docker-compose up -d
```

O banco estará disponível em:
- **Host**: localhost:5432
- **Database**: db
- **Username**: user
- **Password**: password

#### 2. Configuração do Backend

1. O `application.properties` já está configurado para o Docker:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/db
spring.datasource.username=user
spring.datasource.password=password
```

2. Execute o script de criação das tabelas:
```bash
psql -h localhost -U user -d db -f db/db.sql
```

3. Execute o backend:
```bash
mvn spring-boot:run
```

**Nota**: O Spring Boot detecta automaticamente o `docker-compose.yml` e inicia o PostgreSQL automaticamente se o Docker estiver disponível.

### Opção 2: Usando PostgreSQL Local

#### 1. Configuração do Banco de Dados Local

1. Crie um banco PostgreSQL:
```sql
CREATE DATABASE pibd_application;
```

2. Execute o script de criação das tabelas:
```bash
psql -d pibd_application -f backend/db/db.sql
```

#### 2. Configuração do Backend

1. Navegue para o diretório do backend:
```bash
cd backend
```

2. Configure as credenciais do banco no `application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/pibd_application
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
```

3. Execute o backend:
```bash
mvn spring-boot:run
```

O backend estará disponível em: `http://localhost:8080`

### 3. Configuração do Frontend

1. Navegue para o diretório do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o frontend:
```bash
npm run dev
```

O frontend estará disponível em: `http://localhost:5173`

## 📊 Funcionalidades

### Usuários
- ✅ Criação de publicações
- ✅ Reações a posts (Concordo, Apoio, Revoltante, Urgente, Relevante)
- ✅ Comentários em posts
- ✅ Visualização de posts por categoria

### Categorias de Posts
- **Reclamação**: Problemas e queixas
- **Dúvida**: Perguntas e esclarecimentos
- **Requisição**: Solicitações de serviços
- **Elogio**: Reconhecimentos positivos
- **Denúncia**: Reportes de irregularidades

### Status dos Posts
- **Aberto**: Post criado e aguardando análise
- **Em Avaliação**: Post sendo analisado
- **Respondido**: Post com resposta oficial
- **Fechado**: Post finalizado
- **Arquivado**: Post arquivado

## 🔧 Configurações Adicionais

### CORS
O backend está configurado para aceitar requisições do frontend através do `WebConfig` que permite CORS de qualquer origem.

### Usuário Mock
O frontend utiliza um usuário mock (ID: 1) para simular autenticação. Em produção, isso seria substituído por um sistema de autenticação real.

### Docker Compose (Opcional)
- A dependência `spring-boot-docker-compose` é **opcional** e configurada como `<optional>true</optional>`
- Se o Docker estiver disponível e o arquivo `docker-compose.yml` existir, o Spring Boot inicia automaticamente os serviços
- Se não estiver disponível, o Spring Boot usa a configuração normal do `application.properties`
- **Não há problema** para quem usa PostgreSQL local - a dependência é ignorada automaticamente

## 📋 **Principais Mudanças Aplicadas:**

### ✅ **Correções Realizadas:**

1. **Estrutura do Projeto**: Corrigido o caminho de `backend/sql/db.sql` para `backend/db/db.sql`
2. **Adicionado Docker Compose**: Incluído na estrutura do projeto
3. **Versão do Spring Boot**: Atualizada para 3.5.3 (conforme pom.xml)
4. **Dependência Docker**: Adicionada nas tecnologias com indicação de ser opcional

### ✅ **Novas Seções:**

1. **Opção 1: Docker** - Setup completo com Docker Compose
2. **Opção 2: PostgreSQL Local** - Setup tradicional
3. **Categorias de Posts** - Explicação das categorias disponíveis
4. **Status dos Posts** - Explicação dos status possíveis
5. **Docker Compose (Opcional)** - Explicação detalhada sobre a dependência opcional

### ✅ **Melhorias:**

1. **Flexibilidade**: Documentação para ambos os cenários (Docker e Local)
2. **Clareza**: Explicação de que a dependência Docker é opcional
3. **Completude**: Todas as funcionalidades documentadas
4. **Precisão**: Caminhos corretos e configurações atualizadas

Agora o README está completo e preciso, explicando claramente que **não há problema** para quem usa PostgreSQL local, pois a dependência do Docker Compose é opcional e bem configurada!

## 📋 Notas de Desenvolvimento

- O sistema utiliza validação Bean Validation no backend
- O frontend implementa validação client-side
- Os posts podem ter descrições opcionais
- O sistema suporta múltiplas reações por usuário (uma por post)
- As reações podem ser alteradas pelo usuário
- Configuração flexível que funciona tanto com Docker quanto com PostgreSQL local
