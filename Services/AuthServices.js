import { getData, postData, search } from "../Networking/Network";
import {
  base_url,
  food,
  loginUrl,
  searchUrl,
  foodUrl
} from "../Networking/Config/Config";

/**
 * Get All Food Data
 * @param {*} callback
 */

export function getFoods(callback) {
  callback(getData(`${base_url}${foodUrl}`, response => callback(response)));
}

export function searchFoods(keyword, callback) {
  search(`${base_url}${searchUrl}`, keyword, response => callback(response));
}

/**
 *
 * @param {*} email
 * @param {*} password
 * @param {*} callback
 */

export async function login(email, password, callback) {
  var body = {
    email: email,
    password: password
  };
  postData(`${base_url}${loginUrl}`, body, (data, code) => {
    callback(data);
  });
}


