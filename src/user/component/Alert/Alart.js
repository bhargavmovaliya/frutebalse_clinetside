import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

function Alart(props) {
    const { color, message } = useSelector(state => state.alert);
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        if (message !== '') { 
            enqueueSnackbar(message, {
                variant: color,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            });
        }
    }, [message, color, enqueueSnackbar]); 

    return <div></div>;
}

export default Alart;
