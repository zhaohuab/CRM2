
export default {
  path: 'list',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('components/doc/list/container').default)
    })
  }
}