import { useEffect, useState } from "react";
import { ACTIONS } from "../App";
import { Link } from "react-router-dom";
export function Header({
  dispatch,
  text,
  showSearch,
  style,
  NumOfItemsInBasket,
  change = false,
  basket,
  alertInfo,
}) {
  const [message, setMessage] = useState(true);

  function alert() {
    setTimeout(() => {
      setMessage(true);
    }, 3000);
  }
  useEffect(() => {
    setMessage((prevMessage) => !prevMessage);
    alert();
  }, [NumOfItemsInBasket, basket]);
  let toLoad;

  if (message) {
    toLoad = <div className="num-items-basket">{NumOfItemsInBasket}</div>;
  } else {
    alertInfo
      ? (toLoad = change ? (
          <div className="alert-new-item item-changed">Item changed</div>
        ) : (
          <div className="alert-new-item ">New Item</div>
        ))
      : setMessage(true);
  }

  return (
    <>
      <header style={style}>
        <nav className="navbar">
          <div className="navbar-container container">
            <input type="checkbox" name="" id="" />
            <div className="hamburger-lines">
              <span className="line line1"></span>
              <span className="line line2"></span>
              <span className="line line3"></span>
            </div>
            <ul className="menu-items">
              <li>
                {showSearch && (
                  <input
                    placeholder="search"
                    className="search-input"
                    type="text"
                    value={text}
                    onChange={(e) =>
                      dispatch({
                        type: ACTIONS.TEXT,
                        payload: { text: e.target.value },
                      })
                    }
                  />
                )}
              </li>
              <li
                onClick={() => dispatch({ type: ACTIONS.CLOSE_POPUP })}
                className="header-all"
              >
                <Link to="/My-shop/" className="link">
                  All
                </Link>
              </li>
              <li
                onClick={() =>
                  dispatch({
                    type: ACTIONS.GO_TO_CATEGORY,
                    payload: { category: "men's clothing" },
                  })
                }
              >
                <Link to="/My-shop/" className="link">
                  Men
                </Link>
              </li>

              <li
                onClick={() =>
                  dispatch({
                    type: ACTIONS.GO_TO_CATEGORY,
                    payload: { category: "women's clothing" },
                  })
                }
              >
                <Link to="/My-shop/" className="link">
                  Woman
                </Link>
              </li>
              <li
                onClick={() =>
                  dispatch({
                    type: ACTIONS.GO_TO_CATEGORY,
                    payload: { category: "jewelery" },
                  })
                }
              >
                <Link to="/My-shop/" className="link">
                  Jewelery
                </Link>
              </li>
              <li
                onClick={() =>
                  dispatch({
                    type: ACTIONS.GO_TO_CATEGORY,
                    payload: { category: "electronics" },
                  })
                }
              >
                <Link to="/My-shop/" className="link">
                  Electronics
                </Link>
              </li>
              <li className="relative">
                <Link to="/My-shop/Basket">
                  <img
                    src="basket2.png"
                    alt="shopping basket"
                    className="basket"
                    onClick={() => dispatch({ type: ACTIONS.GO_TO_BASKET })}
                  />
                </Link>
                {NumOfItemsInBasket > 0 && toLoad}
              </li>
            </ul>
            <Link to="/My-shop/">
              <img
                src="logo.png"
                className="logo"
                onClick={() => dispatch({ type: ACTIONS.CLOSE_POPUP })}
                alt="logo"
              />
            </Link>
          </div>
        </nav>

        <div className="header-content"></div>
      </header>
      <hr />
    </>
  );
}
