## データベースの接続設定をするファイル（migrateも）
# from sqlalchemy.orm import sessionmaker, declarative_base
# from sqlalchemy import create_engine
import os
from dotenv import load_dotenv

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

load_dotenv()

# 環境変数の設定
DB_USERNAME = os.getenv('DB_USERNAME')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_HOST = os.getenv('DB_HOST')
DB_PORT = os.getenv('DB_PORT')
DB_NAME = os.getenv('DB_NAME')

# MySQL Connector/Pythonを使うためmysqlconnectorを指定する
engine=create_engine(f'mysql+mysqlconnector://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}')

# セッションを作成する
Session=sessionmaker(engine)
session=Session()

# # MySQL pymysqlの指定
# DB_URL = f"mysql+pymysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}?charset=utf8"
# engine = create_engine(DB_URL, echo=True)
# session = sessionmaker(engine)

Base = declarative_base()

# def get_db():
#     db = session()
#     try:
#         yield db
#     finally:
#         db.close()