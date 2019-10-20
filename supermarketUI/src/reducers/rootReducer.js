const initstate = {
    empid: -1,
    adminid: -1,
    eLogin: false,
    aLogin: false
}
const rootReducer = (state = initstate, action)=>{
     switch(action.type){
         case 'updateEmpID': 
         state ={
             ...state,
            empid:action.empid ,
            eLogin:action.eLogin
         }
         break;
         case 'updateAdminID':
             state ={
                 ...state,
                 adminid: action.adminid ,
                 aLogin: action.aLogin
             }
             break;
     }
     return state;
    }
export default rootReducer;