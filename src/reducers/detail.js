const initState = {
    current_teacher: undefined,
    current_contract: undefined
};

export default function detail(state = initState, action) {
    switch (action.type) {
        case 'SET_CURRENT_TEACHER':
            state = {
                ...state,
                current_teacher: action.current_teacher
            }
            return state;
        case 'SET_CURRENT_CONTRACT':
            state = {
                ...state,
                current_contract: action.current_contract
            }
            return state;
        default:
            return state;
    }
}
