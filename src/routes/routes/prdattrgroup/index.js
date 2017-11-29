 
export default {
    path: 'attrgroup',
    indexRoute: { component: require('components/prdattrgroup/list/container').default },
    getChildRoutes(partialNextState, cb) {
      require.ensure([], (require) => {
        cb(null, [
          require('./routes/list').default
        ])
      })
    }
  }
