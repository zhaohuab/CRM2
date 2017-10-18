
export default {
  path: 'orgList',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('components/prdtype/orgList/container').default)
    })
  }
}