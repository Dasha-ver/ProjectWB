import React from "react";
import {useState, useEffect} from 'react';
import axios from 'axios';
import Item from "./components/Item"
import styles from './App.css';

const API_URL_WB = 'http://127.0.0.1:8000/api/products/'

function App() {

  const [products, setProducts] = useState([])

  async function getProducts() {
        const response = await axios.get(API_URL_WB)
        setProducts(response.data)
    }

  useEffect(() => {
        getProducts()}, [])

   if (!products.length) {
        return <h3> Нет информации </h3>
    }

    return(
        <table>
          <thead>
            <tr>
              <th class='col'>Название товара</th>
              <th class='col'>Цена</th>
              <th class='col'>Цена со скидкой</th>
              <th class='col'>Рейтинг</th>
              <th class='col'>Количество отзывов</th>
            </tr>
         </thead>
            {products.map(product => <Item item={product} key={product.id}/>)}
        </table>
        )
}

export default App;
