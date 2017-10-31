 
export default {
  path: 'opportunity',
  indexRoute: { component: require('components/opportunity/list/container').default },
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/list').default
      ])
    })
  }
}