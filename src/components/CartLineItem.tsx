import { ChangeEvent, ReactElement } from "react"
import { CartItemType } from "../context/CartProvider"
import { ReducerAction } from "../context/CartProvider"
import { ReducerActionType } from "../context/CartProvider"
type PropsType = {
    item: CartItemType,
    dispatch: React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReducerActionType,

}
const CartLineItem = ({item, dispatch, REDUCER_ACTIONS}: PropsType): ReactElement => {
    const img: string = require(`../images/${item.sku}.jpg`);
    const lineTotal: number = (item.qty * item.price);

    const highestQty: number = 20 > item.qty ? 20 : item.qty;

    const optionValues: number[] = [ ...Array(highestQty).keys() ].map(i => i+1);

    const options: ReactElement[] = optionValues.map(val => {
        return <option key={`opt${val}`} value={val}>{val}</option>
    });

    const onChangeQuantity = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch({
            type: REDUCER_ACTIONS.QUANTITY,
            payload: {...item, qty: Number(e.target.value)}
        })
    };

    const onRemoveFromCart = () => dispatch({
        type: REDUCER_ACTIONS.REMOVE,
        payload: item,
    });

    const content = (
        <li className="cart__item">
            <img src={img} alt={item.name} className="cart__img" />
            <div aria-label="Item Name">{item.name}</div>
            <div aria-label="Item Price">{new Intl.NumberFormat('en-US', { style:'currency', currency:'UDS'}).format(item.price)}
            
            <label htmlFor="itemQty" className="offscreen">Item Quantity</label>
            <select 
                name="itemQty" 
                id="itemQty" 
                className="cart__Screen" 
                value={item.qty}
                aria-label="Item Quantity"
                onChange={onChangeQuantity}
                >{options}</select>
            </div>

            <div className="cart__item-subtotal" aria-label="Line Item Subtotal">
                {new Intl.NumberFormat('en-US', { style:'currency', currency:'UDS'}).format(lineTotal)}
            </div>
            <button 
                className="cart__button"
                aria-label="Remove Item From cart"
                title="Remove Item From cart"    
                onClick={onRemoveFromCart}
            >
                ❌
            </button>
        </li>
    )

  return content;
}

export default CartLineItem