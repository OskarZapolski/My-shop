import { ACTIONS } from "../App";
export function Header({ dispatch, text, showSearch, style, basket }) {
  console.log(basket);
  return (
    <>
      <header style={style}>
        <img
          src="logo192.png"
          className="logo"
          onClick={() => dispatch({ type: ACTIONS.CLOSE_POPUP })}
        />
        <div className="header-content">
          <ul>
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
            <li>
              <img
                src="basket2.png"
                alt=""
                className="basket"
                onClick={() => dispatch({ type: ACTIONS.GO_TO_BASKET })}
              />
              {basket.length > 0 && <div>{basket.length}</div>}
            </li>
          </ul>
        </div>
      </header>
      <hr />
    </>
  );
}
