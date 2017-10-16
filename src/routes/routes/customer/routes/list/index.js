
import customer from 'components/customer/list/container';

const route = {
  path: 'customer',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, customer)
    })
  }
}

export default route