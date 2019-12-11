import axios from 'axios';

// const api_url = 'https://api-user-gia-su.herokuapp.com';
const api_url = 'http://localhost:3000';


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

export function callApiUpdateInfoRegister(body) {
    console.log(body)
    return axios({
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${body.token}`
        },
        url: `${api_url}/user/update-info-register`,
        data: {
            username: body.username,
            phone: body.phone,
            fullname: body.fullname,
            email: body.email,
            avatar: body.avatar,
            birthday: body.birthday._d,
            address: body.address
        }
    });
}


export function callApiIntroduction(body) {
    console.log(body)
    return axios({
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${body.token}`
        },
        url: `${api_url}/user/introduction`,
        data: {
            introduce: body.introduce,
            teaching_address: body.teaching_address,
            price_per_hour: body.price_per_hour,
            tags: body.tags
        }
    });
}