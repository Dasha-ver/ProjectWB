import styles from './item.module.scss';

const Item = (props) => {

  return(
      <tr class={styles.line}>
        <td class={styles.line_name}>{props.item.name}</td>
        <td class={styles.line_column}>{props.item.price}</td>
        <td class={styles.line_column}>{props.item.discount_price}</td>
        <td class={styles.line_column}>{props.item.rating}</td>
        <td class={styles.line_column}>{props.item.reviews_count}</td>
      </tr>

    )
  }

export default Item;