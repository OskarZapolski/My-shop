import { ACTIONS } from "../App";
import { Header } from "./header";
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
  console.log(selectedSize);
  console.log(basket);
  const style = {
    backgroundImage: `url(${img})`,
  };
  console.log(price);
  const size = sizes.map((size) => {
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
          <h2>{title}</h2>
          <p className="sub-product-price">{price.toFixed(2)}$</p>
          <p className="sub-product-description">{description}</p>
          <div className="sub-sizes">{size}</div>
          {toLoad}
        </div>
      </div>
    </>
  );
}
