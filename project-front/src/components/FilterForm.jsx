import React, {useState} from 'react';
import styles from './components.module.scss';

const FilterForm = ({changed, searchForItem, placeholder}) => {

  const[item, setItem] = useState()

  const handleChange = (e) => {
    setItem(e.target.value)
    changed(e.target.value)

  }

  const handleSubmit = (event) => {
    searchForItem(event)

  }


  return(
    <div>
      <input
        class={styles.find_input}
        onKeyPress={(event) => {
          if (!/[0-9.]/.test(event.key)) {
            event.preventDefault();
          }
        }}
        placeholder={placeholder}
        style={{width: "200px", height: "40px"}}
        value={item}
        onChange={handleChange}
      />
      <button onClick={handleSubmit} class={styles.find_btn}>Показать</button>
    </div>
   )
}

export default FilterForm;