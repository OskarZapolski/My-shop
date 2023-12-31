import { useEffect, useState } from "react";
import { ACTIONS } from "../App";
export function Header({
  dispatch,
  text,
  showSearch,
  style,
  NumOfItemsInBasket,
}) {
  const [message, setMessage] = useState(false);
  function Alert() {
    setTimeout(() => {
      setMessage(true);
    }, 3000);
  }
  useEffect(() => {
    setMessage(false);
    Alert();
  }, [NumOfItemsInBasket]);
  let toLoad;
  if (message) {
    toLoad = <div className="num-items-basket">{NumOfItemsInBasket}</div>;
  } else {
    toLoad = <div className="alert-new-item">new item</div>;
  }
  return (
    <>
      <header style={style}>
        <nav class="navbar">
          <div class="navbar-container container">
            <input type="checkbox" name="" id="" />
            <div class="hamburger-lines">
              <span class="line line1"></span>
              <span class="line line2"></span>
              <span class="line line3"></span>
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
                All
              </li>
              <li
                onClick={() =>
                  dispatch({
                    type: ACTIONS.GO_TO_CATEGORY,
                    payload: { category: "men's clothing" },
                  })
                }
              >
                Men
              </li>

              <li
                onClick={() =>
                  dispatch({
                    type: ACTIONS.GO_TO_CATEGORY,
                    payload: { category: "women's clothing" },
                  })
                }
              >
                Woman
              </li>
              <li
                onClick={() =>
                  dispatch({
                    type: ACTIONS.GO_TO_CATEGORY,
                    payload: { category: "jewelery" },
                  })
                }
              >
                Jewelery
              </li>
              <li
                onClick={() =>
                  dispatch({
                    type: ACTIONS.GO_TO_CATEGORY,
                    payload: { category: "electronics" },
                  })
                }
              >
                Electronics
              </li>
              <li className="relative">
                <img
                  src="basket2.png"
                  alt=""
                  className="basket"
                  onClick={() => dispatch({ type: ACTIONS.GO_TO_BASKET })}
                />
                {NumOfItemsInBasket > 0 && toLoad}
              </li>
            </ul>
            <img
              src="logo192.png"
              className="logo"
              onClick={() => dispatch({ type: ACTIONS.CLOSE_POPUP })}
            />
          </div>
        </nav>

        <div className="header-content"></div>
      </header>
      <hr />
    </>
  );
}
