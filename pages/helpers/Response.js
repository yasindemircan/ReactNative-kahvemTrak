const fetch = require('node-fetch');
const Bluebird = require('bluebird');
var querystring = require('query-string');
const URL = 'http://192.168.1.3:3030/'
fetch.Promise = Bluebird;

export const TokenResponse = async (URLparams, token) => {
  try {
    const active = await fetch(URL + URLparams, {
      method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: token
    })
    let response = await active.json()
    return response
  } catch (error) {

    console.log(error, " HATA")
    return error
  }
}

