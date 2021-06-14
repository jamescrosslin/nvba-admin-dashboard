import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { url } from '../utils';
import { useParams, Link } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

function CourseDetail() {
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    // fetch courses from api
    async function getCourses() {
      setIsLoading(true);
      const { data: course } = await axios.get(`${url}/api/courses/${id}`);
      console.log(id, course);
      setCourse(course);
      setIsLoading(false);
    }
    getCourses();
  }, [id]);

  async function handleDelete() {
    setIsLoading(true);
    try {
      const response = await axios.delete(`${url}/api/courses/${id}`);
      console.log(response);
      setIsLoading(false);
    } catch (e) {
      console.dir(e);
      setError(e.response.data.message);
      setIsLoading(false);
    }
  }

  return (
    !isLoading &&
    course && (
      <>
        <div className="actions--bar">
          <div className="wrap">
            <Link className="button" to={`/courses/${id}/update`}>
              Update Course
            </Link>
            <button className="button" onClick={handleDelete}>
              Delete Course
            </button>
            <Link className="button button-secondary" to="/">
              Return to List
            </Link>
          </div>
        </div>
        {error && <span>{error}</span>}
        <div className="wrap">
          <h2>Course Detail</h2>
          <form>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{course.title}</h4>
                <p>{course.User.name}</p>
                {course.description.split('\n\n').map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div>
                {course.estimatedTime && (
                  <React.Fragment>
                    <h3 className="course--detail--title">Estimated Time</h3>
                    <p>{course.estimatedTime}</p>
                  </React.Fragment>
                )}
                {course.materialsNeeded && (
                  <React.Fragment>
                    <h3 className="course--detail--title">Materials Needed</h3>
                    <ul className="course--detail--list">
                      {course.materialsNeeded
                        .replace(/\*/g, '')
                        .split('\n')
                        .filter((material) => material)
                        .map((material, i) => (
                          <li key={i}>{material}</li>
                        ))}
                    </ul>
                  </React.Fragment>
                )}
              </div>
            </div>
          </form>
        </div>
      </>
    )
  );
}

export default CourseDetail;
