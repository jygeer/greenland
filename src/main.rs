use actix_web::{get, App, HttpResponse, HttpServer, Responder};
use actix_files as fs;
use actix_cors::Cors;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct GreenlandInfo {
    name: String,
    capital: String,
    population: u32,
    area_km2: u32,
    languages: Vec<String>,
    currency: String,
}

#[derive(Serialize, Deserialize)]
struct WeatherData {
    location: String,
    temperature_celsius: f32,
    condition: String,
    wind_speed_kmh: f32,
    description: String,
}

#[derive(Serialize, Deserialize)]
struct GeographyData {
    ice_sheet_coverage_percent: f32,
    coastline_length_km: u32,
    highest_peak: String,
    highest_peak_elevation_m: u32,
    major_cities: Vec<String>,
}

#[derive(Serialize, Deserialize)]
struct WildlifeData {
    species: Vec<WildlifeSpecies>,
}

#[derive(Serialize, Deserialize)]
struct WildlifeSpecies {
    name: String,
    scientific_name: String,
    population_estimate: String,
    status: String,
}

#[get("/api/info")]
async fn get_info() -> impl Responder {
    let info = GreenlandInfo {
        name: "Greenland (Kalaallit Nunaat)".to_string(),
        capital: "Nuuk".to_string(),
        population: 56661,
        area_km2: 2166086,
        languages: vec!["Greenlandic".to_string(), "Danish".to_string()],
        currency: "Danish Krone (DKK)".to_string(),
    };
    HttpResponse::Ok().json(info)
}

#[get("/api/weather")]
async fn get_weather() -> impl Responder {
    let weather = vec![
        WeatherData {
            location: "Nuuk".to_string(),
            temperature_celsius: -5.2,
            condition: "Partly Cloudy".to_string(),
            wind_speed_kmh: 22.0,
            description: "Cold arctic weather with occasional snow".to_string(),
        },
        WeatherData {
            location: "Ilulissat".to_string(),
            temperature_celsius: -12.8,
            condition: "Snow".to_string(),
            wind_speed_kmh: 35.0,
            description: "Heavy snowfall near the icefjord".to_string(),
        },
        WeatherData {
            location: "Tasiilaq".to_string(),
            temperature_celsius: -8.5,
            condition: "Clear".to_string(),
            wind_speed_kmh: 15.0,
            description: "Clear skies with strong winds from the ice sheet".to_string(),
        },
    ];
    HttpResponse::Ok().json(weather)
}

#[get("/api/geography")]
async fn get_geography() -> impl Responder {
    let geography = GeographyData {
        ice_sheet_coverage_percent: 79.0,
        coastline_length_km: 44087,
        highest_peak: "Gunnbjørn Fjeld".to_string(),
        highest_peak_elevation_m: 3694,
        major_cities: vec![
            "Nuuk".to_string(),
            "Sisimiut".to_string(),
            "Ilulissat".to_string(),
            "Qaqortoq".to_string(),
            "Aasiaat".to_string(),
        ],
    };
    HttpResponse::Ok().json(geography)
}

#[get("/api/wildlife")]
async fn get_wildlife() -> impl Responder {
    let wildlife = WildlifeData {
        species: vec![
            WildlifeSpecies {
                name: "Polar Bear".to_string(),
                scientific_name: "Ursus maritimus".to_string(),
                population_estimate: "~2,500".to_string(),
                status: "Vulnerable".to_string(),
            },
            WildlifeSpecies {
                name: "Arctic Fox".to_string(),
                scientific_name: "Vulpes lagopus".to_string(),
                population_estimate: "Several thousand".to_string(),
                status: "Least Concern".to_string(),
            },
            WildlifeSpecies {
                name: "Musk Ox".to_string(),
                scientific_name: "Ovibos moschatus".to_string(),
                population_estimate: "~10,000".to_string(),
                status: "Least Concern".to_string(),
            },
            WildlifeSpecies {
                name: "Greenland Whale".to_string(),
                scientific_name: "Balaena mysticetus".to_string(),
                population_estimate: "Unknown".to_string(),
                status: "Least Concern".to_string(),
            },
            WildlifeSpecies {
                name: "Narwhal".to_string(),
                scientific_name: "Monodon monoceros".to_string(),
                population_estimate: "~80,000".to_string(),
                status: "Least Concern".to_string(),
            },
        ],
    };
    HttpResponse::Ok().json(wildlife)
}

#[get("/api/health")]
async fn health_check() -> impl Responder {
    HttpResponse::Ok().json(serde_json::json!({
        "status": "healthy",
        "service": "Greenland Simulation API"
    }))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("🇬🇱 Starting Greenland Simulation Server...");
    println!("🌐 Server running at http://localhost:8080");
    println!("📡 API endpoints available at http://localhost:8080/api/*");
    
    HttpServer::new(|| {
        // CORS Configuration
        // Note: For production, restrict allowed origins to specific domains
        // Example: .allowed_origin("https://yourdomain.com")
        let cors = Cors::default()
            .allow_any_origin()  // Development only - restrict in production
            .allow_any_method()
            .allow_any_header();
        
        App::new()
            .wrap(cors)
            .service(health_check)
            .service(get_info)
            .service(get_weather)
            .service(get_geography)
            .service(get_wildlife)
            .service(fs::Files::new("/", "./frontend/build").index_file("index.html"))
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
