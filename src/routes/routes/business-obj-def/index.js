 
export default {
  path: 'business',
  indexRoute: { component: require('components/business-obj-def/container').default },
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/list').default
      ])
    })
  }
}  