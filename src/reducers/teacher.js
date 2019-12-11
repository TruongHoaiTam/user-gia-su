const initState = {
    introduce: undefined,
    teaching_address: undefined,
    price_per_hour: undefined,
    tags: undefined
};

export default function teacher(state = initState, action) {
    switch (action.type) {
        case 'SAVE_INTRODUCTION':
            state = {
                ...state,
                introduce: action.info.introduce,
                teaching_address: action.info.teaching_address,
                price_per_hour: action.info.price_per_hour,
                tags: action.info.tags
            };
            return state;
        default:
            return state;
    }
}
