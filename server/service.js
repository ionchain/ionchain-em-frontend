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
    },
    async getHisProfit({txTo} = {}){
        var data = {}
        try{
            await API.getHisProfit({txTo}).then((res)=>{
                // console.log('getHisProfit@:', res.data )
                if( res.data.code == 0 ){
                    data = res.data.data
                }
            })
            return data
        } catch (err) {
            return data
        }
    },
    async getCollectList({collectId} = {}){
        var data = []
        try{
            await API.getCollectList({collectId}).then((res)=>{
                if(res.data.success == 0){
                    data = res.data.data
                }
            })
        }catch (err){
            console.log(err)
            return data
        } 
        return data
    },
    // userInfo
    async userInfo({userId} = {}){
        var data = {}
        try{
            await API.userInfo({userId}).then((res)=>{
                if(res.data.success == 0){
                    data = res.data.data
                }
            })
        }catch (err){
            console.log(err)
            return data
        } 
        return data
    },
    
}