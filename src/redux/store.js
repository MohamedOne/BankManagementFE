
const intitialState = {
    permAccountNumber : 0,
    customerID: 0
}

const RootReducer = (state = intitialState, action) => {

    switch(action.type) {
        case 'PUT_PAN':
            return {
                ...state,
                permAccountNumber: action.payload
            }
        case 'PUT_CID':
            return {
                ...state,
                customerID: action.payload
            }
        default:
            return state
    }
}
export default RootReducer