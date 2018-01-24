
import distributed from 'components/customer-distributed/container/map/PanelMap.jsx';
const route = {
  path: 'cusDistributed',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, distributed)
    })
  }
}

export default route