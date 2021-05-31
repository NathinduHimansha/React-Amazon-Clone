//datalayer - (global store to the app)
// reducer <- tells how we able to distpatch action into data layer & how to pull into components
//like reducer knows when data added okaaaay i know what to do like that

//data
export const initialState = {
  basket: [],
  user: null,
};

//works as listner - he knows what to do to data layer
const reducer = (state, action) => {
  switch (action.type) {
    //copy the basket remains and add new value
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "REMOVE_FROM_BASKET":
      //   return{...state,basket: [...state.basket.filter(item => item.id !== action.id)]}
      //going this way beause its only needs to selected one item because same product has same id. if all items(multiple same
      //product has different ids)totally unique can use above function

      //---------------------------------
      //function for same id has and each added product shows seprertle(same item can be many times(its means same id))
      //but we want to remove once only
      //getting the index selected id by the user from the state
      const index = state.basket.findIndex((basketItem) => basketItem.id === action.id);
      //copy of basket
      let newBasket = [...state.basket];

      if (index >= 0) {
        //splices(removes) the item from index once(given as removed only once by 1)
        newBasket.splice(index, 1);
      } else {
        alert(`cant remove product(id:${action.id} as it is not in basket!)`);
      }
      return {
        ...state,
        basket: newBasket,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    default:
      return state;
  }
};
export default reducer;

//function to calculate total
//this is a function  which is works as for loop and returns the value
//reduce() iterate among the basket, amount is temp variable and initial value is 0(which is defined)
//item is retrived from passed object and its adding to thr amount and after iteartor done retuens is
//reduce is powerfull function
export const getBasketTotal = (basket) => basket?.reduce((amount, item) => item.price + amount, 0);
