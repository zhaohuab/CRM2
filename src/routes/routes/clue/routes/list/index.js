import clue from 'components/clue/list/container';

const route = {
    path: 'clue',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, clue)
        })
    }
}

export default route