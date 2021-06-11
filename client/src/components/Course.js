import React from 'react';

function Course(props) {
  const { title, description } = props;
  return (
    // TODO: add routing to component
    <a className="course--module course--link" href="course-detail.html">
      <h2 className="course--label">{title}</h2>
      <h3 className="course--title">{description}</h3>
    </a>
  );
}

export default Course;
