const initState = {
    empID: null,
    adminID: null
}
const initAction = {
    empId : 565
}
const rootReducer = (state=initState, action)=>{
    console.log(action)
    if (action.type == 'updateEmpID')
    {
    console.log('updating state')
        return {
            empID : action.empid,
            adminID : null
        }
    }
    return {
        ...state,
        empID : initAction.empId
    };
}
export default rootReducer;