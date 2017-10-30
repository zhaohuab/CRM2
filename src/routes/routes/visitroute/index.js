export default {
    path: "visitroute",
    indexRoute: {
        component: require("components/visitroute/list/container").default
    },
    getChildRoutes(partialNextState, cb) {
        require.ensure([], require => {
            cb(null, [require("./routes/list").default]);
        });
    }
};
