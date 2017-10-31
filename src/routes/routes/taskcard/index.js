 
export default {
  path: 'taskcard',
  indexRoute: { component: require('components/taskcard/list/container').default },
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/list').default
      ])
    })
  }
}