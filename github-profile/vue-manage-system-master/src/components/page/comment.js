import require from '../../utils/request';
export default {
    queryComment(){
        return  require.get('/v1/comment/list',{})
    },
}