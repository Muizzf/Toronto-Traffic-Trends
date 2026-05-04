# 🚗 Toronto Traffic Trends Dashboard

## Overview
Toronto Traffic Trends is an interactive data visualization dashboard that analyzes traffic collision data in Toronto. The project explores when and where collisions occur, along with their severity, to uncover patterns that can help improve road safety awareness.

The goal is to transform raw collision data into clear, interactive insights through charts, KPIs, and geospatial visualizations.

## 📊 Features
- Interactive analytics dashboard for traffic collision data
- Time-based analysis (hour, day of week, yearly trends)
- Collision severity breakdown (fatal, injury, property damage)
- Key performance indicators (KPIs) for quick insights
- Dynamic charts powered by Chart.js
- Backend API built with Flask serving processed datasets

## 🧭 Dashboard Sections

- **Overview**
  - High-level KPIs (total collisions, fatalities, peak hour, etc.)
  - Summary insights into overall trends

- **Time Analysis**
  - Collisions by hour of day
  - Collisions by day of week
  - Yearly trends over time

- **Severity Analysis**
  - Breakdown of collision severity (fatal vs injury vs property damage)
  - Severity scoring system (custom weighted metric)

- **Location**
  - Geographic visualization of collision hotspots
  - Mapping high-risk intersections and areas

- **Insights**
  - Key observations derived from data patterns
  - Trend explanations and safety implications

## 📁 Dataset
- Source: [Traffic Collisions in Toronto (Kaggle)](https://www.kaggle.com/datasets/andriyahapov/traffic-collisions-toronto) 
- Includes:
  - Date and time of collisions
  - Location (latitude/longitude, neighbourhood)
  - Collision type (injury, fatal, property damage)
  - Severity indicators
  - Additional metadata (division, year, hour, etc.)

## 🛠️ Tech Stack
- HTML, CSS, JavaScript
- Chart.js (data visualization)
- Flask (Python backend)
- Pandas (data processing)
- numPy (computing)
- Flask-CORS (frontend/backend communication)

## 🚀 Future Improvements
- Add filtering system (date range, severity, neighbourhood)
- Integrate interactive map with heatmap visualization
- Improve UI responsiveness for mobile devices
- Add predictive modeling for collision risk
- Enhance insights with automated trend detection