import customersApi from '@app/api/customersApi';
import {
  deleteCustomer,
  deleteCustomerFailed,
  deleteCustomerSucceeded,
  fetchCustomers,
} from '@app/app/features/customers/customers-slice';
import { getErrorMessage } from '@app/utils';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

function* deleteCustomerData(action: PayloadAction<string>) {
  //   const token = localStorage.getItem('token');
  try {
    yield call(customersApi.remove, action.payload);
    yield put(deleteCustomerSucceeded());
    yield put(fetchCustomers());
  } catch (error) {
    const message = getErrorMessage(error as AxiosError);
    yield put(deleteCustomerFailed(message));
  }
}

export default function* deleteCustomerSaga(): Generator {
  yield takeEvery(deleteCustomer.toString(), deleteCustomerData);
}
