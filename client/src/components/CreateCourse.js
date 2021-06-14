import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { url } from '../utils';
import { Link, useHistory } from 'react-router-dom';

function CreateCourse(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formValues, setFormValues] = useState({});
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${url}/api/courses/`, formValues);
      console.log(response);
      setIsLoading(false);
      history.push('/');
    } catch (error) {
      console.dir(error);
      setError(error.response.data.errors);
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
        <h2>Create Course</h2>
        <div className="validation--errors">
          <h3>Validation Errors</h3>
          <ul>
            <li>Please provide a value for "Title"</li>
            <li>Please provide a value for "Description"</li>
          </ul>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                value={formValues['courseTitle'] || ''}
                onChange={handleFormChange}
              />

              <p>By: {'needs to be changed to logged in username'}</p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                value={formValues['courseDescription'] || ''}
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
            Create Course
          </button>
          <Link className="button button-secondary" to="/">
            Cancel
          </Link>
        </form>
      </div>
    )
  );
}

export default CreateCourse;
