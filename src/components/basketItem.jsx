import { ACTIONS } from "../App";
import { Link } from "react-router-dom";
export function BasketItem({
  title,
  img,
  price,
  dispatch,
  id,
  selectedSize,
  description,
  rate,
  category,
  showProduct,
  isSizeSelected,
}) {
  console.log(selectedSize);
  return (
    <div
      className="basket-wraper"
      onClick={() =>
        dispatch({
          type: ACTIONS.CLICKED_ITEM_IN_BASKET,
          payload: {
            size: selectedSize,
            title,
            img,
            price,
            dispatch,
            id,
            description,
            rate,
            category,
            showProduct,
            isSizeSelected,
          },
        })
      }
    >
      <Link to="/My-shop/Product" className="link">
        <div className="d-grid">
          <img src={img} className="basket-img"></img>
          <div>
            <span className="basket-title">{title}</span>
            <p>Size: {selectedSize}</p>

            <p className="basket-price">{price.toFixed(2)}$</p>
          </div>
        </div>
      </Link>
      <img
        src="trash-can.png"
        className="trash-can-icon"
        onClick={() =>
          dispatch({ type: ACTIONS.DELETE_PRODUCT, payload: { id } })
        }
      />
    </div>
  );
}
