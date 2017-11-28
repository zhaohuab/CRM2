 
export default {
  path: 'oppflow',
  indexRoute: { component: require('components/oppflow/list/container').default },
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/list').default
      ])
    })
  }
}