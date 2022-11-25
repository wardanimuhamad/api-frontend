import HttpCommon from "../../HttpCommon";

class CourseService {
    getAll() {
        return HttpCommon.get("/course");
    }

    getCourseById (courseId) {
        return HttpCommon.get("/course/"+courseId);
    }

    addCourse(course) {
        return HttpCommon.post("/course",course);
    }

    putCourse(course, courseId) {
        return HttpCommon.put("/course/"+courseId, course);
    }

    deleteCourse(courseId) {
        return HttpCommon.delete("/course/"+courseId);
    }
}

export default new CourseService();