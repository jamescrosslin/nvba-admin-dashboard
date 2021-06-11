import React, { useState, useEffect } from 'react';

function Courses(props) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // fetch courses from api
  }, []);
  return (
    <React.Fragment>
      {courses.map((course) => {
        <Course key={course.id} {...course} />;
      })}
    </React.Fragment>
  );
}

export default Courses;
