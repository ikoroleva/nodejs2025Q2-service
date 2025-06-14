# Home Library Service

A RESTful API service for managing a personal music library with user authentication, CRUD operations for artists, albums, tracks, and favorites management.

## Quick Start

1. Clone the repository

2. Install dependencies:
```bash
npm install
```

3. Set up environment:
   - Copy `.env.example` to `.env`
   - Fill in your own values in the `.env` file

4. Start the application and database using Docker Compose:
```bash
docker-compose up --build
```

5. Run database migrations:
```bash
npm run migration:run
```

### Docker Image Management
To push the images to DockerHub:
1. Login to DockerHub:
```bash
docker login
```
2. Build the images:
```bash
docker-compose build
```
3. Push the images:
```bash
docker push ${DOCKER_USERNAME}/home-library-app:latest
docker push ${DOCKER_USERNAME}/home-library-db:latest
```

The API will be available at http://localhost:4000. OpenAPI documentation is at http://localhost:4000/doc/

## API Overview

### Authentication
- POST /auth/signup - User registration
- POST /auth/login - User login
- POST /auth/refresh - Refresh user access token

### Main Endpoints
- Users: GET,POST /user, GET,PUT,DELETE /user/:id
- Artists: GET,POST /artist, GET,PUT,DELETE /artist/:id
- Albums: GET,POST /album, GET,PUT,DELETE /album/:id
- Tracks: GET,POST /track, GET,PUT,DELETE /track/:id
- Favorites: GET /favs, POST,DELETE /favs/{track|album|artist}/:id

## Data Models

### User
- id: UUID
- login: string
- password: string
- version: number
- createdAt: number
- updatedAt: number

### Artist
- id: UUID
- name: string
- grammy: boolean

### Album
- id: UUID
- name: string
- year: number
- artistId: UUID (nullable)

### Track
- id: UUID
- name: string
- artistId: UUID (nullable)
- albumId: UUID (nullable)
- duration: number

### Favorites
- id: UUID
- artistId: UUID (nullable)
- albumId: UUID (nullable)
- trackId: UUID (nullable)

## Development

### Prerequisites
- Node.js and npm
- Git

### Available Scripts
```bash
# Build and Start
npm run build
npm run start
npm run start:dev
npm run start:debug
npm run start:prod

# Testing
npm run test
npm run test:auth
npm run test:cov

# Code Quality
npm run format
npm run lint

# Database Migrations
npm run migration:generate
npm run migration:run
npm run migration:revert

# Docker Commands
npm run docker:up
npm run docker:stop
npm run docker:down
npm run docker:down:volumes
npm run docker:scan
```

### Error Handling
The API uses standard HTTP status codes:
- 400 Bad Request - Invalid input
- 401 Unauthorized - Authentication required
- 403 Forbidden - Invalid credentials
- 404 Not Found - Resource not found
- 409 Conflict - Resource exists
- 422 Unprocessable Entity - Invalid reference
