import psycopg2
# import os
# from dotenv import load_dotenv

# # 環境変数読み込み
# load_dotenv()

# # 接続情報を指定
# hostname = 'localhost'
# database = 'postgres'
# port = '5432'
# username = 'postgres'
# password = 'Arinco128'

### PostgreSQLデータベースに接続###
# conn変数にPostgreSQLDBへの接続が格納される
conn = psycopg2.connect(
    host="localhost", # PostgreSQLサーバーのホスト名またはIPアドレスを指定
    database="mydatabase0", # 接続するDBの名前
    user="postgres", # DBに接続するためのユーザー名
    password="Arinco128"
)

try:
    ### 作成したDBに新しいテーブルを作成する操作###
    cur = conn.cursor() # DBとの通信にしようするカーソルオブジェクトを取得。このカーソルを利用しDB上でクエリを実行

    # メソッドを使用して、SQLクエリを実行する。
    cur.execute("""
        CREATE TABLE users01 (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255)
        )
    """)

    # メソッドを呼び出して、変更をDBにコミットする。
    conn.commit()


    ###データを挿入する###
    # メソッドを使用して、DBとの通信に使用するカーソルオブジェクトを取得
    cur = conn.cursor()

    # SQLクエリを実行。このクエリではusersテーブルに新しい行を挿入し、nameとemail列に値を設定
    # %sはプレースホルダーで後で渡される実際の値で置換される
    cur.execute("""
            INSERT INTO users01(name, email)
            VALUES (%s, %s) 
    """, ("john Doe", "jon@example.com"))           

    conn.commit()


    ### データを取得する ###
    cur = conn.cursor()

    # "users"テーブルからすべての列を取得
    cur.execute("SELECT * FROM users")

    # クエリの実行結果から全ての列を取得し、それらをタプルのリストとして返す
    rows = cur.fetchall()

    # ループを使用して取得した各行について処理
    for row in rows:
        print(row)

    ### データを更新する ###
    cur = conn.cursor()

    # UPDATE文を使用して"users"テーブルの行を更新
    # 指定された条件に一致する行の"name"と"email"列の値を指定された新しい値に更新
    cur.execute("""
        UPDATE users SET name = %s, email = %s WHERE id = %s
    """, ("jane Doe", "jan@example.com",1))

    conn.commit()

except psycopg2.Error as e:
    print("Error:", e)
finally:
    # 接続をクローズ
    cur.close()
    conn.close()



