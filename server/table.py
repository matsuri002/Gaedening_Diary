## テーブル定義をするファイル
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from db import Base, engine

class Date(Base):
    __tablename__ = "date"
    id = Column(Integer, primary_key=True)
    diary_date = Column(String(30), nullable=False)
    time = Column(String(30), nullable=True)
    vegetable_id = Column(Integer, ForeignKey('vegetable.id'))
    photo = Column(String(255))  # Assuming photos are stored as file paths
    weather = Column(String(30))
    memo = Column(String(255))
    create = Column(DateTime, server_default=func.now())
    delete = Column(DateTime)  # Assuming this is a timestamp for when the record was deleted

    vegetable = relationship("Vegetable", back_populates="dates")

class Vegetable(Base):
    __tablename__ = "vegetable"
    id = Column(Integer, primary_key=True)
    name = Column(String(30), nullable=False)
    cultivation_start_date = Column(String(30), nullable=False)
    memo = Column(String(255))
    fiscal_year = Column(String(30), nullable=False)

    dates = relationship("Date", back_populates="vegetable")

# テーブルを作成する
Base.metadata.create_all(engine)
