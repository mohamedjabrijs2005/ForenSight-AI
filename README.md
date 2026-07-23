# ForenSight AI - Crime Analytics Platform

ForenSight AI is an enterprise-grade AI-Driven Crime Analytics & Visualization Platform designed for government agencies and law enforcement.

## 🚀 Tech Stack
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Shadcn UI, Framer Motion
- **Backend**: FastAPI, SQLAlchemy, Pydantic, PostgreSQL + PostGIS, Redis
- **AI/ML**: Python (Scikit-learn, XGBoost, LSTM)
- **Infrastructure**: Docker, Docker Compose

## 🛠️ Getting Started

### Prerequisites
- Docker & Docker Compose
- Node.js (for local frontend development)
- Python 3.11+ (for local backend development)

### Quick Start (Docker)
To run the entire stack (Database, API, Frontend):
```bash
docker-compose up --build
```
The application will be available at `http://localhost:5173`

### Local Frontend Development
```bash
cd frontend
npm install
npm run dev
```

### Local Backend Development
Ensure you have a C compiler (MSVC on Windows, GCC on Linux) to build data science dependencies.
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## 🏗️ Monorepo Structure
- `/frontend`: React application containing the Command Center, Digital Twin, and GIS Maps.
- `/backend`: FastAPI service for routing, AI integrations, and background tasks.
- `docker-compose.yml`: Local infrastructure deployment.
