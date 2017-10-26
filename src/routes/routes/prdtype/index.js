 
export default {
    path: 'prdtype',
    indexRoute: { component: require('components/prdtype/list/container').default },
    getChildRoutes(partialNextState, cb) {
      require.ensure([], (require) => {
        cb(null, [
          require('./routes/list').default
        ])
      })
    }
  }
