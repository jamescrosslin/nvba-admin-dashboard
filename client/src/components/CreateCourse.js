import CourseForm from './CourseForm';

function CreateCourse() {
  // render the modular CourseForm with the correct props
  return <CourseForm method="post" title="Create Course" apiRoute="/api/courses" />;
}

export default CreateCourse;
