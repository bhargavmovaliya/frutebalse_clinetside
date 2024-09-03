import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { boolean, number, object, string } from 'yup';
import { useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from 'react-redux';
import { addsalespeople, deletesalespeople, editsalespeople, getsalespeople } from '../../../redux/action/salespeople.action';

export default function Salespeople() {
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(null);

    const dispatch = useDispatch();
    const salespeople = useSelector(state => state.salespeole);
    const rows = salespeople.salespeole || [];

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setUpdate(null);
    };

    let salespeopleSchema = object({
        sname: string().required("Please enter salesperson name"),
        city: string().required("Please enter city"),
        comm: number().required("Please enter commission").positive("Commission must be positive"),
        Active: boolean().required("Please specify if active or not")
    });

    const formik = useFormik({
        initialValues: {
            sname: '',
            city: '',
            comm: '',
            Active: true,
        },
        validationSchema: salespeopleSchema,
        onSubmit: (values, { resetForm }) => {
            if (update) {
                dispatch(editsalespeople({ ...values, snum: update }));
            } else {
                dispatch(addsalespeople(values));
            }
            resetForm();
            handleClose();
        },
    });

    const { handleSubmit, handleChange, handleBlur, errors, touched, values, setValues } = formik;

    useEffect(() => {
        dispatch(getsalespeople());
    }, [dispatch]);

    const handleDelete = (snum) => {
        dispatch(deletesalespeople(snum));
    };

    const handleEdit = (data) => {
        setOpen(true);
        setValues(data);
        setUpdate(data.snum);
    };

    const columns = [
        { field: 'sname', headerName: 'Name', width: 130 },
        { field: 'city', headerName: 'City', width: 130 },
        { field: 'comm', headerName: 'Commission', width: 130 },
        {
            field: 'Active', headerName: 'Active', width: 130,
            renderCell: (params) => (
                <Switch
                    checked={params.row.Active}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            ),
        },
        {
            field: 'Action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <React.Fragment>
                    <IconButton
                        aria-label="edit"
                        size="large"
                        onClick={() => handleEdit(params.row)}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        aria-label="delete"
                        size="large"
                        onClick={() => handleDelete(params.row.snum)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </React.Fragment>
            ),
        },
    ];

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Salesperson
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Salesperson</DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="sname"
                            name="sname"
                            label="Salesperson Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.sname}
                            error={touched.sname && Boolean(errors.sname)}
                            helperText={touched.sname && errors.sname}
                        />
                        <TextField
                            margin="dense"
                            id="city"
                            name="city"
                            label="City"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.city}
                            error={touched.city && Boolean(errors.city)}
                            helperText={touched.city && errors.city}
                        />
                        <TextField
                            margin="dense"
                            id="comm"
                            name="comm"
                            label="Commission"
                            type="number"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.comm}
                            error={touched.comm && Boolean(errors.comm)}
                            helperText={touched.comm && errors.comm}
                        />
                        <Switch
                            id="Active"
                            name="Active"
                            checked={values.Active}
                            onChange={() => formik.setFieldValue('Active', !values.Active)}
                        />
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">{update ? 'Update' : 'Add'}</Button>
                        </DialogActions>
                    </DialogContent>
                </form>
            </Dialog>

            {salespeople.salespeole && (
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        checkboxSelection
                        getRowId={(row) => row.snum}
                    />
                </div>
            )}
        </React.Fragment>
    );
}
