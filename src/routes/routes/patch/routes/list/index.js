import patch from 'components/patch/list/container';

const route = {
    path: 'patch',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, patch)
        })
    }
}

export default route