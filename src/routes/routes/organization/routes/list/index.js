
import organizationList from 'components/organization/organizationList/container';

const route = {
  path: 'page/organization',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, organizationList)
    })
  }
}

export default route