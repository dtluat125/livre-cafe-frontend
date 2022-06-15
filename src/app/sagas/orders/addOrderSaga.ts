import ordersApi from '@app/api/ordersApi';
import {
  addOrder,
  addOrderFailed,
  addOrderSucceeded,
  fetchOrders,
} from '@app/app/features/orders/orders-slice';
import { OrderInterface } from '@app/models';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';

function* addNewOrder(action: PayloadAction<OrderInterface>) {
  //   const token = localStorage.getItem('token');
  try {
    const data = (yield call(ordersApi.add, action.payload)) as OrderInterface;
    yield put(addOrderSucceeded(data));
    yield put(fetchOrders());
  } catch (error) {
    const { message } = error as Error;
    yield put(addOrderFailed(message));
  }
}

export default function* addOrderSaga(): Generator {
  yield takeEvery(addOrder.toString(), addNewOrder);
}