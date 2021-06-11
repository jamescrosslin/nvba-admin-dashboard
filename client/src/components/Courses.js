import React, { useState, useEffect } from 'react';
import Course from './Course';
import axios from 'axios';

const url = process.env.API_URL || 'http://localhost:5000';

function Courses(props) {
  const [courses, setCourses] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // fetch courses from api
    async function getCourses() {
      setLoading(true);
      const { data: courses } = await axios.get(`${url}/api/courses`);
      console.log(courses);
      setCourses(courses);
      setLoading(false);
    }
    getCourses();
  }, []);

  return (
    <React.Fragment>
      {!isLoading && courses.map((course) => <Course key={course.id} {...course} />)}
    </React.Fragment>
  );
}

export default Courses;
