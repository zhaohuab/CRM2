import finishTask from 'components/finishTask/list/container';

const route = {
    path: 'finishTask',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null,finishTask)
        })
    }
}

export default route