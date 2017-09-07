
//import project from './routes/project';
// import app from 'app';

const rootRoutes = {
  childRoutes: [
    {
      path: '/login',
      getComponents(location, cb) {
        require.ensure([], function (require) {
          cb(null, require('components/login/container').default)
        })
      }
    },
    {
      path: '/crmweb',
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
      getChildRoutes(location, cb) {
        require.ensure([], function (require) {
          cb(null, [
            require('./routes/project').default,
            require('./routes/user').default
          ])
        })
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
}

export default rootRoutes