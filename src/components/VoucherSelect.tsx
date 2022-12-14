import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Checkbox, CircularProgress, Typography } from '@mui/material';
import { getBackgroundColor, getVoucherColor } from '@app/utils';
import { RankIndex, RankType, VoucherInterface } from '@app/models';
import { getRankColor } from '@app/utils';
import { useSelector } from 'react-redux';
import { selectVouchersLoading } from '@app/app/features/vouchers/vouchers-slice';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// const genVoucher = (
//   name: string,
//   color: string,
//   points: number,
//   discount: number,
// ) => {
//   return {
//     name,
//     color,
//     points,
//     discount,
//   };
// };

// const rows = [
//   genVoucher('Blaze Flame Voucher', 'red', 100, 10),
//   genVoucher('Honor Chosen Voucher', 'yeallow', 150, 15),
//   genVoucher('Progentinor Voucher', 'green', 500, 55),
// ];

function getStyles(name: string, VoucherName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      VoucherName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface VoucherSelectProps {
  setSelectedVouchers: (vouchers: VoucherInterface[]) => void;
  selectedVouchers: VoucherInterface[];
  vouchers: VoucherInterface[];
}

export default function VoucherSelect(props: VoucherSelectProps) {
  const { vouchers, setSelectedVouchers, selectedVouchers } = props;
  const theme = useTheme();
  const [voucherName, setVoucherName] = React.useState<string[]>([]);
  const vouchersLoading = useSelector(selectVouchersLoading);

  const handleChange = (event: SelectChangeEvent<typeof voucherName>) => {
    const {
      target: { value },
    } = event;
    setVoucherName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleSelect = (option: VoucherInterface) => {
    const existingVoucher = selectedVouchers?.findIndex(
      (e) => e.name === option.name,
    );
    const newSelectedVouchers = selectedVouchers.slice();
    if (existingVoucher >= 0) {
      newSelectedVouchers.splice(existingVoucher, 1);
      setSelectedVouchers(newSelectedVouchers);
      return;
    }
    newSelectedVouchers.push(option);
    setSelectedVouchers(newSelectedVouchers);
  };

  return (
    <div>
      <FormControl sx={{ maxWidth: 300 }} fullWidth>
        <InputLabel id="demo-multiple-chip-label">Select Vouchers</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={voucherName}
          onChange={handleChange}
          input={
            <OutlinedInput id="select-multiple-chip" label="Select Vouchers" />
          }
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {vouchers?.length > 0 ? (
            vouchers?.map((voucher) => (
              <MenuItem
                key={voucher.name}
                value={voucher.name}
                style={getStyles(voucher.name, voucherName, theme)}
                onClick={() => handleSelect(voucher)}
              >
                <VoucherOption
                  {...(voucher as VoucherInterface)}
                  width="100%"
                />
              </MenuItem>
            ))
          ) : vouchersLoading ? (
            <MenuItem key="loading">
              <CircularProgress color="inherit" size={20} />
            </MenuItem>
          ) : (
            <MenuItem key="no-option">No Option</MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
}

interface VoucherOptionProps extends BoxProps, VoucherInterface {
  showDetails?: boolean;
}

export function VoucherOption(props: VoucherOptionProps) {
  const { name, pointsCost, percentageDiscount, showDetails, ...restProps } =
    props;
  const color = getVoucherColor(
    props.correspondingRank?.toLowerCase() as RankType,
  );

  return (
    <Box
      p={2}
      sx={{ backgroundColor: getBackgroundColor(color) }}
      {...restProps}
    >
      <Typography color={color}>
        <strong>{name}</strong>{' '}
        {showDetails &&
          `: ${pointsCost} points for ${percentageDiscount}% (maximum ${props.maxAmount}$) saved`}
      </Typography>
    </Box>
  );
}
