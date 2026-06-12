from flask import Flask, jsonify
from flask_cors import CORS
from services.analysis import *

app = Flask(__name__)
CORS(app)  # allow frontend to connect

#overview kpi's
@app.route("/api/total-accidents")
def total_accidents_route():
    return jsonify(total_accidents())

@app.route("/api/total-fatalities")
def total_fatalities_route():
    return jsonify(total_fatalities())

@app.route("/api/injury-rate")
def injury_rate():
    return jsonify(total_injury_rate())

@app.route("/api/daily-accidents")
def daily_accidents():
    return jsonify(avg_daily_accidents())

# overview charts
@app.route("/api/year")
def year():
    return jsonify(accidents_by_year())

@app.route("/api/fatalities")
def fatalities():
    return jsonify(fatalities_by_year())



@app.route("/api/peak-hour")
def peak_hour_route():
    return jsonify(peak_hour())

@app.route("/api/most-dangerous-day")
def dangerous_day():
    return jsonify(most_dangerous_day())



#charts

# @app.route("/api/accidents-monthly")
# def accidents_monthly():
#     return jsonify(accidents_by_month_year())


@app.route("/api/hour")
def hour():
    return jsonify(accidents_by_hour())

@app.route("/api/day")
def day():
    return jsonify(accidents_by_day())



if __name__ == "__main__":
    app.run(debug=True)