import HttpCommon from "../../HttpCommon";

class CategoryService {
    getAll() {
        return HttpCommon.get("/category");
    }

    getCategoryById (categoryId) {
        return HttpCommon.get("/category/"+categoryId);
    }

    addCategory(category) {
        return HttpCommon.post("/category",category);
    }
}

export default new CategoryService();