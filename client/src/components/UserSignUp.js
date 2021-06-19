import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { url } from '../utils';
import { useUserContext } from '../context/UserContext';

function UserSignUp() {
  const [formValues, setFormValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const history = useHistory();
  const { signIn } = useUserContext();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(false);
    setIsLoading(true);
    try {
      if (formValues.password !== formValues.confirmPassword) {
        const error = new Error('Sign Up Failed');
        error.errors = ['Password and Confirm Password do not match'];
        throw error;
      }
      const { data } = await axios({
        method: 'post',
        url: `${url}/api/users`,
        data: formValues,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(data);
      // pass data up to context
      await signIn(formValues.emailAddress, formValues.password);
      setIsLoading(false);
      history.push('/');
    } catch (err) {
      setError(error.response.data);
      setIsLoading(false);
    }
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
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formValues['confirmPassword'] || ''}
            onChange={handleFormChange}
          />
          <button className="button" type="submit">
            Submit
          </button>
          <Link to="/" className="button button-secondary">
            Cancel
          </Link>
        </form>
        <p>
          Already have a user account? Click here to <Link to="/signin">sign in</Link>!
        </p>
      </div>
    )
  );
}

export default UserSignUp;
