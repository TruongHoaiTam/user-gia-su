const initState = {
    username: undefined,
    email: undefined,
    phone: undefined,
    fullname: undefined,
    avatar: undefined,
    birthday: undefined,
    address: undefined,

    token: undefined,
    strategy: undefined,
    token_fb_gg: undefined,

    err: undefined
};

export default function auth(state = initState, action) {
    switch (action.type) {
        case 'LOGIN':
            state = {
                ...state,
                username: action.user.username,
                email: action.user.email,
                phone: action.user.phone,
                fullname: action.user.fullname,
                avatar: action.user.avatar,
                birthday: action.user.birthday,
                address: action.user.address,
                token: action.user.token,
                strategy: action.user.strategy,
                err: undefined
            };
            return state;
        case 'LOGIN_ERR': {
            state = {
                ...state,
                username: undefined,
                email: undefined,
                phone: undefined,
                fullname: undefined,
                avatar: undefined,
                birthday: undefined,
                address: undefined,
                token: undefined,
                strategy: undefined,
                err: 400
            };
            return state;
        }
        case 'SET_STATE_LOGIN': {
            state = {
                ...state,
                token_fb_gg: action.values.token_fb_gg,

                username: action.values.user.username,
                email: action.values.user.email,
                err: undefined
            }
            return state;
        }
        default:
            return state;
    }
}
