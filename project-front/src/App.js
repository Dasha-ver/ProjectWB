import React from "react";
import {useState, useEffect} from 'react';
import axios from 'axios';
import Item from "./components/Item"
import styles from './App.css';
import RangeSlider from './components/RangeSlider'
import FilterForm from './components/FilterForm'
import SortForm from './components/SortForm'
import Histogram from './components/Histogram'
import "@progress/kendo-theme-material/dist/all.css";
import "hammerjs";
import RatingDiscountChart from './components/Chart'

const API_URL_WB = 'http://127.0.0.1:8000/api/products/'
const API_COUNT_URL_WB = 'http://127.0.0.1:8000/api/product-count'

function App() {

  const [products, setProducts] = useState([])
  const [value, setValue] = useState({ min: 0, max: 10000 });
  const [quantity, setQuantity] = useState({ one: [], two: [], three:[], four:[], five:[] });
  const [productData, setProductData] = useState([]);
  const [filterItem, setFilterItem] = useState()
  const [item, setItem] = useState()

  async function getProducts(minPrice, maxPrice) {
        const response = await axios.get(API_URL_WB+'?price__range='+minPrice+','+maxPrice)
        setProducts(response.data)
    }

  async function getProductsForRating(rating) {
        const response = await axios.get(API_URL_WB+'?rating__gte='+rating)
        setProducts(response.data)
        const one = await axios.get(API_COUNT_URL_WB+'-rating/?price_from=0&price_to=50&rating='+rating)
        const two = await axios.get(API_COUNT_URL_WB+'-rating/?price_from=50&price_to=100&rating='+rating)
        const three = await axios.get(API_COUNT_URL_WB+'-rating/?price_from=100&price_to=150&rating='+rating)
        const four = await axios.get(API_COUNT_URL_WB+'-rating/?price_from=150&price_to=200&rating='+rating)
        const five = await axios.get(API_COUNT_URL_WB+'-rating/?price_from=200&price_to=250&rating='+rating)
        setQuantity({one:one.data.product_count, two:two.data.product_count, three:three.data.product_count, four:four.data.product_count,
                      five:five.data.product_count,})
        let floatRating =parseFloat(rating)
        const newMap = [];
        for (let i = floatRating; i < 4.9; i+=0.1) {
            let discount = await axios.get(API_COUNT_URL_WB+'-sale/?rating='+i.toFixed(1))
            newMap.push({rating: i.toFixed(1) , discount: discount.data})
        }
        setProductData(newMap)

}

  async function getProductsForFeedbacks(feedbacks) {
        const response = await axios.get(API_URL_WB+'?reviews_count__gte='+feedbacks)
        setProducts(response.data)
        const one = await axios.get(API_COUNT_URL_WB+'-reviews/?price_from=0&price_to=50&reviews='+feedbacks)
        const two = await axios.get(API_COUNT_URL_WB+'-reviews/?price_from=50&price_to=100&reviews='+feedbacks)
        const three = await axios.get(API_COUNT_URL_WB+'-reviews/?price_from=100&price_to=150&reviews='+feedbacks)
        const four = await axios.get(API_COUNT_URL_WB+'-reviews/?price_from=150&price_to=200&reviews='+feedbacks)
        const five = await axios.get(API_COUNT_URL_WB+'-reviews/?price_from=200&price_to=250&reviews='+feedbacks)
        setQuantity({one:one.data.product_count, two:two.data.product_count, three:three.data.product_count, four:four.data.product_count,
                      five:five.data.product_count,})
        const discountForOne = await axios.get(API_COUNT_URL_WB+'-reviews-sale/?reviews='+feedbacks+'&rating_from=1&rating_to=2')
        const discountForTwo = await axios.get(API_COUNT_URL_WB+'-reviews-sale/?reviews='+feedbacks+'&rating_from=2&rating_to=3')
        const discountForThree = await axios.get(API_COUNT_URL_WB+'-reviews-sale/?reviews='+feedbacks+'&rating_from=3&rating_to=4')
        const discountForFour = await axios.get(API_COUNT_URL_WB+'-reviews-sale/?reviews='+feedbacks+'&rating_from=4&rating_to=5')
        console.log(discountForFour.data)
        setProductData([{rating:1, discount: discountForOne.data},
                        {rating:2, discount: discountForTwo.data},
                        {rating:3, discount: discountForThree.data},
                        {rating:4, discount: discountForFour.data}])

    }

  async function getProductsForSorting(value) {
        const response = await axios.get(API_URL_WB+'?ordering='+value)
        setProducts(response.data)
  }

  const handleChangeRatingFrom = () => {
    getProductsForRating(filterItem)
  }

  const handleChangeFeedbacksFrom = () => {
    getProductsForFeedbacks(filterItem)
  }

  const handleChangeSort = (value) => {
    getProductsForSorting(value)
  }

  useEffect(() => {
        getProducts(value.min, value.max)},
        [ value.min, value.max])

   if (!products.length) {
        return <h3> Нет информации </h3>
    }
    const histogramData = [
      { price: "0-50RUB", quantity: quantity.one },
      { price: "50-100RUB", quantity: quantity.two },
      { price: "100-150RUB", quantity: quantity.three },
      { price: "150-200RUB", quantity: quantity.four },
      { price: "200-250RUB", quantity: quantity.five },
    ];

    return(
        <div>
          <div style={{display:'flex'}}>
            <Histogram data={histogramData}/>
            <div>
              <RatingDiscountChart data={productData}/>
            </div>
          </div>
          {item}
          <table class='range-slider-table'>
            <td class='range-slider-min-value-td'><td>{value.min} BYN</td><td class='symbol'>&gt;</td></td>
            <td class='range-slider-td'>
              <RangeSlider min={0} max={10000} step={5} value={value} onChange={setValue}/></td>
            <td class='range-slider-max-value-td'><td class='symbol'>&lt;</td><td>{value.max} BYN</td></td>
          </table>
          <div class='founder'>
          <FilterForm searchForItem={handleChangeRatingFrom} changed={setFilterItem} placeholder='Рейтинг от'/>
          <FilterForm searchForItem={handleChangeFeedbacksFrom} changed={setFilterItem} placeholder='Количество отзывов от'/>
          <SortForm changed={handleChangeSort}/>
          </div>
          <table class='products-table'>
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
        </div>
        )
}

export default App;