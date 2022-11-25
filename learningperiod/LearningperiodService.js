import HttpCommon from "../../HttpCommon";

class LearningperiodService {
    getAll() {
        return HttpCommon.get("/learningperiod");
    }

    getLearningperiodById (learningperiodId) {
        return HttpCommon.get("/learningperiod/"+learningperiodId);
    }

    addLearningperiod (learningperiod) {
        return HttpCommon.post("/learningperiod",learningperiod);
    }

    putLearningperiod(learningperiod, learningperiodId) {
        return HttpCommon.put("/learningperiod/"+learningperiodId, learningperiod);
    }

    deleteLearningperiod(learningperiodId) {
        return HttpCommon.delete("/learningperiod/"+learningperiodId);
    }
}

export default new LearningperiodService();