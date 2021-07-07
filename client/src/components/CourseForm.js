import React, { useState } from 'react';
import axios from 'axios';
import { url, errorRoutes } from '../config';
import { Link, useHistory } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import ValidationErrors from './partials/ValidationErrors';

function CourseForm({ method, apiRoute, course, title }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formValues, setFormValues] = useState(course || {});
  const history = useHistory();
  const { user } = useUserContext();

  async function handleSubmit(event) {
    event.preventDefault();
    // set error to false to stop previous validation error data from persisting
    setError(false);
    setIsLoading(true);
    try {
      //submission method and route are designed for modularity with posts or updates
      await axios({
        method,
        url: `${url}${apiRoute}`,
        data: formValues,
        headers: {
          'Content-Type': 'application/json',
        },
        auth: {
          username: user.username,
          password: user.password,
        },
      });
      history.push('/');
    } catch (error) {
      const status = error.response.status;
      // 400 represents a validation error, so error state is set and ValidationError componenent renders
      if (status === 400) {
        setError(error.response.data);
        setIsLoading(false);
      } else {
        // any other error should be handled by
        history.push(errorRoutes?.[status] || '/error');
      }
    }
  }

  function handleFormChange(e) {
    setFormValues((prevState) => {
      return {
        // spread previous state to ensure persistence of form field values
        ...prevState,
        // whichever form field is the target of the change event will have its
        // name attribute used as a property on formValues and its value saved
        [e.target.name]: e.target.value,
      };
    });
  }
  return (
    !isLoading && (
      <div className="wrap">
        <h2>{title}</h2>
        {/* displays validation errors when they exist */}
        {error.errors && <ValidationErrors error={error} />}

        <form onSubmit={handleSubmit}>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="title"
                type="text"
                value={formValues['title'] || ''}
                onChange={handleFormChange}
              />

              <p>By: {`${user.firstName} ${user.lastName}`}</p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="description"
                value={formValues['description'] || ''}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                value={formValues['estimatedTime'] || ''}
                onChange={handleFormChange}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                value={formValues['materialsNeeded'] || ''}
                onChange={handleFormChange}
              />
            </div>
          </div>
          <button className="button" type="submit">
            {title}
          </button>
          <Link className="button button-secondary" to="/">
            Cancel
          </Link>
        </form>
      </div>
    )
  );
}

export default CourseForm;
