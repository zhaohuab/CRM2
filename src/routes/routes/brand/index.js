 
export default {
  path: 'brand',
  indexRoute: { component: require('components/brand/list/container').default },
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/list').default
      ])
    })
  }
}