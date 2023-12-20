import { ACTIONS } from "../App";
export function BasketItem({ title, img, price, dispatch, id, selectedSize }) {
  console.log(selectedSize);
  return (
    <div className="basket-wraper">
      <img src={img} className="basket-img"></img>
      <div>
        <span className="basket-title">{title}</span>
        <p>Size: {selectedSize}</p>

        <p className="basket-price">{price.toFixed(2)}$</p>
      </div>
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
