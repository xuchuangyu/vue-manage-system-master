import require from '../utils/request'
export const queryList=(params)=>{
    return  require.get('/v1/banner/list',{
        params,
    })
}
