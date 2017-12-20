
export default {
  path: 'list',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('components/business-obj-def/container').default)
    })
  }
}