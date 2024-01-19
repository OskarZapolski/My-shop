export function Form({ price }) {
  return (
    <div className="background-blur">
      <form className="pay-form">
        <label htmlFor="fname" className="form-label">
          First name
        </label>
        <input type="text" id="fname" name="fname" className="form-input" />
        <label htmlFor="lname" className="form-label">
          Last name
        </label>
        <input type="text" id="lname" name="lname" className="form-input" />
        <label htmlFor="mail" className="form-label">
          Mail
        </label>
        <input type="mail" id="mail" name="mail" className="form-input" />
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="form-input"
        />
      </form>
    </div>
  );
}
