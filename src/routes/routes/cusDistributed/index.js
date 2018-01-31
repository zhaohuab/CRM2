
import distributed from 'components/cusDistributed/container/index.jsx';
const route = {
  path: 'customerchart',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, distributed)
    })
  }
}

export default route