import require from '../../utils/request'
export default {
    queryMessage(){
        return  require.get('/v1/comment/message',{})
    },
    PutMessage(params){
        return  require.put(`/v1/comment/${params.id}`,JSON.stringify(params), {
            headers:{
                'Content-Type':"application/json",
            }
          })
    }
}