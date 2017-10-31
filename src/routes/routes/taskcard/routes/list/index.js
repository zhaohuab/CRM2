
export default {
  path: 'list',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('components/taskcard/list/container').default)
    })
  }
}