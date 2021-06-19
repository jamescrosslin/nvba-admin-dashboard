import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Course from './Course';
import axios from 'axios';
import { url } from '../utils';

function Courses(props) {
  const [courses, setCourses] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    // fetch courses from api

    async function getCourses() {
      try {
        setLoading(true);
        const { data: courses } = await axios.get(`${url}/api/courses`);
        setCourses(courses);
        setLoading(false);
      } catch (err) {
        history.push('/');
      }
    }
    getCourses();
  }, [history]);

  return (
    <div className="wrap main--grid">
      {!isLoading && courses.map((course) => <Course key={course.id} {...course} />)}
      <Link to="/courses/create" className="course--module course--add--module">
        <span className="course--add--title">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 13 13"
            className="add"
          >
            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
          </svg>
          New Course
        </span>
      </Link>
    </div>
  );
}

export default Courses;
