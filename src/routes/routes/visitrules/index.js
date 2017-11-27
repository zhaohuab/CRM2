export default {
    path: "visitrules",
    indexRoute: {
        component: require("components/visitrules/list/container").default
    },
    getChildRoutes(partialNextState, cb) {
        require.ensure([], require => {
            cb(null, [require("./routes/list").default]);
        });
    }
};
