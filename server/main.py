from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from server.table import Vegetable
from db import session

app = FastAPI()

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