import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { url, errorRoutes } from '../config';
import { useParams, useHistory, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useUserContext } from '../context/UserContext';

function CourseDetail() {
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const { user } = useUserContext();
  const history = useHistory();

  // fetches course data only when id or history change
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        // fetch course from api
        const { data: course } = await axios.get(`${url}/api/courses/${id}`);
        setCourse(course);
        setIsLoading(false);
      } catch (err) {
        history.push(errorRoutes[err.response.status]);
      }
    })();
  }, [id, history]);

  async function handleDelete() {
    setIsLoading(true);
    try {
      await axios({
        method: 'delete',
        url: `${url}/api/courses/${id}`,
        auth: {
          username: user.username,
          password: user.password,
        },
      });
      history.push('/');
    } catch (err) {
      history.push(errorRoutes[err.response.status]);
    }
  }

  return (
    !isLoading &&
    course && (
      <>
        <div className="actions--bar">
          <div className="wrap">
            {
              /* only renders Update and Delete buttons if a user is logged in and has the same id as the course owner */
              user?.id === course.userId && (
                <>
                  <Link className="button" to={`/courses/${id}/update`}>
                    Update Course
                  </Link>
                  <button className="button" onClick={handleDelete}>
                    Delete Course
                  </button>
                </>
              )
            }
            <Link className="button button-secondary" to="/">
              Return to List
            </Link>
          </div>
        </div>
        <div className="wrap">
          <h2>Course Detail</h2>
          <form>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{course.title}</h4>
                <p>By: {`${course.User.firstName} ${course.User.lastName}`}</p>
                {/* ReactMarkdown takes a markdown string and converts it to jsx */}
                <ReactMarkdown children={course.description} />
              </div>
              <div>
                {/* estimatedTime and materialsNeeded render conditionally */}
                {course.estimatedTime && (
                  <>
                    <h3 className="course--detail--title">Estimated Time</h3>
                    <p>{course.estimatedTime}</p>
                  </>
                )}
                {course.materialsNeeded && (
                  <>
                    <h3 className="course--detail--title">Materials Needed</h3>
                    <ReactMarkdown
                      className="course--detail--list"
                      children={course.materialsNeeded}
                    />
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
