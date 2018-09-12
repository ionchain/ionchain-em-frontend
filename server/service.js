const API = require('./api.js')

module.exports = {
    async getDevice({userId} = {}){
        console.log("userId@", userId);
        return API.getDevice({userId}).then((res)=>{
            console.log('res.data>>', res.data.data)
        })
    }
}