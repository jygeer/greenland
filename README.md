# 🇬🇱 Greenland Simulation

A comprehensive web application that simulates the country of Greenland, featuring a Rust-powered backend API and a React-based frontend interface.

## 🌟 Features

- **Rich REST API** - Comprehensive endpoints providing data about Greenland
- **React Frontend** - Interactive and beautiful user interface
- **Real-time Data** - Weather, geography, wildlife, and country information
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🏗️ Architecture

### Backend (Rust)
- **Framework**: Actix-web
- **Language**: Rust (Edition 2021)
- **Features**:
  - RESTful API endpoints
  - CORS support for development
  - Static file serving for production
  - JSON responses with Serde

### Frontend (React)
- **Framework**: React 18
- **Features**:
  - Modern component-based architecture
  - Responsive CSS design
  - Tab-based navigation
  - Real-time data fetching

## 🚀 Getting Started

### Prerequisites

- Rust (1.70+)
- Node.js (16+)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jygeer/greenland.git
cd greenland
```

2. Build the frontend:
```bash
cd frontend
npm install
npm run build
cd ..
```

3. Run the server:
```bash
cargo run --release
```

4. Open your browser and navigate to:
```
http://localhost:8080
```

## 📡 API Endpoints

### GET /api/health
Health check endpoint
```json
{
  "status": "healthy",
  "service": "Greenland Simulation API"
}
```

### GET /api/info
Returns basic information about Greenland
```json
{
  "name": "Greenland (Kalaallit Nunaat)",
  "capital": "Nuuk",
  "population": 56661,
  "area_km2": 2166086,
  "languages": ["Greenlandic", "Danish"],
  "currency": "Danish Krone (DKK)"
}
```

### GET /api/weather
Returns current weather data for major cities
```json
[
  {
    "location": "Nuuk",
    "temperature_celsius": -5.2,
    "condition": "Partly Cloudy",
    "wind_speed_kmh": 22.0,
    "description": "Cold arctic weather with occasional snow"
  }
]
```

### GET /api/geography
Returns geographic features of Greenland
```json
{
  "ice_sheet_coverage_percent": 79.0,
  "coastline_length_km": 44087,
  "highest_peak": "Gunnbjørn Fjeld",
  "highest_peak_elevation_m": 3694,
  "major_cities": ["Nuuk", "Sisimiut", "Ilulissat", "Qaqortoq", "Aasiaat"]
}
```

### GET /api/wildlife
Returns information about Arctic wildlife
```json
{
  "species": [
    {
      "name": "Polar Bear",
      "scientific_name": "Ursus maritimus",
      "population_estimate": "~2,500",
      "status": "Vulnerable"
    }
  ]
}
```

## 🛠️ Development

### Running in Development Mode

#### Backend (with hot reload):
```bash
cargo watch -x run
```

#### Frontend (development server):
```bash
cd frontend
npm start
```

The frontend dev server runs on `http://localhost:3000` and proxies API requests to the backend.

### Building for Production

1. Build the frontend:
```bash
cd frontend
npm run build
cd ..
```

2. Build the backend:
```bash
cargo build --release
```

3. Run the production server:
```bash
./target/release/greenland-server
```

## 🧪 Testing

### Backend Tests
```bash
cargo test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📦 Project Structure

```
greenland/
├── src/
│   └── main.rs           # Rust backend server
├── frontend/
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── App.js       # Main React component
│   │   ├── App.css      # Styles
│   │   └── index.js     # Entry point
│   └── package.json
├── Cargo.toml            # Rust dependencies
├── .gitignore
└── README.md
```

## 🌐 Deployment

The application is designed to run on Linux hosts and can be deployed using:

- **Docker**: Create a Dockerfile to containerize the application
- **Systemd**: Set up as a system service
- **Nginx**: Use as a reverse proxy for production

### Example systemd service:

```ini
[Unit]
Description=Greenland Simulation Server
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/opt/greenland
ExecStart=/opt/greenland/target/release/greenland-server
Restart=always

[Install]
WantedBy=multi-user.target
```

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🔗 Links

- [Rust Documentation](https://www.rust-lang.org/)
- [Actix-web Framework](https://actix.rs/)
- [React Documentation](https://reactjs.org/)

---

Built with ❤️ using Rust and React
