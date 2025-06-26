import wb_parser
import re

parser = wb_parser.WBParser()


for i in range(0, 30):
     pattern = rf'page={i}'
     result = re.sub(pattern, f'page={i + 1}', f"https://catalog.wb.ru/catalog/outwear1/v2/catalog?ab_testing=false&appType=1&cat=63010&curr=byn&dest=-3628814&hide_dtype=10;13;14&lang=ru&page={i}&sort=popular&spp=30&uclusters=7&uiv=0&uv=AQIAAQIEAAMACbyKuoY9kUENx8JC6C1-xD27GTZltpBEIkVpROHCjabPQHI2vkRYNo8x6UANxLs_FMFRsdu_3r0KRjtA08KROz3ERjXVQQY_4K0fwu7Ew8F7PI1AibwpQJTC0LzhNUomLTyRO_W9QjVRRM7D6DfnuCVAqEFhxGvBhcICOFu8xUJpQBu_ljGoPI47Y0S3M6TDJT0Is_s-FTf1PypADL19sChBBcZKQKfCS8KdMGY69T1_wFI3rL2EvobAa8esP7a-XrtTOmZEW8Q2PF5FLz84NEjBEcDsRFy8XcCRr2rE2UJOuni93UjDu_s7RkAkNC3D-8VtOkY4LTmSQJZA2yrQQ1ABTAA")
     wb_parser.WBParser.run(parser, result)