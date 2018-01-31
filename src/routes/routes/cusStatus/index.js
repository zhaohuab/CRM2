
import cusStatus from 'components/cusStatus/container/index.jsx';
const route = {
  path: 'customerstate',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, cusStatus)
    })
  }
}

export default route