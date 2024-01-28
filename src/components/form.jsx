import { useState } from "react";
import { ACTIONS } from "../App";

export function Form({ price, dispatch, style, setIsFormVisible }) {
  function btnHandler(e) {
    e.preventDefault();
    if (formData.fname || formData.mail || formData.lname || formData.address) {
      if (!formData.mail.includes("@")) {
        alert("Mail have to include @");
        return;
      }
      alert("Order done");
      dispatch({ type: ACTIONS.FORM_SUBMIT });
    }
  }

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    mail: "",
    address: "",
  });
  function inputHandler(name, value) {
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }
  function closeForm() {
    setIsFormVisible(false);
  }
  return (
    <div className="background-blur" style={style}>
      <form className="pay-form">
        <img
          src="close.png"
          alt=""
          className="close-icon"
          onClick={closeForm}
        />
        <div className="form-flex">
          <label htmlFor="fname" className="form-label">
            First name
          </label>
          <input
            type="text"
            id="fname"
            name="fname"
            className="form-input"
            placeholder="First name"
            value={formData.firsName}
            onChange={(e) => inputHandler(e.target.name, e.target.value)}
          />
        </div>
        <div className="form-flex">
          <label htmlFor="lname" className="form-label">
            Last name
          </label>
          <input
            type="text"
            id="lname"
            name="lname"
            className="form-input"
            placeholder="Last name"
            value={formData.lastName}
            onChange={(e) => inputHandler(e.target.name, e.target.value)}
          />
        </div>
        <div className="form-flex">
          <label htmlFor="mail" className="form-label">
            Mail
          </label>
          <input
            type="email"
            id="mail"
            name="mail"
            className="form-input"
            placeholder="default@mail.com"
            value={formData.mail}
            onChange={(e) => inputHandler(e.target.name, e.target.value)}
          />
        </div>
        <div className="form-flex">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className="form-input"
            placeholder="Address"
            value={formData.address}
            onChange={(e) => inputHandler(e.target.name, e.target.value)}
          />
        </div>
        <div className="div-submit">
          <p>Price: {price}$</p>
          <button
            type="submit"
            onClick={(e) => btnHandler(e)}
            className="btn-submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
