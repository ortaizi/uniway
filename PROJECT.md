# 🎓 Uniway Project Documentation

## 📁 Project Structure
```
uniway/
├── backend/
│   ├── app/
│   │   ├── core/           # Core functionality
│   │   ├── api/           # API endpoints
│   │   ├── models/        # Database models
│   │   └── services/      # Business logic
│   ├── alembic/           # Database migrations
│   ├── tests/             # Test suite
│   └── scripts/           # Utility scripts
├── frontend/
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   └── services/      # API services
│   └── public/            # Static assets
└── infra/                 # Infrastructure code
```

## 🛠️ Technology Stack

### Backend
- FastAPI
- PostgreSQL
- SQLAlchemy
- Alembic
- Selenium
- psutil

### Frontend
- React
- Vite
- Tailwind CSS
- React Router

### Infrastructure
- Docker
- Docker Compose
- GitHub Actions

## 🔑 Key Components

### Authentication
- Moodle integration
- Session management
- Password encryption

### Data Models
- User
- Assignment
- Course
- Event

### API Endpoints
- `/api/v1/auth/*`
- `/api/v1/assignments/*`
- `/health`
- `/ping`

## ⚙️ Configuration

### Environment Variables
```env
DATABASE_URL=postgresql://user:pass@localhost:5432/db
FRONTEND_URL=http://localhost:5173
MOODLE_URL=https://moodle.example.com
CHROME_PATH=/path/to/chrome
SECRET_KEY=your-secret-key
FERNET_SECRET_KEY=your-fernet-key
```

### Docker Services
- PostgreSQL
- pgAdmin
- Backend API
- Frontend Dev Server

## 🚀 Development

### Setup
1. Clone repository
2. Copy `.env.example` to `.env`
3. Run `make start-dev`

### Commands
- `make backend` - Start backend
- `make frontend` - Start frontend
- `make test` - Run tests
- `make db-up` - Start database
- `make db-down` - Stop database

## 🔒 Security

### Authentication
- Session-based auth
- Fernet encryption
- CORS protection

### Data Protection
- Password hashing
- Environment variables
- Secure headers

## 📊 Monitoring

### Health Checks
- Database connectivity
- System resources
- Environment validation

### Logging
- Application logs
- Error tracking
- Performance metrics

## 🧪 Testing

### Backend Tests
- Unit tests
- Integration tests
- API tests

### Frontend Tests
- Component tests
- Integration tests
- E2E tests

## 📈 Deployment

### Backend
- Docker container
- EC2 instance
- Auto-scaling

### Frontend
- Netlify
- CDN
- CI/CD pipeline 