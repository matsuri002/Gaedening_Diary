# # main.py
# from fastapi import FastAPI,HTTPException,UploadFile,File

# from starlette.middleware.cors import CORSMiddleware
# import httpx
# import shutil
# import os

# import requests

# from datetime import datetime, timedelta
# import pytz

# from sqlalchemy.orm import Session
# from pydantic import BaseModel
# from typing import List

# from table import Vegetable, Date
# from db import session, engine


# app = FastAPI()

# API_KEY = "c126b997e6b39aa35d72f8d7f5350dc0"
# BASE_URL = "http://api.openweathermap.org/data/2.5/forecast"

# # CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"]
# )

# @app.get("/")
# async def root():
#     return {"message": "Hello World"}

# ## この下にエンドポイント追加

# # Vegetableモデル用のPydanticスキーマ
# class VegetableCreate(BaseModel):
#     name: str
#     cultivation_start_date: datetime
#     memo: str
#     fiscal_year: str

# class VegetableRead(BaseModel):
#     id: int
#     name: str
#     cultivation_start_date: datetime
#     memo: str
#     fiscal_year: str

#     class Config:
#         orm_mode = True

# # Dateモデル用のPydanticスキーマ
# class DateCreate(BaseModel):
#     diary_date: str
#     vegetable_id: int
#     time: str
#     photo: str
#     weather: str
#     memo: str

# class DateRead(BaseModel):
#     id: int
#     diary_date: str
#     vegetable_id: int
#     photo: str
#     weather: str
#     memo: str

#     class Config:
#         orm_mode = True

# # エンドポイント：日付の追加
# @app.post("/dates", response_model=DateRead)
# def add_date(
#     diary_date= str,
#     vegetable_id= str,
#     time= str,
#     weather= str,
#     memo= str,
#     photo: UploadFile = File(...)
# ):
#     # 写真の保存
#     photo_path = f'../photo/{photo.filename}'
#     os.makedirs(os.path.dirname(photo_path), exist_ok=True)
#     with open(photo_path, 'wb+') as buffer:
#         shutil.copyfileobj(photo.file, buffer)

#     # 日付の保存
#     db_date = Date(
#         diary_date=diary_date,
#         vegetable_id=vegetable_id,
#         time=time,
#         photo=photo_path,
#         weather=weather,
#         memo=memo
#     )
#     session.add(db_date)
#     session.commit()
#     session.refresh(db_date)
#     return db_date

# # エンドポイント：全日付の取得
# @app.get("/dates", response_model=List[DateRead])
# def get_dates():
#     dates = session.query(Date).all()
#     return dates

# # エンドポイント：特定のIDの日付の取得
# @app.get("/dates/{date_id}", response_model=DateRead)
# def get_date(date_id: int):
#     date = session.query(Date).filter(Date.id == date_id).first()
#     if date is None:
#         raise HTTPException(status_code=404, detail="Date not found")
#     return date

# # エンドポイント：特定のIDの日付の削除
# @app.delete("/dates/{date_id}")
# def delete_date(date_id: int):
#     date = session.query(Date).filter(Date.id == date_id).first()
#     if date is None:
#         raise HTTPException(status_code=404, detail="Date not found")
#     session.delete(date)
#     session.commit()
#     return {"message": "Date deleted successfully"}

# # エンドポイント：特定の日付と野菜idのdateを取得
# @app.get("/dates/find/{diary_date}/{vegetable_id}")
# def find_date(diary_date: str, vegetable_id: int):
#     date = session.query(Date).filter(Date.diary_date == diary_date, Date.vegetable_id == vegetable_id).first()
#     if date is None:
#         raise HTTPException(status_code=404, detail="Date not found")

#     return date



# # エンドポイント：野菜の追加
# @app.post("/vegetables", response_model=VegetableRead)
# def add_vegetable(vegetable: VegetableCreate):
#     db_vegetable = Vegetable(
#         name=vegetable.name,
#         cultivation_start_date=vegetable.cultivation_start_date,
#         memo=vegetable.memo,
#         fiscal_year=vegetable.fiscal_year
#     )
#     session.add(db_vegetable)
#     session.commit()
#     session.refresh(db_vegetable)
#     return db_vegetable

# @app.post("/images/")
# def get_uploadfile(upload_file: UploadFile): # フロント側のFormDataのkeyに合わせる(upload_file)
#     path = f'api/files/{upload_file.filename}'# api/filesディレクトリを作成しておく
#     with open(path, 'wb+') as buffer:
#         shutil.copyfileobj(upload_file.file, buffer)
#     return {
#         'filename': path,
#         'type': upload_file.content_type
#     }


