const request = require('request'),
    rsa_helper = require('./RSA_Helper'),
    NodeRSA = require('node-rsa'),
    

/**
 * Verifies whether we have a session created
 * 
 * @param {electron.session} sessionMiddleware
 * @param {function} callback
 * 
 * @return {void}
 */
hasSession = (session, cb) => {
    session.defaultSession.cookies.get({url: 'https://steamcommunity.com'}, (error, cookies) => {
        if (error)
            console.log(error)

        cb(typeof cookies.sessionid != 'undefined' ? 'yes' : 'no')
      })
}

/**
 * We need the key in order to encrypt the password and 
 * be able to login
 * 
 * @param {string} username
 * 
 * @return {void}
 */
GetRSAKey = (username, cb) => {
    request.post({
        url : "https://steamcommunity.com/login/getrsakey",
        form: { 
            username : username.replace( /[^\x00-\x7F]/g, ''), //remove non ascii
            donotcache: ( new Date().getTime() )
        }
    }, (err, res, body) => {
        if (err)
            console.log("We got a http error getting RSA key, " + err)

        if (typeof body !== 'undefined')
        {
            try
            {
                let json = JSON.parse(body)
                if (json.success)
                {
                    let rsa = {
                        modulus: json.publickey_mod.toString(16),
                        exponent: "10001",//json.publickey_exp.toString(16),
                        timestamp : json.timestamp
                    }
                    console.log(rsa)
                    cb(rsa)
                }
                else
                    console.log("We got the rsa response but wasn't a success")
            }
            catch(e)
            {
                console.log(e)
            }
        }
        else
            console.log("Invalid RSA Key: " + res)
    })
}

/**
 * Performs a sign in into steam page
 */
Authenticate = (username, password, captcha_text, twofactor_code, emailauth_text, captcha_gid) => {
    return new Promise( (resolve, reject) => {
        GetRSAKey(username, (rsa) => {

            var publicKey = rsa_helper(rsa.modulus, rsa.exponent);
            password = password.replace( /[^\x00-\x7F]/g, '') //remove non ascii
            console.log(publicKey)
            const key = new NodeRSA(publicKey, {b: 1024})
           // let encryptedPassword = key.encrypt(password,'base64','utf-8')
            
           /* var encryptStringWithRsaPublicKey = function(toEncrypt, publicKey) {
                //var absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
              //  var publicKey = fs.readFileSync(absolutePath, "utf8");
                var buffer = new Buffer(toEncrypt);
                var encrypted = crypto.publicEncrypt(publicKey, buffer);
                return encrypted.toString("base64");
            }
            */
            //let encryptedPassword = encryptStringWithRsaPublicKey(password, publicKey)


            let encryptedPassword = "HPnNmGKjUf7NRj3DsBswFLjm5ifK/Yvf6MoTnwjiGmv4McVHK2beEhXh3kxkr3jUDDjhM7qh884VWiGoiKpB1THeOoFBXmksPPmINLXiXwnGkLYmtHqocomwNmHwNyvwMcqKaXC735uiCne6F15IQfCzqzWGbfwkDqrjprndkiSvxeCjJ8/cr7m5Rxb4ThKrtqjWE0fm3VLc9kmFYYUwGCsNh7ZoGU+xByw8KJBnhGPsA6GmbzUmkboIUgarJmixJ/t2Hl5lOIaul34MU56fyUkqX71Q88XmpV/Teo0dGe+5ebQemXTG2M716WFsz1CSiMMlCxevFWq/2nII3UhDig=="

            /** Succes message example
             * {  
                "success":true,
                "requires_twofactor":false,
                "login_complete":true,
                "transfer_urls":[  
                    "https:\/\/store.steampowered.com\/login\/transfer",
                    "https:\/\/help.steampowered.com\/login\/transfer"
                ],
                "transfer_parameters":{  
                    "steamid":"76561198358871908",
                    "token_secure":"0F65C45D92EC7699260CA13B9A1E55F4CE86F820",
                    "auth":"d833969d6b17bec13150e9c661b400b2",
                    "remember_login":false,
                    "webcookie":"66821D2DA6EA617699DDCE6FF19F9C6D91B28446"
                }
                }
             */

            console.log(`Authenticating using the username: ${username.replace( /[^\x00-\x7F]/g, '')} and password: ${password.replace( /[^\x00-\x7F]/g, '')}`)
                request.post({
                    url: "https://steamcommunity.com/login/dologin/",
                    form: {
                        username: username.replace( /[^\x00-\x7F]/g, ''),
                        password: encryptedPassword,
                        twofactorcode: twofactor_code,
                        emailauth: emailauth_text,
                        donotcache: ( new Date().getTime() ),
                        captchagid: captcha_gid,
                        captcha_text: captcha_text,
                        emailsteamid : "",
                        loginfriendlyname: "",
                        rsatimestamp : rsa.timestamp
                    }
                }, (err, res, body) =>{
                    if (err)
                        console.log(err)
    
                    console.log(body)
                    let response = JSON.parse(body)
                    
                    let data = {
                        type: '', //invalid_details, success, emailauthcode, etc so we can filter in the promise
                        captcha_image : ''
                    }

                    console.log("Captcha GID checking...")
                    if (response != "" && response.captcha_gid != "")
                    {
                        captcha_gid = "todo"
                    }
    
                    console.log("Captcha checking...")
                    if (response != "" && response.captcha_needed)
                    {
                        console.log("We do need captcha")
                        request.get(`https://steamcommunity.com/public/captcha.php?gid=${captcha_gid}`, (err, res, body) => {
                            if (err)
                                console.log("Error getting the cpatcha" + err)
                            
                            if (typeof body != "undefined")
                            {
                                console.log("We got the image, encoding to base64..")
                                // convert binary data to base64 encoded string
                                data.captcha_image = new Buffer(body).toString('base64');
                                data.type = 'captcha_needed'
                                resolve(data)
                            }
                        })
                    }
    
                    console.log("Steam guard checking...")
                    if (response != "" && response.emailauth_needed)
                    {
                        console.log("We do need steam guard authentication, type the code")
                        data.type = 'steamguardcode'
                        data.captcha_image = ''
                        resolve(data)
                    }

                })
        })
    })
}

module.exports = {
    Authenticate,
    hasSession
}