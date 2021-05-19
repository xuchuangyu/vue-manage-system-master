import require from '../../utils/request'
export default {
    postToken(params){
        return  require.post('/v1/token',JSON.stringify(params), {
            headers:{
                'Content-Type':"application/json",
            }
          })
    }
}