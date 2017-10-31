
export default {
  path: 'list',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('components/measure/list/container').default)
    })
  }
}