const express = require('express')
const Router = express.Router()
const fetch = require('isomorphic-fetch')

let accessToken = null;

Router.post('/access-token', (req, res) => {
    const URL = 'https://www.linkedin.com/oauth/v2/accessToken';
    const otherParam = {
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=authorization_code&code=${req.body.code}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin-callback&client_id=819p99j7y3uowi&client_secret=wzRPEVDpXZXul361`,
        method: "POST",
    };

    fetch(URL, otherParam)
    .then(data => {return data.json()})
    .then(response => {
        accessToken = response.access_token;
        res.json({ success: true });
    })
    .catch(error => {console.log('error: ', error);})
});

  Router.get('/get-profile-details', (req, res) =>{
    const URL = 'https://api.linkedin.com/v1/people/~:(email-address,id,first-name,last-name,industry,picture-url,public-profile-url,headline)?format=json';
    const otherParam = {
        headers: {
            "authorization": `Bearer ${accessToken}`
        },
        method: "GET",
    };

    fetch(URL, otherParam)
    .then(data => {return data.json()})
    .then(response => {
        res.send(response);
    })
    .catch(error => {console.log('error: ', error);})
  })

module.exports = Router;