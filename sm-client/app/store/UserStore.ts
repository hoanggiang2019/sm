import {getCurrentUser} from "@/lib/session";

export default class UserStore {
    currentUser: User;

    constructor() {
        this.currentUser = {}
    }

    updatePageData = async () => {
        let response2 = await getCurrentUser();
        this.currentUser = response2.data;
    };

    setCurrentUser() {
        this.currentUser = {}
    }
}