
import assignment from 'components/customer/assign/container';

const route = {
  path: 'cumassignment',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, assignment)
    })
  }
}

export default route