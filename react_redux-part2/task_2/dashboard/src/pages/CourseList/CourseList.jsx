import CourseListRow from "./CourseListRow/CourseListRow";
import WithLogging from "../../components/HOC/WithLogging";
import { useSelector, useDispatch } from 'react-redux';
import { selectCourse, unSelectCourse } from '../../features/courses/coursesSlice';

function CourseList() {
  const courses = useSelector((state) => state.courses.courses);

  const dispatch = useDispatch();

  function onChangeRow(id, checked) {
    dispatch(checked ? selectCourse(id) : unSelectCourse(id));
  }


  return(
    <div className="w-4/5 mx-auto py-20" id="CourseListContainer">
      <table className="w-full border-collapse" id="CourseList">
        {courses.length === 0 ? <tbody><CourseListRow isHeader={ true } textFirstCell='No course available yet' /></tbody>:
        <>
          <thead>
            <CourseListRow isHeader={ true } textFirstCell='Available courses' />
            <CourseListRow isHeader={ true } textFirstCell='Course name'  textSecondCell='Credit' />
          </thead>
          <tbody>
            {courses.map((course) => (
              <CourseListRow key={course.id} textFirstCell={course.name} textSecondCell={course.credit} id={course.id} isSelected={course.isSelected} changeRow={onChangeRow} />
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
