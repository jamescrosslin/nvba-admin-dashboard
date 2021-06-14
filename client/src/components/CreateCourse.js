import CourseForm from './CourseForm';

function CreateCourse() {
  return <CourseForm method="post" title="Create Course" apiRoute="/api/courses" />;
}

export default CreateCourse;
