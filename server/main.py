from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
import httpx

from datetime import datetime, timedelta
import pytz

from table import Vegetable
from db import session

app = FastAPI()

API_KEY = "c126b997e6b39aa35d72f8d7f5350dc0"
BASE_URL = "http://api.openweathermap.org/data/2.5/forecast"

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

## この下にエンドポイント追加

@app.get("/vegetables")
async def show_vesitables():
    vegetables = session.query(Vegetable).all()
    for vegetable in vegetables:
        print ("id=",vegetable.id,"diary",vegetable.diary,"fiscal_year",vegetable.fiscal_year)
    return {"vegetables": vegetables}

@app.post("/add_vegetable")
def add_vegetable(diary: str , fiscal_year: str):
    db = Vegetable(diary=diary, fiscal_year=fiscal_year)
    session.add(db)
    session.commit()
    return {}

@app.get("/weather")
async def get_weather():
    url = "http://api.openweathermap.org/data/2.5/forecast?q=Fukuoka,JP&appid=e23e150d4f46a3a9307fecc50e40d84b&lang=ja&units=metric"
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        data = response.json()
        print(data)

        tomorrow = datetime.now(pytz.timezone('Asia/Tokyo')) + timedelta(days=1)
        tomorrow_date = tomorrow.strftime('%Y-%m-%d')

        weather_data = {
            'morning': {'weather': '', 'pop': 0},
            'afternoon': {'weather': '', 'pop': 0},
            'night': {'weather': '', 'pop': 0}
        }

        for forecast in data['list']:
            forecast_time_utc = datetime.strptime(forecast['dt_txt'], '%Y-%m-%d %H:%M:%S')
            forecast_time = forecast_time_utc.replace(tzinfo=pytz.utc).astimezone(pytz.timezone('Asia/Tokyo'))
            if forecast_time.strftime('%Y-%m-%d') == tomorrow_date:
                if 6 < forecast_time.hour < 12:
                    weather_data['morning']['weather'] = forecast['weather'][0]['description']
                    weather_data['morning']['pop'] = forecast['pop']
                elif 12 < forecast_time.hour < 18:
                    weather_data['afternoon']['weather'] = forecast['weather'][0]['description']
                    weather_data['afternoon']['pop'] = forecast['pop']
                elif 18 < forecast_time.hour < 24:
                    weather_data['night']['weather'] = forecast['weather'][0]['description']
                    weather_data['night']['pop'] = forecast['pop']

        return weather_data

        