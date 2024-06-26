# Gaedening_Diary

# システム構成図
<img src="https://img.shields.io/badge/-React-61DAFB.svg?logo=react&style=plastic"> <img src="https://img.shields.io/badge/-FastAPI-009688.svg?logo=fastapi&style=plastic"> <img src="https://img.shields.io/badge/-Mysql-4479A1.svg?logo=mysql&style=plastic">  
<img src="docs/system_configuration.png" width="400">

# 動作イメージ
https://github.com/matsuri002/Gaedening_Diary/assets/144910260/a51c0d9e-181c-4f7b-95a5-4ffca4bd6169

# 機能
- 家庭菜園をしている人向けに、写真をアップロードし栽培日記を作る
- 水やりの指標のため明日の天気を表示させる

# 意図
- 水のやり忘れ、病気等の防止
- 習慣が付け、モチベーションの維持
- 病気の原因発見

# 環境構築
1. リポジトリをクローンする  
git clone git@github.com:matsuri002/Gaedening_Diary.git
2. npm installの方法  
cd Gaedening_Diary  
cd my-app  
npm install
3. requirements.txtのインストール  
cd Gaedening_Diary  
pip install -r requirements.txt

## DBの作成
1. template.envファイルを以下の写真のようにする  
![alt text](docs/db_setting.png)
2. .gitignoreファイルにtemplate.envと記述する
3. sudo service mysql start
4. sudo mysql -u root -p
5. CREATE DATABASE <DB名>;
6. CREATE USER '<ユーザー名>'@'localhost' IDENTIFIED BY '<password>';
7. GRANT ALL PRIVILEGES ON <DB名>* TO 'ユーザー名'@'localhost';
8. flush privileges;
9. exit;


# ローカルで動かす手順  
＊ FastAPIとReactはそれぞれ別のターミナルで立ち上げる
## Reactの起動
1. ディレクトリをGaedening_Diaryに移動する  
cd Gaedening_Diary
2. ディレクトリをmy-appに移動する  
cd my-app
3. FastAPIの起動  
npm start

## MySQLの起動
1. MySQLの起動  
sudo service mysql start

## FastAPIの起動
1. ディレクトリをGaedening_Diaryに移動する  
cd Gaedening_Diary
2. ディレクトリをserverに移動する  
cd server
3. サーバーの起動  
uvicorn main:app


# ER図
<img src="docs/ER.png" width="400">

# API仕様書
<img src="docs/API.png" width="400">
