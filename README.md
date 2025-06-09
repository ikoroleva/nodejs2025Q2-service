# Home Library Service

A RESTful API service for managing a personal music library with user authentication, CRUD operations for artists, albums, tracks, and favorites management.

## Quick Start

### Option 1: Local Development
1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Set up environment:
   - Copy `.env.example` to `.env`
   - Fill in your own values in the `.env` file
4. Start the server:
```bash
npm run start:dev
```

### Option 2: Docker Development
1. Clone the repository
2. Set up environment:
   - Copy `.env.example` to `.env`
   - Fill in your own values in the `.env` file
3. Start the development environment:
```bash
docker-compose -f docker-compose.dev.yml up --build
```

### Option 3: Docker Production
1. Clone the repository
2. Set up environment:
   - Copy `.env.example` to `.env`
   - Fill in your own values in the `.env` file
3. Build and start the production environment:
```bash
docker-compose up --build
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
- POST /login - User login
- POST /signup - User registration

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
# Start development server
npm run start:dev

# Run tests
npm run test
npm run test:e2e

# Lint and format
npm run lint
npm run format
```

### Error Handling
The API uses standard HTTP status codes:
- 400 Bad Request - Invalid input
- 401 Unauthorized - Authentication required
- 403 Forbidden - Invalid credentials
- 404 Not Found - Resource not found
- 409 Conflict - Resource exists
- 422 Unprocessable Entity - Invalid reference

## License

This project is licensed under the MIT License.
