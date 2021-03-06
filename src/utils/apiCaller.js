import axios from 'axios';

// const api_url = 'https://api-user-gia-su.herokuapp.com';
const api_user_url = 'http://localhost:3000';
const api_admin_url = 'http://localhost:3002';


export function callApiLogin(body) {
    return axios({
        method: 'POST',
        url: `${api_user_url}/user/login`,
        data: {
            username: body.username,
            password: body.password
        }
    });
}

export function callApiLoginFacebook(options) {
    return axios({
        method: 'POST',
        url: `${api_user_url}/user/login/facebook`,
        mode: 'cors',
        data: options
    });
}

export function callApiLoginGoogle(options) {
    return axios({
        method: 'POST',
        url: `${api_user_url}/user/login/google`,
        mode: 'cors',
        data: options
    });
}


export function callApiRegister(body) {
    return axios({
        method: 'POST',
        url: `${api_user_url}/user/register`,
        data: {
            username: body.username,
            password: body.password,
            phone: body.phone,
            fullname: body.fullname,
            email: body.email,
            avatar: body.avatar,
            birthday: body.birthday._d,
            address: body.address,
            strategy: body.strategy,
            status: body.status
        }
    });
}

export function callApiUpdateInfoRegister(body) {
    return axios({
        method: 'POST',
        url: `${api_user_url}/user/update-info-register`,
        headers: {
            Authorization: `Bearer ${body.token}`
        },
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

export function callApiChangePassword(body) {
    return axios({
        method: 'PUT',
        url: `${api_user_url}/user/change-password`,
        data: {
            old_password: body.old_password,
            new_password: body.new_password,
            _id: body._id
        }
    });
}

export function callApiForgotPassword(body) {
    return axios({
        method: 'PUT',
        url: `${api_user_url}/user/forgot-password`,
        data: {
            username: body.username,
            fullname: body.fullname,
            new_password: body.new_password
        }
    });
}


export function callApiIntroduction(body) {
    return axios({
        method: 'POST',
        url: `${api_user_url}/user/introduction`,
        headers: {
            Authorization: `Bearer ${body.token}`
        },
        data: {
            introduce: body.introduce,
            teaching_address: body.teaching_address,
            price_per_hour: body.price_per_hour,
            tags: body.tags
        }
    });
}

export function callApiGetAllTeacher() {
    return axios({
        method: 'GET',
        url: `${api_user_url}/teacher`,
    });
}

export function callApiGetFilterTeacher(values) {
    return axios({
        method: 'POST',
        url: `${api_user_url}/teacher`,
        data: {
            valueAddress: values.valueAddress,
            valuePrice: values.valuePrice,
            valueSubject: values.valueSubject
        }
    });
}

export function callApiGetAllTag() {
    return axios({
        method: 'GET',
        url: `${api_admin_url}/tag`,
    });
}

export function callApiAddContractUser(contract) {
    return axios({
        method: 'PUT',
        url: `${api_user_url}/contract`,
        data: contract
    });
}

export function callApiAddContractAdmin(contract) {
    return axios({
        method: 'POST',
        url: `${api_admin_url}/contract`,
        data: contract
    });
}

export function callApiGetUser(_id) {
    return axios({
        method: 'GET',
        url: `${api_user_url}/${_id}`,
    });
}

export function callApiChangeStatusContractAdmin(item) {
    return axios({
        method: 'PUT',
        url: `${api_admin_url}/contract/status/admin`,
        data: item
    })
}

export function callApiChangeStatusContractUser(item) {
    return axios({
        method: 'PUT',
        url: `${api_user_url}/contract/status/user`,
        data: item
    })
}

export function callApiAddComment(item) {
    return axios({
        method: 'PUT',
        url: `${api_user_url}/comment`,
        data: {
            id_teacher: item._id,
            comment: item.comment
        }
    })
}

export function callApiAddRate(item) {
    return axios({
        method: 'PUT',
        url: `${api_user_url}/rate`,
        data: {
            id_teacher: item._id,
            rate: item.rate
        }
    })
}

export function callApiCountLearnerAndRevenue(_id) {
    return axios({
        method: 'GET',
        url: `${api_user_url}/revenue/${_id}`
    })
}

