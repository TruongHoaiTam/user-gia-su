import { callApiLogin, callApiLoginFacebook, callApiLoginGoogle } from '../utils/apiCaller';

export const actLogin = user => ({
    type: 'LOGIN',
    user
});

export const actLoginErr = () => ({
    type: 'LOGIN_ERR'
});

export const actLoginBlock = () => ({
    type: 'LOGIN_BLOCK'
});

export const actLoginRequest = user => {
    return dispatch => {
        return callApiLogin(user)
            .then(res => {
                console.log(res.data)
                if (res.data.user.status === 'active') {
                    localStorage.setItem('_id', res.data.user._id);
                    localStorage.setItem('username', res.data.user.username);
                    localStorage.setItem('email', res.data.user.email);
                    localStorage.setItem('fullname', res.data.user.fullname);
                    localStorage.setItem('phone', res.data.user.phone);
                    localStorage.setItem('avatar', res.data.user.avatar);
                    localStorage.setItem('address', res.data.user.address);
                    localStorage.setItem('birthday', res.data.user.birthday);
                    localStorage.setItem('strategy', res.data.user.strategy);
                    localStorage.setItem('status', res.data.user.status);
                    localStorage.setItem('token', res.data.token);


                    localStorage.setItem('introduce', res.data.user.introduce);
                    localStorage.setItem('teaching_address', res.data.user.teaching_address);
                    localStorage.setItem('price_per_hour', res.data.user.price_per_hour);
                    localStorage.setItem('tags', res.data.user.tags);
                } else {
                    dispatch(actLoginBlock());
                }
            })
            .catch(() => {
                dispatch(actLoginErr());
            });
    };
};

export const actSetStateLogin = values => ({
    type: 'SET_STATE_LOGIN',
    values
});

export const actLoginFacebookRequest = options => {
    return dispatch => {
        return callApiLoginFacebook(options)
            .then(res => {
                localStorage.setItem('_id', res.data.user._id);
                localStorage.setItem('username', res.data.user.username);
                localStorage.setItem('email', res.data.user.email);
                localStorage.setItem('status', res.data.user.status);
                dispatch(actSetStateLogin({ user: res.data.user, token: res.data.token }))
            })
            .catch(() => {
                dispatch(actLoginErr());
            });
    };
};

export const actLoginGoogleRequest = options => {
    return dispatch => {
        return callApiLoginGoogle(options)
            .then(res => {
                localStorage.setItem('_id', res.data.user._id);
                localStorage.setItem('username', res.data.user.username);
                localStorage.setItem('email', res.data.user.email);
                localStorage.setItem('status', res.data.user.status);
                dispatch(actSetStateLogin({ user: res.data.user, token: res.data.token }))
            })
            .catch(() => {
                dispatch(actLoginErr());
            });
    };
};

export const actGetUser = () => {
    return dispatch => {
        dispatch(
            actLogin({
                _id: localStorage.getItem('_id'),
                username: localStorage.getItem('username'),
                email: localStorage.getItem('email'),
                fullname: localStorage.getItem('fullname'),
                phone: localStorage.getItem('phone'),
                avatar: localStorage.getItem('avatar'),
                birthday: localStorage.getItem('birthday'),
                address: localStorage.getItem('address'),
                strategy: localStorage.getItem('strategy'),
                status: localStorage.getItem('status'),
                token: localStorage.getItem('token'),

                introduce: localStorage.getItem('introduce'),
                teaching_address: localStorage.getItem('teaching_address'),
                price_per_hour: localStorage.getItem('price_per_hour'),
                tags: localStorage.getItem('tags'),
            })
        );
    };
};


export const actLogout = () => {
    return dispatch => {
        localStorage.removeItem('_id');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('fullname');
        localStorage.removeItem('phone');
        localStorage.removeItem('avatar');
        localStorage.removeItem('birthday');
        localStorage.removeItem('address');
        localStorage.removeItem('strategy');
        localStorage.removeItem('status');
        localStorage.removeItem('token');

        localStorage.removeItem('introduce');
        localStorage.removeItem('teaching_address');
        localStorage.removeItem('price_per_hour');
        localStorage.removeItem('tags');
        dispatch(actLogin({ username: undefined, token: undefined }));
    };
};

export const actSaveIntroduction = info => ({
    type: 'SAVE_INTRODUCTION',
    info
});


