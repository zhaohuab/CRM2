import Contacts from "components/contacts/contactList/container/index.jsx";
export default {
    path: "contacts(/:father)",
    getComponent(nextState, cb) {
        require.ensure([], require => {
            cb(null, Contacts);
        });
    }
};
