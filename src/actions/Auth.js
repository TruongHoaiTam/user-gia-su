import { callApiLogin, callApiLoginFacebook, callApiLoginGoogle } from '../utils/apiCaller';

export const actLogin = user => ({
    type: 'LOGIN',
    user
});

export const actLoginErr = () => ({
    type: 'LOGIN_ERR'
});

export const actLoginRequest = user => {
    return dispatch => {
        return callApiLogin(user)
            .then(res => {
                localStorage.setItem('username', res.data.user.username);
                localStorage.setItem('email', res.data.user.email);
                localStorage.setItem('fullname', res.data.user.fullname);
                localStorage.setItem('phone', res.data.user.phone);
                localStorage.setItem('avatar', res.data.user.avatar);
                localStorage.setItem('address', res.data.user.address);
                localStorage.setItem('birthday', res.data.user.birthday);
                localStorage.setItem('strategy', res.data.user.strategy);
                localStorage.setItem('token', res.data.token);
                dispatch(actLogin(res.data));
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
                localStorage.setItem('username', res.data.user.username);
                localStorage.setItem('email', res.data.user.email);
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
                localStorage.setItem('username', res.data.user.username);
                localStorage.setItem('email', res.data.user.email);
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
                username: localStorage.getItem('username'),
                email: localStorage.getItem('email'),
                fullname: localStorage.getItem('fullname'),
                phone: localStorage.getItem('phone'),
                avatar: localStorage.getItem('avatar'),
                birthday: localStorage.getItem('birthday'),
                address: localStorage.getItem('address'),
                strategy: localStorage.getItem('strategy'),
                token: localStorage.getItem('token')
            })
        );
    };
};


export const actLogout = () => {
    return dispatch => {
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('fullname');
        localStorage.removeItem('phone');
        localStorage.removeItem('avatar');
        localStorage.removeItem('birthday');
        localStorage.removeItem('address');
        localStorage.removeItem('strategy');
        localStorage.removeItem('token');
        dispatch(actLogin({ username: undefined, token: undefined }));
    };
};