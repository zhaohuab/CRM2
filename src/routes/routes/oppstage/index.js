 
export default {
  path: 'oppstage',
  indexRoute: { component: require('components/oppstage/list/container').default },
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/list').default
      ])
    })
  }
}