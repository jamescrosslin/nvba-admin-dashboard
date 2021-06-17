import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { url } from '../utils';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import ValidationErrors from './partials/ValidationErrors';

function CourseDetail() {
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const { user } = useUserContext();
  const history = useHistory();

  useEffect(() => {
    // fetch course from api
    async function getCourse() {
      setIsLoading(true);
      const { data: course } = await axios.get(`${url}/api/courses/${id}`);
      console.log(id, course);

      course.description = course.description.split('\n\n').map((p, i) => <p key={i}>{p}</p>);
      if (course.materialsNeeded)
        course.materialsNeeded = course.materialsNeeded
          .replace(/\*/g, '')
          .split('\n')
          .filter((material) => material)
          .map((material, i) => <li key={i}>{material}</li>);
      setCourse(course);
      setIsLoading(false);
    }
    getCourse();
  }, [id]);

  async function handleDelete() {
    setError(false);
    setIsLoading(true);
    try {
      const response = await axios({
        method: 'delete',
        url: `${url}/api/courses/${id}`,
        auth: {
          username: user.username,
          password: user.password,
        },
      });
      console.log(response);
      setIsLoading(false);
      history.push('/');
    } catch (e) {
      console.dir(e);
      setError(e.response.data);
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
        <div className="wrap">
          <h2>Course Detail</h2>
          {error && <ValidationErrors error={error} />}
          <form>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{course.title}</h4>
                <p>By: {`${course.User.firstName} ${course.User.lastName}`}</p>
                {course.description}
              </div>
              <div>
                {course.estimatedTime && (
                  <>
                    <h3 className="course--detail--title">Estimated Time</h3>
                    <p>{course.estimatedTime}</p>
                  </>
                )}
                {course.materialsNeeded && (
                  <>
                    <h3 className="course--detail--title">Materials Needed</h3>
                    <ul className="course--detail--list">{course.materialsNeeded}</ul>
                  </>
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
