## テーブル定義をするファイル
from sqlalchemy import Column, Integer, String, DateTime, func

from server.db import Base,engine

class Vegetable(Base):
    __tablename__ = "vegetable"
    id = Column(Integer, primary_key=True)
    diary = Column(String(30), nullable=False)
    fiscal_year = Column(String(30), nullable=False)
    # created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    # updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    def name(self):
        return "{self.user_id}"
    
# テーブルを作成する
Base.metadata.create_all(engine)