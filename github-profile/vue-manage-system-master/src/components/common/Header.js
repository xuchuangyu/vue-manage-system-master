import require from '../../utils/request'
export default {
    queryMessage(params){
        return  require.get('/v1/comment',{params:{articleId:99999,read:-1,recycle:-1}})
    },
}