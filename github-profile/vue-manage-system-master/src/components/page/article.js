import require from '../../utils/request'
export default {
    queryList(params){
        return  require.get('/v1/article/list',{
            params,
          })
    },
    queryCategoryList(){
        return  require.get('/v1/category')
    },
    create(params){
        return  require.post('/v1/article/create',JSON.stringify(params), {
            headers:{
                'Content-Type':"application/json",
            }
          })
    },
    del(id){
        return  require.delete(`/v1/article/${id}`,{}, {
            headers:{
                'Content-Type':"application/json",
            }
        })
    },
    queryDetail(id){
        return  require.get(`/v1/article/${id}`)
    },
    update(params){
        return  require.put(`/v1/article/${params.id}`,JSON.stringify(params), {
            headers:{
                'Content-Type':"application/json",
            }
        })
    },
    postComment(params){
        return  require.post('/v1/comment',JSON.stringify(params), {
            headers:{
                'Content-Type':"application/json",
            }
          })
    },
}