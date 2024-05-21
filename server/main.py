from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
import httpx

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
    url = "http://api.openweathermap.org/data/2.5/weather?q=Fukuoka,JP&appid=e23e150d4f46a3a9307fecc50e40d84b&lang=ja&units=metric"
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        data = response.json()
        return {
            "weather": data["weather"][0]["description"],
            "temperature": data["main"]["temp"]
        }