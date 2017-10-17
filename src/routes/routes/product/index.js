//import product from 'components/product/list/container';
export default {
    path: 'product',
    indexRoute: { component: require('components/product/list/container').default },
    getChildRoutes(partialNextState, cb) {
      require.ensure([], (require) => {
        cb(null, [
          require('components/product/list/container').default
        ])
      })
    }
  }