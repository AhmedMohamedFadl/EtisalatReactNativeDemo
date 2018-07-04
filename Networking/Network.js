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

export async function postData(url, body , data ) {
    // Axios.post({
    //     method: 'post',
    //     url: url,
    //     data: data
    //   }).then(function (response) {
    //     return response
    //   })
    //   .catch(function (error) {
    //     throw error
    //   });


    Axios.post(url, body)
        .then(function (response) {
            console.log(response.status)
            data(response.data)
        })
        .catch(function (error) {
            data(error.response.data)
            console.log(error.response.status)
        });

}