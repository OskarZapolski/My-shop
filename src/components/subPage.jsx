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
}) {
  const style = {
    backgroundImage: `url(${img})`,
  };

  const size = sizes.map((size) => {
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
  console.log(selectedSize);
  return (
    <>
      <Header
        dispatch={dispatch}
        text={text}
        showSearch={showSearch}
        style={{ position: "fixed", width: "100vw", zIndex: "2" }}
      />
      <div className="sub-page">
        <div style={style} className="sub-image-product"></div>
        <div className="sub-product-info">
          <h2>{title}</h2>
          <p className="sub-product-price">{price.toFixed(2)}$</p>
          <p className="sub-product-description">{description}</p>
          <div className="sub-sizes">{size}</div>
          {!isSizeSelected && (
            <p className="no-size-selected">You must select size</p>
          )}
          <button
            className="button-buy"
            onClick={() =>
              dispatch({
                type: ACTIONS.ADD_PRODUCT_TO_BASKET,
                payload: {
                  img: img,
                  title: title,
                  price: price,
                  id: id,
                  selectedSize: selectedSize,
                },
              })
            }
          >
            BUY
          </button>
        </div>
      </div>
    </>
  );
}
