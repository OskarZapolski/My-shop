import { useEffect, useReducer, useState } from "react";
import "./App.css";
import { Item } from "./components/item";
import { MainPage } from "./components/mainPage";
import { SubPage } from "./components/subPage";
import { BasketPage } from "./components/basket";
import { nanoid } from "nanoid";
import { Route, Link, Routes } from "react-router-dom";

export const ACTIONS = {
  PRODUCT_CLICKED: "product-clicked",
  FETCH: "fetch",
  TEXT: "text",
  CLOSE_POPUP: "close-popup",
  GO_TO_CATEGORY: "go-to-category",
  ADD_PRODUCT_TO_BASKET: "add-product-to-basket",
  GO_TO_BASKET: "go-to-basket",
  DELETE_PRODUCT: "delete-product",
  SELECT_SIZE: "select-size",
  CLICKED_ITEM_IN_BASKET: "clicked-item-in-basket",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.FETCH:
      return {
        ...state,
        data: updateData(payload.data, ""),
        oldData: updateData(payload.data, ""),
        emptyBasket: true,
      };
    case ACTIONS.TEXT:
      return {
        ...state,
        text: payload.text,
        noProducts: "not Found",
        data: FindProduct(
          state.categoryData ? state.categoryData : state.oldData,
          payload.text
        ),
      };
    case ACTIONS.PRODUCT_CLICKED:
      return {
        ...state,
        loadedPage: "subPage",

        subPage: payload.showProduct(
          payload.img,
          payload.title,
          payload.description,
          payload.price,
          payload.rate,
          payload.id,
          payload.selectedSize,
          payload.showProduct,
          state.isSizeSelected,
          payload.category,
          state.basket.length
        ),
      };
    case ACTIONS.CLOSE_POPUP:
      return {
        ...state,
        text: "",
        data: state.oldData,
        categoryData: false,
        loadedPage: "MainPage",
      };
    case ACTIONS.GO_TO_CATEGORY:
      return {
        ...state,
        text: "",
        categoryData: getCategory(state.oldData, payload.category),
        data: getCategory(state.oldData, payload.category),
        loadedPage: "MainPage",
        selectedSize: "",
      };
    case ACTIONS.ADD_PRODUCT_TO_BASKET:
      if (!payload.selectedSize)
        return {
          ...state,
          isSizeSelected: false,
        };
      return {
        ...state,
        emptyBasket: false,
        alert: "new item in basket",
        basket: [
          ...state.basket,
          {
            title: payload.title,
            img: payload.img,
            price: payload.price,
            id: payload.id,
            selectedSize: payload.selectedSize,
            description: payload.description,
            rate: payload.rate,
            showProduct: payload.showProduct,
            isSizeSelected: false,
            category: payload.category,
          },
        ],
        subPage: payload.showProduct(
          payload.img,
          payload.title,
          payload.description,
          payload.price,
          payload.rate,
          payload.id,
          (payload.size = false),
          payload.showProduct,
          payload.isSizeSelected,
          payload.category,
          state.basket.length + 1
        ),
      };
    case ACTIONS.GO_TO_BASKET:
      return {
        ...state,
        loadedPage: "basketPage",
      };
    case ACTIONS.DELETE_PRODUCT:
      if (state.basket.length == 1)
        return {
          ...state,
          emptyBasket: true,
          basket: deleteProduct(state.basket, payload.id),
        };
      return {
        ...state,
        basket: deleteProduct(state.basket, payload.id),
      };

    case ACTIONS.SELECT_SIZE:
      return {
        ...state,

        data: Addsize(state.data, payload.id, payload.size),
        subPage: payload.showProduct(
          payload.img,
          payload.title,
          payload.description,
          payload.price,
          payload.rate,
          payload.id,
          payload.size,
          payload.showProduct,
          payload.isSizeSelected,
          payload.category,
          state.basket.length
        ),
      };
    case ACTIONS.CLICKED_ITEM_IN_BASKET:
      return {
        ...state,
        subPage: payload.showProduct(
          payload.img,
          payload.title,
          payload.description,
          payload.price,
          payload.rate,
          payload.id,
          payload.size,
          payload.showProduct,
          payload.isSizeSelected,
          payload.category,
          state.basket.length
        ),
      };
  }
}

