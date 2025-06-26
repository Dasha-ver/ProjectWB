import sqlite3
from abc import ABC, abstractmethod
from sqlite3 import Error
from project.project.settings import BASE_DIR


class DataClient(ABC):

    @abstractmethod
    def get_connection(self):
        pass

    @abstractmethod
    def create_table(self, conn, table_name):
        pass

    @abstractmethod
    def insert(self, conn, name, price, discount_price, rating, reviews_count, table_name):
        pass

    def run_test(self, table_name):
        conn = self.get_connection()
        self.create_table(conn, table_name)

        conn.close()


class WBSqlite3Client(DataClient):
    DB_NAME = BASE_DIR / 'db.sqlite3'
    WB_TABLE = 'app_wbtable'

    def get_connection(self):
        try:
            conn = sqlite3.connect(self.DB_NAME)
            return conn
        except Error:
            print(Error)

    def create_table(self, conn, table_name):
        cursor_object = conn.cursor()
        cursor_object.execute(
            f"""
                CREATE TABLE IF NOT EXISTS {table_name}
                (
                    id integer PRIMARY KEY autoincrement, 
                    name text, 
                    price float, 
                    discount_price float, 
                    rating float, 
                    reviews_count integer                                        
                )
            """
        )
        conn.commit()

    def insert(self, conn, name, price, discount_price, rating, reviews_count, table_name):
        cursor = conn.cursor()
        cursor.execute(
             f"INSERT INTO {table_name} (name, price, discount_price, rating, reviews_count) VALUES ('{name}', '{price}', '{discount_price}', '{rating}', '{reviews_count}')")
        conn.commit()

