import speech from 'components/speech/list/container';

const route = {
    path: 'speech',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null,speech)
        })
    }
}

export default route