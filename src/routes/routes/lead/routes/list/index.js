import lead from 'components/lead/list/container';

const route = {
    path: 'lead',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, lead)
        })
    }
}

export default route