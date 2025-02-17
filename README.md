# GitHub PR Viewer

A simple React application to fetch and display GitHub pull requests with filtering and pagination.

## 🚀 Setup & Run Locally

### 1️⃣ Prerequisites
- **Node.js** (v18+)
- **Docker** (if running inside a container)

### 2️⃣ Clone the Repository
```sh
git clone https://github.com/valaydesai3/github-pr-viewer.git
cd github-pr-viewer
```
### 3️⃣ Install Dependencies
```sh
npm install
```

### 4️⃣ Setup Environment Variables
- Create a .env file in the root directory:
```sh
VITE_API_URL=http://localhost:5000
```

### 5️⃣ Run the application
```sh
npm run dev
```

### ✅ Running Tests
```sh
npm run test
```
### 🎯 Linting
```sh
npm run lint
```

### 🐋 Docker Setup (optional)
```sh
docker build -t github-pr-viewer .

docker run -d -p 3000:80 --name github-pr-viewer github-pr-viewer-dev
```