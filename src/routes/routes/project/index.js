 
 export default {
  path: 'org',
  indexRoute: { component: require('components/project/list/container').default },
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/list').default
      ])
    })
  }
}