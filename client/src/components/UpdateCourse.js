import React, { useEffect, useState } from 'react';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import CourseForm from './CourseForm';
import { url, errorRoutes } from '../utils';
import { useUserContext } from '../context/UserContext';

function UpdateCourse() {
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const { user } = useUserContext();
  const history = useHistory();

  useEffect(() => {
    // fetch course from api
    async function getCourse() {
      try {
        setIsLoading(true);
        const { data: course } = await axios.get(`${url}/api/courses/${id}`);
        console.log(id, course);
        setCourse(course);
        setIsLoading(false);
      } catch (err) {
        history.push(errorRoutes[err.response.status]);
      }
    }
    getCourse();
  }, [id]);
  return (
    (!isLoading && user.id !== course.userId && <Redirect to="/forbidden" />) ||
    (!isLoading && (
      <CourseForm
        course={course}
        title="Update Course"
        method="put"
        apiRoute={`/api/courses/${id}`}
        error={error}
      />
    ))
  );
}

export default UpdateCourse;
