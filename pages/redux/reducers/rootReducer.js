const initialState = {
    cart:[]
};

function rootReducer(state = initialState.cart ,action) {
    switch (action.type) {
        case 'ADD_TO_CART':
             var addedItem = state.find(c =>c.element.publicId === action.payload.element.publicId);
            if(addedItem){
                var newState = state.map(cart_Item => {
                    if(cart_Item.element.publicId === action.payload.element.publicId){
                        return Object.assign({},addedItem,{quantity:addedItem.quantity+1})
                    }
                    return cart_Item;
                })
                return newState;
            }else{
                return [...state,action.payload]
            }
        case 'REMOVE_FROM_CART':
           const newState2 = state.filter(cart_Item=>cart_Item.element.publicId !== action.payload.element.publicId)
          return newState2
          case 'REMOVE_FROM_CART_FOR_NEW':
            const newState3 = state.filter(cart_Item=>cart_Item.element.publicId !== action.payload.publicId)
           return newState3
        default: return state
    }
}

export default rootReducer;