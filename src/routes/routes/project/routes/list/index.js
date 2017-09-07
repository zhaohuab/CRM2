
import projectList from 'components/project/list/container';

const route = {
  path: 'list',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, projectList)
    })
  }
}

export default route