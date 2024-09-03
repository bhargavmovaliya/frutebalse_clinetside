import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getData, handleAdd, handleUpdateData, handledelete } from '../../../redux/action/category.action';
import { useDispatch, useSelector } from 'react-redux';

export default function Category() {
    const [open, setOpen] = React.useState(false);
    const [update, setUpdate] = React.useState(null);

    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories);
    const rows = categories.categories || []; // Initialize rows with an empty array if categories.categories is undefined

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setUpdate(null);
    };

    let categorySchema = object({
        name: string().required("Please enter name"),
        description: string().required("Please enter description").min(5, "Please enter at least 5 characters in description"),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: categorySchema,
        onSubmit: (values, { resetForm }) => {
            if (update) {
                dispatch(handleUpdateData(values));
            } else {
                dispatch(handleAdd(values));
            }
            resetForm();
            handleClose();
        },
    });

    const { handleSubmit, handleChange, handleBlur, errors, touched, values, setValues } = formik;

    React.useEffect(() => {
        dispatch(getData());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(handledelete(id));
    };

    const handleEdit = (data) => {
        setOpen(true);
        setValues(data);
        setUpdate(data._id);
    };

    const columns = [
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        {
            field: 'Action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" size="large" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" size="large" onClick={() => handleDelete(params.row._id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        }
    ];

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Category
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Category</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            name="name"
                            label="Category Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            error={errors.name && touched.name}
                            helperText={errors.name && touched.name ? errors.name : ''}
                        />
                        <TextField
                            margin="dense"
                            id="description"
                            name="description"
                            label="Category Description"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}
                            error={errors.description && touched.description}
                            helperText={errors.description && touched.description ? errors.description : ''}
                        />
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">{update ? 'Update' : 'Add'}</Button>
                        </DialogActions>
                    </DialogContent>
                </form>
            </Dialog>

            {categories.categories && (
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        checkboxSelection
                        getRowId={(row) => row._id}
                    />
                </div>
            )}
        </>
    );
}
