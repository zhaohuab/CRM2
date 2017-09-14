
const rootRoutes = {
  path : "/",
  childRoutes : [
    {
      path : "crm_web",
      childRoutes: [
        {
          // crm_web/login
          path: 'login',
          getComponents(location, cb) {
            require.ensure([], function (require) {
              cb(null, require('components/login/container').default)
            })
          }
        },
        {
          // crm_web/home
          path: 'home',
          getComponents(location, cb) {
            require.ensure([], function (require) {
              cb(null,  require('components').default)
            })
          },
          getIndexRoute(location, cb) {
            require.ensure([], function (require) {
              cb(null, {
                component: require('components/home/container').default
              })
            })
          },
        },
        {
          // crm_web/{module}/{res}
          path: 'page',
          getComponents(location, cb) {
            require.ensure([], function (require) {
              cb(null,  require('components').default)
            })
          },  
          getChildRoutes(location, cb) {
            require.ensure([], function (require) {
              cb(null, [
                require('./routes/project').default,
                require('./routes/user').default,
                require('./routes/org/routes/list/index.js').default
              ]
            )})
          },
        },
        {
          path: '*',
          getComponents(location, cb) {
            require.ensure([], function (require) {
              cb(null,  require('components/404/container').default)
            })
          }
        }
      ]
    },
    {
      path: '*',
      getComponents(location, cb) {
        require.ensure([], function (require) {
          cb(null,  require('components/404/container').default)
        })
      }
    }
  ]
  
}

export default rootRoutes