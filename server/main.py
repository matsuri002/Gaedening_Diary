# main.py
from fastapi import FastAPI,HTTPException

from starlette.middleware.cors import CORSMiddleware
import httpx

from datetime import datetime, timedelta
import pytz

from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List

from table import Vegetable, Date
from db import session, engine


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

# @app.get("/vegetables")
# async def show_vesitables():
#     vegetables = session.query(Vegetable).all()
#     for vegetable in vegetables:
#         print ("id=",vegetable.id,"diary",vegetable.diary,"fiscal_year",vegetable.fiscal_year)
#     return {"vegetables": vegetables}


# Vegetableモデル用のPydanticスキーマ
class VegetableCreate(BaseModel):
    name: str
    cultivation_start_date: datetime
    memo: str
    fiscal_year: str

class VegetableRead(BaseModel):
    id: int
    name: str
    cultivation_start_date: datetime
    memo: str
    fiscal_year: str

    class Config:
        orm_mode = True

# Dateモデル用のPydanticスキーマ
class DateCreate(BaseModel):
    diary_date: datetime
    vegetable_id: int
    photo: str
    weather: str
    memo: str

class DateRead(BaseModel):
    id: int
    diary_date: datetime
    vegetable_id: int
    photo: str
    weather: str
    memo: str

    class Config:
        orm_mode = True

# エンドポイント：日付の追加
@app.post("/dates", response_model=DateRead)
def add_date(date: DateCreate):
    db_date = Date(
        diary_date=date.diary_date,
        vegetable_id=date.vegetable_id,
        photo=date.photo,
        weather=date.weather,
        memo=date.memo
    )
    session.add(db_date)
    session.commit()
    session.refresh(db_date)
    return db_date

# エンドポイント：全日付の取得
@app.get("/dates", response_model=List[DateRead])
def get_dates():
    dates = session.query(Date).all()
    return dates

# エンドポイント：特定のIDの日付の取得
@app.get("/dates/{date_id}", response_model=DateRead)
def get_date(date_id: int):
    date = session.query(Date).filter(Date.id == date_id).first()
    if date is None:
        raise HTTPException(status_code=404, detail="Date not found")
    return date

# エンドポイント：特定のIDの日付の削除
@app.delete("/dates/{date_id}")
def delete_date(date_id: int):
    date = session.query(Date).filter(Date.id == date_id).first()
    if date is None:
        raise HTTPException(status_code=404, detail="Date not found")
    session.delete(date)
    session.commit()
    return {"message": "Date deleted successfully"}



# エンドポイント：野菜の追加
@app.post("/vegetables", response_model=VegetableRead)
def add_vegetable(vegetable: VegetableCreate):
    db_vegetable = Vegetable(
        name=vegetable.name,
        cultivation_start_date=vegetable.cultivation_start_date,
        memo=vegetable.memo,
        fiscal_year=vegetable.fiscal_year
    )
    session.add(db_vegetable)
    session.commit()
    session.refresh(db_vegetable)
    return db_vegetable

# エンドポイント：野菜の取得
@app.get("/vegetables", response_model=List[VegetableRead])
def get_vegetables():
    vegetables = session.query(Vegetable).all()
    return vegetables

# @app.get("/vegetables")
# async def show_vesitables():
#     vegetables = session.query(Vegetable).all()
#     for vegetable in vegetables:
#         print ("id=",vegetable.id,"name",vegetable.name,"cultivation_start_date",vegetable.cultivation_start_date,"memo",vegetable.memo,"fiscal_year",vegetable.fiscal_year)
#     return {"vegetables": vegetables}

# @app.post("/add_vegetable")
# def add_vegetable(diary: str , fiscal_year: str):
#     db = Vegetable(diary=diary, fiscal_year=fiscal_year)
#     session.add(db)
#     session.commit()
#     return {}

@app.get("/weather")
async def get_weather():
    url = "http://api.openweathermap.org/data/2.5/forecast?q=Fukuoka,JP&appid=e23e150d4f46a3a9307fecc50e40d84b&lang=ja&units=metric"
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        data = response.json()
        # print(data)

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

        