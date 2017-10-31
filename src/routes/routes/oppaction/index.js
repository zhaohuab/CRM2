 
export default {
  path: 'oppaction',
  indexRoute: { component: require('components/oppaction/list/container').default },
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/list').default
      ])
    })
  }
}