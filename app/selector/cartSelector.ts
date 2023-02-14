import { createSelector } from 'reselect';

export const getCartData = (state: any) => {
  return state.cart.cartData;
};

export const getCartDataState = createSelector(
  [getCartData],
  (cartData) => {
    return cartData;
  }
);

// const getCustomer = (state, props) => {
//   const id = props.id
//   const customerById = state.customers.find((item,i) => item.id === id)
//   return customerById
// }

// export const makeGetCustomerState = () => createSelector(
//   [ getCustomer ],
//   (customer) => customer
// )

// const makeMapStateToProps = () => {
//   const getCustomerState = makeGetCustomerState()
//   const mapStateToProps = (state, props) => {
//     return {
//        customer: getCustomerState(state, props)
//     }
//    }
//   return mapStateToProps
//  }