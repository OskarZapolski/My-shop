import { Header } from "./header";
import { BasketItem } from "./basketItem";
import { Form } from "./form";
import { useState } from "react";
export function BasketPage({
  dispatch,
  text,
  items,
  isEmpty,
  showSearch,
  basket,
}) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  let styles = {
    display: isFormVisible ? "flex" : "none",
  };
  function btnPayHandle() {
    setIsFormVisible(true);
  }
  const products = items.map((item) => {
    return (
      <BasketItem
        title={item.title}
        img={item.img}
        price={item.price}
        dispatch={dispatch}
        id={item.id}
        selectedSize={item.selectedSize}
        description={item.description}
        rate={item.rate}
        showProduct={item.showProduct}
        isSizeSelected={true}
        category={item.category}
      />
    );
  });
  let total = 0;
  for (let i = 0; i < products.length; i++) {
    total += products[i].props.price;
  }
  return (
    <div>
      <Header
        dispatch={dispatch}
        text={text}
        showSearch={showSearch}
        NumOfItemsInBasket={items}
        basket={basket}
      />
      {!isEmpty ? (
        <div className="basket-main">
          <h1 className="basket-count">Items: {items.length}</h1>
          <div className="grid">
            <div className="basket-body">{products}</div>
            <div className="div-paying">
              <div className="total-price">
                <p>TOTAL:</p> <p>{total.toFixed(2)}$</p>
              </div>
              <button className="basket-pay-btn" onClick={btnPayHandle}>
                PAY
              </button>
              <Form
                price={total.toFixed(2)}
                dispatch={dispatch}
                style={styles}
                setIsFormVisible={setIsFormVisible}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="div-no-products">
          <strong className="no-products">Basket is empty</strong>
        </div>
      )}
    </div>
  );
}
