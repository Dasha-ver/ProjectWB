import React, {useState} from 'react';
import styles from './components.module.scss';

const SortForm = ({changed}) => {

  const[item, setItem] = useState(null)

  const handleChange = (e) => {
    changed(e.target.value)
  }


  return(
    <label>
      Сортировать по
        <select
          value={item}
          class={styles.find_input}
          onChange={handleChange}
          name="selectedFruit"
          style={{marginLeft: '15px',width: "200px", height: "40px"}}>
          <option value="rating">Рейтинг</option>
          <option value="reviews_count">Количество отзывов</option>
          <option value="price">Цена</option>
          <option value="name">Название</option>
        </select>
      </label>
   )
}

export default SortForm;