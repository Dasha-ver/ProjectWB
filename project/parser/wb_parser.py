import json
import requests
import parser_data_client
import re
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import re


class WBParser:
     data_client_imp = parser_data_client.WBSqlite3Client()
     link_to_parse = "https://catalog.wb.ru/catalog/outwear1/v2/catalog?ab_testing=false&appType=1&cat=63010&curr=byn&dest=-3628814&hide_dtype=10;13;14&lang=ru&page=50&sort=popular&spp=30&uclusters=7&uiv=0&uv=AQIAAQIEAAMACbyKuoY9kUENx8JC6C1-xD27GTZltpBEIkVpROHCjabPQHI2vkRYNo8x6UANxLs_FMFRsdu_3r0KRjtA08KROz3ERjXVQQY_4K0fwu7Ew8F7PI1AibwpQJTC0LzhNUomLTyRO_W9QjVRRM7D6DfnuCVAqEFhxGvBhcICOFu8xUJpQBu_ljGoPI47Y0S3M6TDJT0Is_s-FTf1PypADL19sChBBcZKQKfCS8KdMGY69T1_wFI3rL2EvobAa8esP7a-XrtTOmZEW8Q2PF5FLz84NEjBEcDsRFy8XcCRr2rE2UJOuni93UjDu_s7RkAkNC3D-8VtOkY4LTmSQJZA2yrQQ1ABTAA"


     @staticmethod
     def get_wb_by_link(link):
          response = requests.get(link)
          data = json.loads(response.text)
          total_price=[]
          basic_price = []
          wb_data = []
          for i, item in data['data'].items():
               try:
                    for c in item:
                         for t in c['sizes']:
                               total_price.append(t['price']['total']/100)
                               basic_price.append(t['price']['basic']/100)
                         wb_data.append((c['name'],
                         basic_price[0],
                         total_price[0],
                         c['supplierRating'],
                         c['feedbacks']))
               except:
                    print('Неполная информация')
          return wb_data

     def save_to_db(self, general_page_data):
          connection = self.data_client_imp.get_connection()
          self.data_client_imp.create_table(connection,
                                            parser_data_client.WBSqlite3Client().WB_TABLE)
          for item in general_page_data:
               self.data_client_imp.insert(connection, item[0], item[1], item[2], item[3], item[4],
                                           parser_data_client.WBSqlite3Client().WB_TABLE)

     def run(self, link):
          wb_data = []
          wb_data.extend(self.get_wb_by_link(link))
          self.save_to_db(wb_data)
