import { ACTIONS } from "../App";
import { Header } from "./header";
export function MainPage({ text, dispatch, items, showSearch }) {
  return (
    <>
      <Header dispatch={dispatch} text={text} showSearch={showSearch} />

      <main>
        {items.length != 0 ? (
          items
        ) : (
          <div className="div-no-products">
            <strong className="no-products">Product not found</strong>
          </div>
        )}
      </main>
    </>
  );
}
