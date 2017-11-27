 
export default {
    path: 'attr',
    indexRoute: { component: require('components/prdattr/list/container').default },
    getChildRoutes(partialNextState, cb) {
      require.ensure([], (require) => {
        cb(null, [
          require('./routes/list').default
        ])
      })
    }
  }
