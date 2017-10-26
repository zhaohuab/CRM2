 
export default {
  path: 'doc',
  indexRoute: { component: require('components/doc/list/container').default },
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/list').default
      ])
    })
  }
} 