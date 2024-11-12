# Analytics Service [alpha]

A high-performance analytics service built with Node.js, Redis, and PostgreSQL, capable of handling millions of requests per hour.

## Features

- Real-time event tracking
- 90-day rolling analytics data
- Redis-based caching for high performance
- PostgreSQL for persistent storage
- Docker-based development environment
- Built with TypeScript for type safety

## Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- npm or yarn

## Quick Start

1. Clone the repository:

```bash
git clone https://github.com/jarrettbarnett/node-analytics.git
cd node-analytics
```

2. Copy the environment file:

```bash
cp .env.example .env
```

3. Install dependencies:

```bash
npm install
```

3. Start the services:

```bash
npm run docker:up
```

The following services will be available:
- Analytics API: http://localhost:3000
- Redis Commander: http://localhost:8081
- pgAdmin: http://localhost:8082 (login: admin@admin.com / password: admin)

## Development

### Project Structure

```
analytics-service/
├── src/
│ ├── config/ # Configuration files
│ ├── controllers/ # Request handlers
│ ├── models/ # Data models
│ ├── services/ # Business logic
│ ├── routes/ # API routes
│ ├── utils/ # Utilities
│ └── app.ts # Application entry
├── prisma/ # Database schema
├── tests/ # Test files
└── docker-compose.yml # Docker services
```

### Available Scripts

- `npm run dev`: Start development server with hot reload
- `npm run build`: Build the TypeScript project
- `npm run start`: Start the production server
- `npm test`: Run tests
- `npm run docker:up`: Start all Docker services
- `npm run docker:down`: Stop all Docker services
- `npm run docker:clean`: Stop services and remove volumes
- `npm run prisma:generate`: Generate Prisma client
- `npm run prisma:migrate`: Run database migrations

### API Usage

Track an event:
```bash
curl -X POST http://localhost:3000/analytics/event \
-H "Content-Type: application/json" \
-d '{
"eventType": "page_view",
"userId": "user123",
"metadata": {
"page": "/home",
"referrer": "google.com"
    }
}'
```

### Get statistics

```bash
curl http://localhost:3000/analytics/stats?eventType=page_view&days=30
```

## Database Management

### PostgreSQL

Connect to PostgreSQL using pgAdmin:
1. Access http://localhost:8082
2. Login with admin@admin.com / admin
3. Add new server:
   - Host: postgres
   - Port: 5432
   - Database: analytics
   - Username: user
   - Password: password

### Redis

Monitor Redis using Redis Commander:
1. Access http://localhost:8081
2. Browse keys and data directly in the web interface

## Testing

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

## Debugging

To view service logs:

```bash
docker-compose logs -f
```

All services

```bash
docker-compose logs -f
```

Specific service

```bash
docker-compose logs -f app
```

Access Redis:

```bash
docker-compose exec redis redis-cli
```

Access PostgreSQL:

```bash
docker-compose exec postgres psql -U user -d analytics
```

## Production Deployment

For production deployment:

1. Update environment variables:
   - Set `NODE_ENV=production`
   - Use secure passwords
   - Configure proper Redis and PostgreSQL settings

2. Build the production image:

```bash
docker build -t analytics-service:prod .
```
