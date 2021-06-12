import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { url } from '../utils';
import { useParams } from 'react-router-dom';

function CourseDetail() {
  const [course, setCourse] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    // fetch courses from api
    async function getCourses() {
      setLoading(true);
      const { data: course } = await axios.get(`${url}/api/courses/${id}`);
      console.log(id, course);
      setCourse(course);
      setLoading(false);
    }
    getCourses();
  }, [id]);

  return (
    !isLoading &&
    course && (
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
    )
  );
}

export default CourseDetail;
