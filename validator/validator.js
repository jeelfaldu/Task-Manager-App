const data = require('../auth/auth.js')
function Validet() {
    let obj = {
        name: 'jeel',
        email: "faldujeel#mail.com"
    }
    console.log(obj);
    data.signup(JSON.stringify(obj))
    return true
}