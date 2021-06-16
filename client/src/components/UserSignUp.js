import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { url } from '../utils';

function UserSignUp(props) {
  const [formValues, setFormValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const { data } = await axios.get(`${url}/api/users`);
    // pass data up to context
    setIsLoading(false);
  }
  function handleFormChange(e) {
    setFormValues((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  }

  return (
    !isLoading && (
      <div className="form--centered">
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formValues['firstName'] || ''}
            onChange={handleFormChange}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formValues['lastName'] || ''}
            onChange={handleFormChange}
          />
          <label htmlFor="emailAddress">Email Address</label>
          <input
            type="email"
            name="emailAddress"
            id="emailAddress"
            value={formValues['emailAddress'] || ''}
            onChange={handleFormChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formValues['password'] || ''}
            onChange={handleFormChange}
          />
          <label htmlFor="confirmedPassword">Confirmed Password</label>
          <input
            type="password"
            name="confirmedPassword"
            id="confirmedPassword"
            value={formValues['confirmedPassword'] || ''}
            onChange={handleFormChange}
          />
          <button className="button" type="submit">
            Submit
          </button>
          <Link to="/" className="button button-secondary">
            Cancel
          </Link>
        </form>
      </div>
    )
  );
}

export default UserSignUp;
