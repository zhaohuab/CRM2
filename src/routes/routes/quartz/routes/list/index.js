import quartz from 'components/quartz/list/container';

const route = {
    path: 'quartz',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null,quartz)
        })
    }
}

export default route