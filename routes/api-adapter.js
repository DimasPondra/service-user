const axios = require("axios");
const { AXIOS_TIMEOUT } = process.env;

module.exports = (baseURL) => {
    return axios.create({
        baseURL: baseURL,
        timeout: parseInt(AXIOS_TIMEOUT),
    });
};
