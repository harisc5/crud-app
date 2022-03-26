import {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useDispatch} from "react-redux";

import {createUser, updateUser} from "../redux/user-api";
import {vaildateEmail} from "../utils";

const AddEditModal = ({userToEdit, handleClose}) => {
    const [user, setUser] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        if (userToEdit) {
            setUser(userToEdit);
        }
    }, [userToEdit]);

    const handleChange = (value, key) => {
        const userCopy = {...user};
        userCopy[key] = value;

        setUser(userCopy);
    }

    const handleCreateOrUpdateUser = async () => {
        if (userToEdit?.id) {
            await dispatch(updateUser(user));
        } else {
            await dispatch(createUser(user));
        }
        handleClose();
    }

    const shouldDeleteButton = () => {
        return !(user?.name && user?.email && vaildateEmail(user?.email) && user?.age);
    }

    return (
        <Dialog
            open
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            fullWidth
            scroll="paper"
        >
            <DialogTitle>
                {user && Object.keys(user)?.length ? 'Edit user' : 'Create user'}
            </DialogTitle>
            <DialogContent>
                <TextField onChange={(e) => handleChange(e.target.value, 'name')} variant="outlined" label="Name"
                           value={user?.name} size="medium" sx={{marginY: '20px'}}/>
                <TextField type="number" onChange={(e) => handleChange(e.target.value, 'age')} variant="outlined" label="Age"
                           value={user?.age} size="medium" sx={{marginY: '20px'}}/>
                <TextField onChange={(e) => handleChange(e.target.value, 'email')} variant="outlined" label="Email"
                           value={user?.email} size="medium" sx={{marginY: '20px'}}/>
            </DialogContent>
            <DialogActions sx={{display: 'flex', justifyContent: 'space-between', paddingX: '24px'}}>
                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={handleCreateOrUpdateUser}
                        disabled={shouldDeleteButton()}>Save</Button>
            </DialogActions>
        </Dialog>
    )
};

export default AddEditModal;
