
import organizationList from 'components/org/orgList/container';

const route = {
  path: 'page/org',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, organizationList)
    })
  }
}

export default route