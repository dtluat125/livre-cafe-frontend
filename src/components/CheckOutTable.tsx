import React, { useContext } from 'react';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { Store } from '@app/context/Store';
import { relative } from 'node:path/win32';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Box, Button, Grid, Typography } from '@mui/material';
import { idID } from '@mui/material/locale';
import { parseClassName } from 'react-toastify/dist/utils';
import CartCheckoutScreen from '@app/screens/CartCheckoutScreen';
import { useNavigate } from 'react-router-dom';

export default function CheckOutTable() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const handleDelete = (params: GridRenderCellParams<any, any, any>) => {
    const toBeDeleted = params.row;
    console.log(toBeDeleted);
    dispatch({
      type: 'DELETE_ITEM',
      payload: toBeDeleted,
    });
  };

  const deleteButton = (params: GridRenderCellParams<any, any, any>) => {
    return (
      <strong>
        <Button
          variant="text"
          color="error"
          onClick={(e) => handleDelete(params)}
        >
          <DeleteOutlineOutlinedIcon />
        </Button>
      </strong>
    );
  };

  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 70, sortable: false },
    { field: 'type', headerName: 'Type', width: 140 },
    { field: 'item', headerName: 'Item', width: 140 },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 100,
    },
    {
      field: 'cost',
      headerName: 'Cost',
      width: 100,
    },
    {
      field: 'additionalRequirements',
      headerName: 'Additional Requirements',
      sortable: false,
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'action',
      headerName: 'Action',
      renderCell: (params) => deleteButton(params),
    },
  ];
  const rows = cart.cartItems.map((item, id) => {
    const type = item.title ? 'Book' : 'Drink';
    const name = item.title || item.name;
    const quantity = item.quantity;

    return {
      id: id + 1,
      _id: item._id,
      type,
      item: name,
      quantity,
      cost: '$' + quantity * item.price,
      additionalRequirements: item.additionalRequirement
        ? item.additionalRequirement
        : 'None',
    };
  });

  return (
    <div
      style={{
        height: 400,
        width: '100%',
        backgroundColor: 'white',
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        isRowSelectable={() => false}
        sx={{
          padding: '1rem',
          paddingTop: '0',
          '& .MuiDataGrid-main > div:first-child': {
            zIndex: rows.length === 0 ? 100 : 0,
          },
        }}
        components={{
          NoRowsOverlay: () => <NoRowsComponent />,
        }}
      />
    </div>
  );
}

const NoRowsComponent = () => {
  const navigate = useNavigate();
  return (
    <Box width={'100%'} height="100%" zIndex={5}>
      <Grid
        container
        width="100%"
        height="100%"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        rowGap={2}
      >
        <Grid item>
          <Typography variant="body1">Cart is empty </Typography>
        </Grid>
        <Grid item>
          <Button variant="text" onClick={() => navigate('/inventory')}>
            <Typography variant="body1"> Add Some</Typography>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
