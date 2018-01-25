import customer from 'components/customer/groupList/container';

const route = {
  path: 'groupcustomer',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, customer)
    })
  }
}

export default route