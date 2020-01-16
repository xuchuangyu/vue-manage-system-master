
import axios from 'axios';
import require from '../../utils/request'
export default {
    addTodoList(params){
       return  require.post('/v1/todoList',JSON.stringify(params), {
            headers:{
                'Content-Type':"application/json",
            }
          })
    },
    editTodoList(params){
        return  require.put('/v1/todoList',JSON.stringify(params), {
             headers:{
                 'Content-Type':"application/json",
             }
           })
     },
    queryTodoList(params){
          return  require.get('/v1/todoList',{
            params,
          })
    },
    delTodoList(id){
      return  require.delete(`/v1/todoList/${id}`)
    }
}