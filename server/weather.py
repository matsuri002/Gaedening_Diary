# from fastapi import FastAPI
# import httpx

# app = FastAPI()

# API_KEY = "your_openweathermap_api_key"
# BASE_URL = "http://api.openweathermap.org/data/2.5/forecast"

# @app.get("/weather")
# async def get_weather():
#     city = "Kurume,JP"
#     url = f"{BASE_URL}?q={city}&cnt=2&units=metric&appid={API_KEY}"
#     async with httpx.AsyncClient() as client:
#         response = await client.get(url)
#         data = response.json()
#         return {
#             "tomorrow_weather": data["list"][1]["weather"][0]["description"],
#             "temperature": data["list"][1]["main"]["temp"]
#         }
