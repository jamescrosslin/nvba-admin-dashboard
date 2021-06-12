import React from 'react';
import { Link } from 'react-router-dom';

function Course(props) {
  const { title, id } = props;
  return (
    // TODO: add routing to component
    <Link to={`/courses/${id}`} className="course--module course--link">
      <h2 className="course--label"> Course</h2>
      <h3 className="course--title">{title}</h3>
    </Link>
  );
}

export default Course;