function deleteProduct(data, id) {
  return data.filter((data) => data.id != id);
}
function updateData(data, value) {
  return data.map((data) => {
    return { ...data, selectedSize: value };
  });
}
function Addsize(data, id, size) {
  return data.map((data) => {
    if (data.id === id) {
      return { ...data, selectedSize: size };
    } else {
      return data;
    }
  });
}
console.log("object");
function FindProduct(data, text) {
  return data.filter((datas) => {
    return datas.title.toUpperCase().includes(text.toUpperCase())
      ? datas
      : null;
  });
}
function getCategory(oldData, category) {
  return oldData.filter((data) => {
    return data.category == category;
  });
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    data: [],
    basket: [],
    loadedPage: "MainPage",
  });

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => dispatch({ type: ACTIONS.FETCH, payload: { data } }))
      .catch((err) => console.log(err));
  }, []);
  console.log(state.loadedPage);
  function showProduct(
    img,
    title,
    description,
    price,
    rate,
    id,
    size,
    showProduct,
    isSizeSelected,
    category,
    basket
  ) {
    return (
      <SubPage
        isSizeSelected={isSizeSelected}
        sizes={["S", "M", "L", "XL"]}
        dispatch={dispatch}
        img={img}
        title={title}
        description={description}
        price={price}
        rate={rate}
        text={state.text}
        id={nanoid()}
        selectedSize={size}
        showProduct={showProduct}
        showSearch={false}
        category={category}
        basket={basket}
      />
    );
  }

  const items = state.data.map((data) => {
    return (
      <Item
        description={data.description}
        id={data.id}
        image={data.image}
        title={data.title}
        rate={data.rating.rate}
        price={data.price}
        dispatch={dispatch}
        showProduct={showProduct}
        category={data.category}
        selectedSize={data.selectedSize}
        loadedPage={state.loadedPage}
      />
    );
  });

  // let toLoad;
  // if (state.loadedPage == "MainPage") {
  //   toLoad = (
  //     <MainPage
  //       text={state.text}
  //       dispatch={dispatch}
  //       items={items}
  //       showSearch={true}
  //       basket={state.basket.length}
  //     />
  //   );
  // } else if (state.loadedPage == "subPage") {
  //   toLoad = state.subPage;
  // } else {
  //   toLoad = (
  //     <BasketPage
  //       dispatch={dispatch}
  //       text={state.text}
  //       items={state.basket}
  //       isEmpty={state.emptyBasket}
  //       showSearch={false}
  //     />
  //   );
  // }

  // const Main = (
  //   <MainPage
  //     text={state.text}
  //     dispatch={dispatch}
  //     items={items}
  //     showSearch={true}
  //     basket={state.basket.length}
  //   />
  // );
  // const Basket = (
  //   <BasketPage
  //     dispatch={dispatch}
  //     text={state.text}
  //     items={state.basket}
  //     isEmpty={state.emptyBasket}
  //     showSearch={false}
  //   />
  // );
  // if (state.subPage) {
  //   console.log(
  //     state.subPage.props.title,
  //     state.subPage.props.isSizeSelected,
  //     state.subPage.props.img,
  //     state.subPage.props.description,
  //     state.subPage.props.price,
  //     state.subPage.props.rate,
  //     state.subPage.props.size,
  //     state.subPage.props.category,
  //     state.basket.length,
  //     state.subPage
  //   );
  // }

  //napraw w items target blank
  return (
    <div>
      <Routes>
        <Route
          exact
          path="/My-shop/"
          element={
            <MainPage
              text={state.text}
              dispatch={dispatch}
              items={items}
              showSearch={true}
              basket={state.basket.length}
            />
          }
        />
        <Route
          exact
          path="/My-shop/Basket"
          element={
            <BasketPage
              dispatch={dispatch}
              text={state.text}
              items={state.basket}
              isEmpty={state.emptyBasket}
              showSearch={false}
            />
          }
        />

        <Route exact path="/My-shop/Product" element={state.subPage} />
      </Routes>
    </div>
  );
}
