import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import CourseForm from './CourseForm';
import { url } from '../utils';

function UpdateCourse() {
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    // fetch course from api
    async function getCourse() {
      setIsLoading(true);
      const { data: course } = await axios.get(`${url}/api/courses/${id}`);
      console.log(id, course);
      setCourse(course);
      setIsLoading(false);
    }
    getCourse();
  }, [id]);
  return (
    !isLoading && (
      <CourseForm
        course={course}
        title="Update Course"
        method="put"
        apiRoute={`/api/courses/${id}`}
      />
    )
  );
}

export default UpdateCourse;
