import HttpCommon from "../../HttpCommon";

class OfferedcourseService {
    getAll() {
        return HttpCommon.get("/offeredcourse");
    }

    getOfferedcourseById (offeredcourseId) {
        return HttpCommon.get("/offeredcourse/"+offeredcourseId);
    }

    addOfferedcourse(offeredcourse) {
        return HttpCommon.post("/offeredcourse",offeredcourse);
    }

    putOfferedcourse(offeredcourse, offeredcourseId) {
        return HttpCommon.put("/offeredcourse/"+offeredcourseId, offeredcourse);
    }

    deleteOfferedcourse(offeredcourseId) {
        return HttpCommon.delete("/offeredcourse/"+offeredcourseId);
    }
}

export default new OfferedcourseService();