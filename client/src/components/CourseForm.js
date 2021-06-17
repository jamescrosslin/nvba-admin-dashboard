import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { url } from '../utils';
import { Link, useHistory } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

function CourseForm(props) {
  const { method, apiRoute, course, title } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formValues, setFormValues] = useState(course || {});
  const history = useHistory();
  const { user } = useUserContext();

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios({
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
      console.log(response);
      setIsLoading(false);
      history.push('/');
    } catch (error) {
      console.dir(error);
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
      <div className="wrap">
        <h2>{title}</h2>
        {/* displays validation errors when they exist */}
        {error.errors && (
          <div className="validation--errors">
            <h3>{error.message}</h3>
            <ul>
              {error.errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

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

              <p>By: {'needs to be changed to logged in username'}</p>

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
