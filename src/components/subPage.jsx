import { ACTIONS } from "../App";
import { Header } from "./header";
import { useLocation } from "react-router";
export function SubPage({
  sizes,
  dispatch,
  img,
  title,
  description,
  price,
  rate,
  text,
  id,
  selectedSize,
  showProduct,
  isSizeSelected,
  showSearch,
  category,
  basket,
}) {
  const location = useLocation();
  console.log(location.state);
  const style = {
    backgroundImage: `url(${location.state.img})`,
  };
  console.log(price);
  const size = location.state.sizes.map((size) => {
    if (category == "electronics") {
      return;
    }
    const sizeStyle = {
      border: "1.5px solid black",
    };

    if (selectedSize === size) {
      sizeStyle.border = "1.5px solid red";
    }
    return (
      <div
        style={sizeStyle}
        className="size-div"
        onClick={() =>
          dispatch({
            type: ACTIONS.SELECT_SIZE,
            payload: {
              id,
              size,
              title,
              description,
              rate,
              selectedSize,
              img,
              showProduct,
              price,
              isSizeSelected: true,
            },
          })
        }
      >
        {size}
      </div>
    );
  });
  let toLoad;
  if (category == "electronics") {
    toLoad = (
      <button
        className="button-buy"
        onClick={() =>
          dispatch({
            type: ACTIONS.ADD_PRODUCT_TO_BASKET,
            payload: {
              id,
              title,
              description,
              rate,
              img,
              showProduct,
              price,
              isSizeSelected: true,
              selectedSize: true,
              category,
            },
          })
        }
      >
        BUY
      </button>
    );
  } else {
    toLoad = (
      <>
        {!isSizeSelected && (
          <p className="no-size-selected">You must select size</p>
        )}{" "}
        <button
          className="button-buy"
          onClick={() =>
            dispatch({
              type: ACTIONS.ADD_PRODUCT_TO_BASKET,
              payload: {
                id,
                size,
                title,
                description,
                rate,
                selectedSize,
                img,
                showProduct,
                price,
                isSizeSelected: false,
              },
            })
          }
        >
          BUY
        </button>
      </>
    );
  }

  return (
    <>
      <Header
        dispatch={dispatch}
        text={text}
        showSearch={showSearch}
        style={{ position: "fixed", width: "100vw", zIndex: "2" }}
        NumOfItemsInBasket={basket}
      />
      <div className="sub-page" key={id}>
        <div style={style} className="sub-image-product"></div>
        <div className="sub-product-info">
          <h2>{location.state.title}</h2>
          <p className="sub-product-price">
            {location.state.price.toFixed(2)}$
          </p>
          <p className="sub-product-description">
            {location.state.description}
          </p>
          <div className="sub-sizes">{size}</div>
          {toLoad}
        </div>
      </div>
    </>
  );
}
