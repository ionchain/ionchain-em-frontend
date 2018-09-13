const API = require('./api.js')

module.exports = {
    async getDeviceList({userId} = {}){
        var data = []
        try{
            await API.getDeviceList({userId}).then((res)=>{
                if( res.data.success == 0 ){
                    data = res.data.data
                }
            })
        } catch (err) {
            console.log(err)
            return data
        }
        return data
    },
    async getDeviceDesc({deviceId} = {}){
        var data = {}
        try{
            await API.getDeviceDesc({deviceId}).then((res)=>{
                if( res.data.success == 0 ){
                    data = res.data.data
                }
            })
        } catch (err) {
            console.log(err)
            return data
        }
        return data
    }
}