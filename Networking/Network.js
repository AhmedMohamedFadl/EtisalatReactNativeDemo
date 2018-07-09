import Axios, { } from 'axios'

export async function getData(url, callback) {
    Axios.get(url).then(function (response) {
        console.log('getdata response: ');
        callback(response.data);
    }).catch(function (error) {
        console.log("getdata error: " + error.response.data)
    });
}

export async function search(url, keyword, callback) {
    Axios.get(url, {params: {q: keyword}}).then(function (response) {
        console.log('search response' + response.data)
        callback(response.data)
    }).catch(function (error) {
        console.log('search error' + error.response.data)
    });
}

export async function postData(url, body , callback) {
    Axios.post(url, body)
        .then(function (response) {
            console.log("post data : " +response.data)
            callback(response.data, response.status)
        })
        .catch(function (error) {
            callback(error.response.data, error.response.status)
            console.log("post error :" + error.response.data)
        });

}      