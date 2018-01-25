
import distributed from 'components/customer-distributed/container/index.jsx';
const route = {
  path: 'cusDistributed',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, distributed)
    })
  }
}

export default route