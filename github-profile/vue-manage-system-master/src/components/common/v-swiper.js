import require from '../../utils/request'
export default {
    queryCategoryList(){
        return  require.get('/v1/category')
    },
}