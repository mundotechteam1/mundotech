# 🌐 Mundo Tech — Periódico Digital API

API REST para el periódico digital **Mundo Tech**, donde autores crean artículos y managers los revisan y publican.

## 📋 Briefing

Proyecto backend desarrollado con **Spring Boot 3** que implementa un sistema de gestión de artículos periodísticos con control de roles (author/manager), flujo de revisión y estados de publicación.

## 🛠️ Tecnologías

| Tecnología | Versión |
|---|---|
| Java | 21 |
| Spring Boot | 3.5.16 |
| PostgreSQL | — |
| Maven | 3.9.16 |
| Lombok | — |

## 🗄️ Modelo de Base de Datos

```mermaid
erDiagram
    USERS {
        bigint id PK
        varchar name
        varchar email
        varchar password
    }

    ROLES {
        bigint id PK
        varchar name
    }

    ARTICLES {
        bigint id PK
        varchar title
        text content
        timestamp created_at
        timestamp updated_at
        varchar status
        bigint author_id FK
    }

    USER_ROLES {
        bigint user_id FK
        bigint role_id FK
    }

    USERS ||--o{ ARTICLES : "escribe"
    USERS }o--o{ ROLES : "tiene"
    USER_ROLES }o--|| USERS : "pertenece"
    USER_ROLES }o--|| ROLES : "asigna"
```

### Relaciones

- **Article → User**: Many-to-One (un autor tiene muchos artículos, un artículo pertenece a un solo autor)
- **User → Role**: Many-to-Many (un usuario puede tener varios roles, un rol puede pertenecer a varios usuarios)

## 📡 Endpoints de la API

### Roles `/api/roles`

| Método | Ruta | Descripción | Código |
|---|---|---|---|
| `POST` | `/api/roles` | Crear rol | `201` |
| `GET` | `/api/roles` | Listar roles | `200` |
| `GET` | `/api/roles/{id}` | Obtener rol | `200` |

### Usuarios `/api/users`

| Método | Ruta | Descripción | Código |
|---|---|---|---|
| `POST` | `/api/users` | Crear usuario | `201` |
| `GET` | `/api/users` | Listar usuarios | `200` |
| `GET` | `/api/users/{id}` | Obtener usuario | `200` |
| `DELETE` | `/api/users/{id}` | Eliminar usuario (cascada artículos) | `204` |
| `POST` | `/api/users/{userId}/roles/{roleId}` | Asignar rol a usuario | `200` |

### Artículos `/api/articles`

| Método | Ruta | Descripción | Código |
|---|---|---|---|
| `POST` | `/api/articles?authorId=X` | Crear artículo (DRAFT) | `201` |
| `GET` | `/api/articles` | Listar todos | `200` |
| `GET` | `/api/articles/{id}` | Obtener por ID | `200` |
| `GET` | `/api/articles/author/{authorId}` | Buscar por autor | `200` |
| `PUT` | `/api/articles/{id}?authorId=X` | Actualizar contenido (solo autor) | `200` |
| `DELETE` | `/api/articles/{id}?authorId=X` | Eliminar (solo autor) | `204` |
| `PUT` | `/api/articles/{id}/send-review?authorId=X` | Enviar a revisión → IN_REVIEW | `200` |
| `PUT` | `/api/articles/{id}/approve?managerId=X` | Aprobar → PUBLISHED (solo manager) | `200` |
| `GET` | `/api/articles/status/draft` | Listar DRAFT | `200` |
| `GET` | `/api/articles/status/in-review` | Listar IN_REVIEW | `200` |
| `GET` | `/api/articles/status/published` | Listar PUBLISHED | `200` |

## 🔄 Flujo de Estados

```mermaid
stateDiagram-v2
    [*] --> DRAFT
    DRAFT --> IN_REVIEW: autor envía a revisión
    IN_REVIEW --> PUBLISHED: manager aprueba
    PUBLISHED --> [*]
```

## 🧪 Pruebas con Postman

### Setup inicial

1. Crear la base de datos en PostgreSQL:
   ```sql
   CREATE DATABASE mundotech;
   ```

2. Configurar credenciales en `application.properties` si es necesario

3. Ejecutar la aplicación:
   ```bash
   ./mvnw spring-boot:run
   ```

### Orden de pruebas recomendado

1. **Crear roles** → `POST /api/roles` con `{"name": "author"}` y luego con `{"name": "manager"}`
2. **Crear usuarios** → `POST /api/users`
3. **Asignar roles** → `POST /api/users/{userId}/roles/{roleId}`
4. **Crear artículos** → `POST /api/articles?authorId=X`
5. **Probar flujo completo** → crear → enviar a revisión → aprobar

## 📁 Estructura del Proyecto

```
src/main/java/com/femcoders/mundotech/
├── MundotechApplication.java
├── entity/
│   ├── Article.java
│   ├── ArticleStatus.java
│   ├── Role.java
│   └── User.java
├── repository/
│   ├── ArticleRepository.java
│   ├── RoleRepository.java
│   └── UserRepository.java
├── service/
│   ├── ArticleService.java
│   ├── RoleService.java
│   └── UserService.java
└── controller/
    ├── ArticleController.java
    ├── RoleController.java
    └── UserController.java
```
