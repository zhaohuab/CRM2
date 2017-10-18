 
export default {
  path: 'measure',
  indexRoute: { component: require('components/measure/list/container').default },
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/list').default
      ])
    })
  }
}