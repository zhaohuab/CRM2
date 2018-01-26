import customer from 'components/customer/groupAssign/container';

const route = {
  path: 'groupcumassignment',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, customer)
    })
  }
}

export default route