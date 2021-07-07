import React, { useEffect, useState } from 'react';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import CourseForm from './CourseForm';
import { url, errorRoutes } from '../config';
import { useUserContext } from '../context/UserContext';

function UpdateCourse() {
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const { user } = useUserContext();
  const history = useHistory();

  useEffect(() => {
    // fetch course from api
    (async () => {
      try {
        setIsLoading(true);
        const { data: course } = await axios.get(`${url}/api/courses/${id}`);
        setCourse(course);
        setIsLoading(false);
      } catch (err) {
        history.push(errorRoutes[err.response.status]);
      }
    })();
  }, [history, id]);

  return (
    /* if a user isn't signed in and the owner of the course, it redirects to /forbidden */
    (!isLoading && user?.id !== course.userId && <Redirect to="/forbidden" />) ||
    (!isLoading && (
      <CourseForm
        course={course}
        title="Update Course"
        method="put"
        apiRoute={`/api/courses/${id}`}
      />
    ))
  );
}

export default UpdateCourse;
