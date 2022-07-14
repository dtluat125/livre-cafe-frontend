import customersApi from '@app/api/customersApi';
import {
  deleteStaff,
  deleteStaffFailed,
  deleteStaffSucceeded,
  fetchStaffs,
} from '@app/app/features/staffs/staffs-slice';
import { getErrorMessage } from '@app/utils';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

function* deleteStaffData(action: PayloadAction<string>) {
  //   const token = localStorage.getItem('token');
  try {
    yield call(customersApi.remove, action.payload);
    yield put(deleteStaffSucceeded());
    yield put(fetchStaffs());
  } catch (error) {
    const message = getErrorMessage(error as AxiosError);
    yield put(deleteStaffFailed(message));
  }
}

export default function* deleteCustomerSaga(): Generator {
  yield takeEvery(deleteStaff.toString(), deleteStaffData);
}
