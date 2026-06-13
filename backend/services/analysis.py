import pandas as pd
from flask import jsonify

df = pd.read_csv("data/Traffic_Collisions_Toronto_data.csv")

#clean
df = df.replace("NSA", pd.NA)
df = df.dropna(subset=["Hour", "Year"])

bool_cols = ["Injury_Collisions", "FTR_Collisions", "PD_Collisions"]
for col in bool_cols:
    df[col] = df[col].map({"YES": 1, "NO": 0})

df["OccurrenceDate"] = pd.to_datetime(df["OccurrenceDate"], errors="coerce")

df = df[(df["Longitude"] != 0) & (df["Latitude"] != 0)]

df["Hour"] = df["Hour"].astype(int)
df["Year"] = df["Year"].astype(int)
df["Fatalities"] = df["Fatalities"].fillna(0).astype(int)

#create new severity column with weighted scores
df["severity_score"] = (
    df["Fatalities"] * 3 +
    df["Injury_Collisions"] * 2 +
    df["FTR_Collisions"] * 1
)

# new date column
df["Date"] = df["OccurrenceDate"].dt.date

#df.to_csv("data/cleaned.csv", index=False)


DAY_ORDER = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
]


#.size() - counts rows icluding empty ones
# value_counts() - couints unique values in a column, excluding empty ones
# def accidents_by_month_year():
#     result = df.groupby(["Year", "Month"]).size().reset_index(name="count")
#     return result.to_dict(orient="records")


#overview kpis
def total_accidents():
    return len(df)

def total_fatalities():
    return int(df["Fatalities"].sum())

def total_injury_rate():
    return float(df["Injury_Collisions"].sum() / len(df))

def avg_daily_accidents():
    return float(df.groupby("Date").size().mean())


#overview charts
def accidents_by_year():
    result = df.groupby("Year").size()
    return result.to_dict()

def fatalities_by_year():
    result = df.groupby("Year")["Fatalities"].sum()
    return result.to_dict()


# time analysis kpis

def peak_hour():
    return int(df.groupby("Hour").size().idxmax())

def most_dangerous_day():
    result = df.groupby("Day_of_Week").size()
    return result.idxmax()

def most_dangerous_month():
    result = df.groupby("Month").size()
    return result.idxmax()

def compute_rush_hour_share():
    rush_hours = list(range(7, 10)) + list(range(16, 19))

    rush_df = df[df["Hour"].isin(rush_hours)]

    total = len(df)
    rush_count = len(rush_df)

    return {
        "rush_hour_accidents": rush_count,
        "total_accidents": total,
        "rush_hour_share": round((rush_count / total) * 100, 2) if total else 0
    }

# time analysis Charts
def accidents_by_hour():
    result = df.groupby("Hour").size()
    return result.to_dict()

def accidents_by_day():
    result = (
        df["Day_of_Week"]
        .value_counts()
        .reindex(DAY_ORDER, fill_value=0)
    )

    return {
        "labels": DAY_ORDER,
        "values": result.tolist()
    }
