import LoginBox from '@app/components/LoginBox';
import { FormHelperText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ReactPhoneInput, { PhoneInputProps } from 'react-phone-input-2';

// const PhoneInput = require('react-phone-input-2').default;

interface PhoneInputCustomProps extends PhoneInputProps {
  error?: boolean;
}

function PhoneInputCustom(props: PhoneInputCustomProps) {
  const { error, ...restProps } = props;
  const theme = useTheme();
  console.log(typeof ReactPhoneInput, typeof LoginBox);
  return (
    <div>
      {typeof ReactPhoneInput !== 'object' && (
        <ReactPhoneInput
          country={'vn'}
          enableSearch
          inputStyle={{
            height: theme.spacing(7),
            width: '100%',
            fontSize: theme.spacing(2),
          }}
          containerClass={`phone-input-container ${
            error && 'phone-input-error'
          }`}
          preferredCountries={['vn', 'jp', 'kr']}
          {...restProps}
        />
      )}
      {error && (
        <FormHelperText error={error} sx={{ marginX: '14px' }}>
          Phone must not be empty
        </FormHelperText>
      )}
    </div>
  );
}

export default PhoneInputCustom;
