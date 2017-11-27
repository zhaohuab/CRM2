export default {
    path: 'visitrules',
    indexRoute: { component: require('components/visitrules/container').default },
    getChildRoutes(partialNextState, cb) {
      require.ensure([], (require) => {
        cb(null, [
          require('components/visitrules/container').default
        ])
      })
    }
  }