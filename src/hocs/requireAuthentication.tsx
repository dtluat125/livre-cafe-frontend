import {
  selectVerify,
  selectVerifyLoading,
  verify,
} from '@app/app/features/authentication/authentication-slice';
import { LOGIN_PATH } from '@app/constants';
import { Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function requireAuthentication(Component: any) {
  return function AuthenticatedComponent(props: any) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isVerified = useSelector(selectVerify);
    const authLoading = useSelector(selectVerifyLoading);
    const [isStartVerify, setIsStartVerify] = useState(false);
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate(LOGIN_PATH);
        return;
      }
      dispatch(verify({ callback: (success) => {} }));
      setIsStartVerify(true);
    }, [dispatch]);

    useEffect(() => {
      if (!isVerified && !authLoading && isStartVerify) {
        navigate(LOGIN_PATH);
      }
    }, [isVerified, authLoading]);

    return (
      <div>
        {isVerified && !authLoading ? (
          <Component {...props} />
        ) : (
          <div
            style={{
              //   width: '100%',
              height: '100vh',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 'auto',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              <CircularProgress />
            </Box>
          </div>
        )}
      </div>
    );
  };
}

export default requireAuthentication;
