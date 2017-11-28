 
export default {
  path: 'oppdimension',
  indexRoute: { component: require('components/oppdimension/list/container').default },
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/list').default
      ])
    })
  }
}