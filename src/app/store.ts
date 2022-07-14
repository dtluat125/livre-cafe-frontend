import { configureStore } from '@reduxjs/toolkit';
import { bookApi } from '@app/app/services/books/books-api-slice';
import { drinkApi } from '@app/app/services/drinks/drinks-api-slice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '@app/app/sagas/rootSaga';
import drinksReducer from '@app/app/features/drinks/drinks-slice';
import booksReducer from '@app/app/features/books/books-slice';
import customersReducer from '@app/app/features/customers/customers-slice';
import ordersReducer from '@app/app/features/orders/orders-slice';
import authenticationReducer from '@app/app/features/authentication/authentication-slice';
import staffsReducer from '@app/app/features/staffs/staffs-slice';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    drinks: drinksReducer,
    books: booksReducer,
    customers: customersReducer,
    orders: ordersReducer,
    authentication: authenticationReducer,
    staffs: staffsReducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [drinkApi.reducerPath]: drinkApi.reducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({
      serializableCheck: {
        // Ignore these action types
        // ignoredActions: ['your/action/type'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.callback'],
        // Ignore these paths in the state
        // ignoredPaths: ['items.dates'],
      },
    })
      .concat(bookApi.middleware)
      .concat(drinkApi.middleware)
      .concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
