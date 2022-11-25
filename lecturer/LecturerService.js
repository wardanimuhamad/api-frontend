import HttpCommon from "../../HttpCommon";

class LecturerService {
    getAll() {
        return HttpCommon.get("/lecturer");
    }

    getLecturerById (lecturerId) {
        return HttpCommon.get("/lecturer/"+lecturerId);
    }

    addLecturer (lecturer) {
        return HttpCommon.post("/lecturer",lecturer);
    }

    putLecturer(lecturer, lecturerId) {
        return HttpCommon.put("/lecturer/"+lecturerId, lecturer);
    }

    deleteLecturer(lecturerId) {
        return HttpCommon.delete("/lecturer/"+lecturerId);
    }
}

export default new LecturerService();