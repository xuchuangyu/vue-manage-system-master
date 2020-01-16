import require from '../../utils/request'
export default {
    queryList(params){
        return  require.get('/v1/article/list',{
            params,
          })
    },
    create(params){
        return  require.post('/v1/article/create',JSON.stringify(params), {
            headers:{
                'Content-Type':"application/json",
            }
          })

    }
}