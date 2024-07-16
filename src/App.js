import { useState } from "react";
import "./App.css";

function App() {
  const initialValues = { username: "", mailAddress: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!values.username) {
      errors.username = "Input the username";
    }
    if (!values.mailAddress) {
      errors.mailAddress = "Input the mail address";
    } else if (!regex.test(values.mailAddress)) {
      errors.mailAddress = "Insert correct mail address";
    }
    if (!values.password) {
      errors.password = "Input the password";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 digits";
    } else if (values.password.length > 15) {
      errors.password = "Password cannot exceed more than 15 digits";
    }
    return errors;
  };

  return (
    <div className="form">
      <header className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Login Form</h1>
          <hr />
          <div className="uiForm">
            <div className="formField">
              <label>Username</label>
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={formValues.username}
                onChange={handleChange}
              />
              {formErrors.username && (
                <p className="errorMsg">{formErrors.username}</p>
              )}
            </div>
            <div className="formField">
              <label>Email</label>
              <input
                type="text"
                placeholder="Email"
                name="mailAddress"
                value={formValues.mailAddress}
                onChange={handleChange}
              />
              {formErrors.mailAddress && (
                <p className="errorMsg">{formErrors.mailAddress}</p>
              )}
            </div>
            <div className="formField">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
              />
              {formErrors.password && (
                <p className="errorMsg">{formErrors.password}</p>
              )}
            </div>
            <button className="submitButton">Submit</button>
            {Object.keys(formErrors).length === 0 && isSubmit && (
              <div className="msgOk">Login successful</div>
            )}
          </div>
        </form>
      </header>
    </div>
  );
}

export default App;
