import axios from 'axios';

const api_url = 'https://api-user-gia-su.herokuapp.com';

export function callApiLogin(body) {
    return axios({
        method: 'POST',
        url: `${api_url}/user/login`,
        data: {
            username: body.username,
            password: body.password
        }
    });
}

export function callApiLoginFacebook(options) {
    return axios({
        method: 'POST',
        url: `${api_url}/user/login/facebook`,
        mode: 'cors',
        data: options
    });
}

export function callApiLoginGoogle(options) {
    return axios({
        method: 'POST',
        url: `${api_url}/user/login/google`,
        mode: 'cors',
        data: options
    });
}


export function callApiRegister(body) {
    return axios({
        method: 'POST',
        url: `${api_url}/user/register`,
        data: {
            username: body.username,
            password: body.password,
            phone: body.phone,
            fullname: body.fullname,
            email: body.email,
            avatar: body.avatar,
            birthday: body.birthday._d,
            address: body.address,
            strategy: body.strategy
        }
    });
}
