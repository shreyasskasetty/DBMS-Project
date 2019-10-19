const rootReducer = (state, action)=>{
    console.log(state)
    if (action.type === 'updateEmpID')
    {
    console.log('updating state')
        return {
            empID : parseInt( action.empid) ,
            eLogin : action.eLogin,
            aLogin : false,
            adminID : null
        }
    }
   
    return ({
        empID : -1,
        adminID : -1,
        eLogin : false ,
        aLogin : false
    })
}
export default rootReducer;