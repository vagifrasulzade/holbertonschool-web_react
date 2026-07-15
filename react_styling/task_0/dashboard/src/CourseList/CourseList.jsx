import CourseListRow from "./CourseListRow";
import WithLogging from "../HOC/WithLogging";
import './CourseList.css'

function CourseList({ courses = [] }) {
  return(
    <div id="CourseListContainer">
      <table id="CourseList">
        {courses.length === 0 ? <tbody><CourseListRow isHeader={ true } textFirstCell='No course available yet' /></tbody>:
        <>
          <thead>
            <CourseListRow isHeader={ true } textFirstCell='Available courses' />
            <CourseListRow isHeader={ true } textFirstCell='Course name'  textSecondCell='Credit' />
          </thead>
          <tbody>
            {courses.map((course) => (
              <CourseListRow key={course.id} textFirstCell={course.name} textSecondCell={course.credit} />
            ))}
          </tbody>
        </>
        }
      </table>
    </div>
  )
}

const CourseListWithLogging = WithLogging(CourseList)

export default CourseListWithLogging;
