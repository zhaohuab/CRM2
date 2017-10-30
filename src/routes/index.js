const rootRoutes = {
    path: "/",
    childRoutes: [
        {
            path: "crm_web",
            indexRoute: {
                onEnter: (nextState, replace) => replace("/crm_web/login")
            },
            childRoutes: [
                {
                    // crm_web/login
                    path: "login(/:loginmsg)",
                    getComponents(location, cb) {
                        require.ensure([], function(require) {
                            cb(
                                null,
                                require("components/login/container").default
                            );
                        });
                    }
                },
                {
                    // crm_web/home
                    path: "home",
                    getComponents(location, cb) {
                        require.ensure([], function(require) {
                            cb(null, require("components").default);
                        });
                    },
                    getIndexRoute(location, cb) {
                        require.ensure([], function(require) {
                            cb(null, {
                                component: require("components/home/container")
                                    .default
                            });
                        });
                    }
                },
                {
                    // crm_web/page
                    path: "page",
                    getComponents(location, cb) {
                        require.ensure([], function(require) {
                            cb(null, require("components").default);
                        });
                    },
                    getChildRoutes(location, cb) {
                        require.ensure([], function(require) {
                            cb(null, [
                                require("./routes/org/routes/list/index.js")
                                    .default,
                                require("./routes/project").default,
                                require("./routes/user").default,
                                require("./routes/customer/routes/list")
                                    .default,
                                require("./routes/contacts").default,
                                require("./routes/prdtype").default,
                                require("./routes/measure").default,
                                require("./routes/role").default,
                                require("./routes/brand").default,
                                // require('./routes/customer').default,
                                require("./routes/product").default,
                                require("./routes/visitroute").default,
                                {
                                    //未开发页面
                                    path: "developing",
                                    indexRoute: {
                                        component: require("components/developing/container")
                                            .default
                                    }
                                }
                            ]);
                        });
                    }
                },
                {
                    path: "*",
                    getComponents(location, cb) {
                        require.ensure([], function(require) {
                            cb(
                                null,
                                require("components/404/container").default
                            );
                        });
                    }
                }
            ]
        },
        {
            path: "*",
            getComponents(location, cb) {
                require.ensure([], function(require) {
                    cb(null, require("components/404/container").default);
                });
            }
        }
    ]
};

export default rootRoutes;
