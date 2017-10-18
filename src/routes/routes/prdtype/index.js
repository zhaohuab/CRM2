 
export default {
  path: 'prdtype',
  indexRoute: { component: require('components/prdtype/orgList/container').default },
  getChildRoutes(partialNextState, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/orgList').default
      ])
    })
  }
}