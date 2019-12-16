const initState = {
    current_teacher: undefined
};

export default function detail(state = initState, action) {
    switch (action.type) {
        case 'SET_CURRENT_TEACHER':
            state = {
                ...state,
                current_teacher: action.current_teacher
            }
            return state;
        default:
            return state;
    }
}