# # エンドポイント：野菜の取得
# @app.get("/vegetables", response_model=List[VegetableRead])
# def get_vegetables():
#     vegetables = session.query(Vegetable).all()
#     return vegetables

# @app.get("/weather")
# async def get_weather():
#     url = "http://api.openweathermap.org/data/2.5/forecast?q=Fukuoka,JP&appid=e23e150d4f46a3a9307fecc50e40d84b&lang=ja&units=metric"
#     async with httpx.AsyncClient() as client:
#         response = await client.get(url)
#         data = response.json()
#         # print(data)

#         tomorrow = datetime.now(pytz.timezone('Asia/Tokyo')) + timedelta(days=1)
#         tomorrow_date = tomorrow.strftime('%Y-%m-%d')

#         weather_data = {
#             'morning': {'weather': '', 'pop': 0},
#             'afternoon': {'weather': '', 'pop': 0},
#             'night': {'weather': '', 'pop': 0}
#         }

#         for forecast in data['list']:
#             forecast_time_utc = datetime.strptime(forecast['dt_txt'], '%Y-%m-%d %H:%M:%S')
#             forecast_time = forecast_time_utc.replace(tzinfo=pytz.utc).astimezone(pytz.timezone('Asia/Tokyo'))
#             if forecast_time.strftime('%Y-%m-%d') == tomorrow_date:
#                 if 6 < forecast_time.hour < 12:
#                     weather_data['morning']['weather'] = forecast['weather'][0]['description']
#                     weather_data['morning']['pop'] = forecast['pop']
#                 elif 12 < forecast_time.hour < 18:
#                     weather_data['afternoon']['weather'] = forecast['weather'][0]['description']
#                     weather_data['afternoon']['pop'] = forecast['pop']
#                 elif 18 < forecast_time.hour < 24:
#                     weather_data['night']['weather'] = forecast['weather'][0]['description']
#                     weather_data['night']['pop'] = forecast['pop']

#         return weather_data

# main.py
from fastapi import FastAPI,HTTPException,UploadFile,File

from starlette.middleware.cors import CORSMiddleware
import httpx
import os

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaIoBaseUpload
import io

# If modifying these scopes, delete the file token.json.
SCOPES = ["https://www.googleapis.com/auth/drive"]

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

def get_drive_service():
    """Google Drive APIのサービスを取得する関数"""
    # 認証情報の取得
    creds = None
    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                "credentials.json", SCOPES
            )
            creds = flow.run_local_server(port=0)
        with open("token.json", "w") as token:
            token.write(creds.to_json())

    # Google Drive APIのサービスをビルドして返す
    service = build("drive", "v3", credentials=creds)
    return service

## この下にエンドポイント追加

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
    diary_date: str
    vegetable_id: int
    time: str
    photo: str
    weather: str
    memo: str

class DateRead(BaseModel):
    id: int
    diary_date: str
    vegetable_id: int
    photo: str
    weather: str
    memo: str

    class Config:
        orm_mode = True

# エンドポイント：日付の追加
@app.post("/dates", response_model=DateRead)
def add_date(
    diary_date: str,
    vegetable_id: int,
    time: str,
    weather: str,
    memo: str,
    photo: UploadFile = File(...)
):
    try:
        # Google ドライブのサービスを取得
        service = get_drive_service()

        # Google ドライブに写真をアップロード
        file_metadata = {"name": photo.filename}
        media = MediaIoBaseUpload(photo.file, mimetype=photo.content_type, resumable=True)
        file = service.files().create(body=file_metadata, media_body=media, fields="id").execute()
        photo_drive_id = file.get("id")

        # 日付の保存
        db_date = Date(
            diary_date=diary_date,
            vegetable_id=vegetable_id,
            time=time,
            photo=photo_drive_id,  # ファイル ID を保存
            weather=weather,
            memo=memo
        )
        session.add(db_date)
        session.commit()
        session.refresh(db_date)
        return db_date
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {e}")


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

# エンドポイント：特定の日付と野菜idのdateを取得
@app.get("/dates/find/{diary_date}/{vegetable_id}")
def find_date(diary_date: str, vegetable_id: int):
    date = session.query(Date).filter(Date.diary_date == diary_date, Date.vegetable_id == vegetable_id).first()
    if date is None:
        raise HTTPException(status_code=404, detail="Date not found")

    return date

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