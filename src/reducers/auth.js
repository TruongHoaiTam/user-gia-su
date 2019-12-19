const initState = {
    _id: undefined,
    username: undefined,
    email: undefined,
    phone: undefined,
    fullname: undefined,
    avatar: undefined,
    birthday: undefined,
    address: undefined,

    status: undefined,
    token: undefined,
    strategy: undefined,
    token_fb_gg: undefined,

    err: undefined,

    introduce: undefined,
    teaching_address: undefined,
    price_per_hour: undefined,
    tags: [],

    all_tags: []
};

export default function auth(state = initState, action) {
    switch (action.type) {
        case 'LOGIN':
            state = {
                ...state,
                _id: action.user._id,
                username: action.user.username,
                email: action.user.email,
                phone: action.user.phone,
                fullname: action.user.fullname,
                avatar: action.user.avatar,
                birthday: action.user.birthday,
                address: action.user.address,
                token: action.user.token,
                strategy: action.user.strategy,
                status: action.user.status,
                err: undefined,

                introduce: action.user.introduce,
                teaching_address: action.user.teaching_address,
                price_per_hour: action.user.price_per_hour,
                tags: action.user.tags
            }
            return state;
        case 'LOGIN_ERR': {
            state = {
                ...state,
                _id: undefined,
                username: undefined,
                email: undefined,
                phone: undefined,
                fullname: undefined,
                avatar: undefined,
                birthday: undefined,
                address: undefined,
                token: undefined,
                strategy: undefined,
                status: undefined,
                err: 400,

                introduce: undefined,
                teaching_address: undefined,
                price_per_hour: undefined,
                tags: undefined
            };
            return state;
        }
        case 'LOGIN_BLOCK': {
            state = {
                ...state,
                _id: undefined,
                username: undefined,
                email: undefined,
                phone: undefined,
                fullname: undefined,
                avatar: undefined,
                birthday: undefined,
                address: undefined,
                token: undefined,
                strategy: undefined,
                status: undefined,
                err: 'BLOCK',

                introduce: undefined,
                teaching_address: undefined,
                price_per_hour: undefined,
                tags: undefined
            };
            return state;
        }
        case 'SET_STATE_LOGIN': {
            state = {
                ...state,
                token_fb_gg: action.values.token_fb_gg,

                _id: action.values.user._id,
                username: action.values.user.username,
                email: action.values.user.email,
                status: action.values.user.status,
                err: undefined
            }
            return state;
        }
        case 'SAVE_INTRODUCTION': {
            state = {
                ...state,
                introduce: action.info.introduce,
                teaching_address: action.info.teaching_address,
                price_per_hour: action.info.price_per_hour,
                tags: action.info.tags,

                all_tags: action.info.all_tags
            };
            return state;
        }
        default:
            return state;
    }
}
