import { ACTIONS } from "../App";
import { Link } from "react-router-dom";

export function Item(props) {
  const style = {
    backgroundImage: `url(${props.image})`,
  };

  return (
    <div key={props.id} className="product">
      <Link to="/My-shop/Product">
        <div
          className="product-img"
          style={style}
          onClick={() =>
            props.dispatch({
              type: ACTIONS.PRODUCT_CLICKED,
              payload: {
                showProduct: props.showProduct,
                img: props.image,
                title: props.title,
                description: props.description,
                price: props.price,
                rate: props.rate,
                id: props.id,
                selectedSize: props.selectedSize,
                category: props.category,
              },
            })
          }
        ></div>
      </Link>

      <p className="product-title">{props.title}</p>
      <p className="product-price">price: {props.price.toFixed(2)}$</p>
    </div>
  );
}
