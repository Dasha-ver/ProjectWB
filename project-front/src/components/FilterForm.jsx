import React, {useState} from 'react';
import styles from './components.module.scss';

const FilterForm = ({changed, placeholder}) => {

  const[item, setItem] = useState(null)

  const handleChange = (e) => {
    changed(e.target.value)
  }


  return(
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
   )
}

export default FilterForm;