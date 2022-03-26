import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material";
import {deleteUser} from "../redux/user-api";
import {useDispatch} from "react-redux";

const DeleteModal = ({userToDelete, handleClose}) => {
    const dispatch = useDispatch();

    const handleDeleteUser = async () => {
        await dispatch(deleteUser(userToDelete));
        handleClose();
    }

    return (
        <Dialog open onClose={handleClose}>
            <DialogTitle>Are you sure you want to delete <b>{userToDelete?.name}</b>?</DialogTitle>
            <DialogActions sx={{display: 'flex', justifyContent: 'space-between', paddingX: '24px'}}>
                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" color="error" onClick={handleDeleteUser}>Delete</Button>
            </DialogActions>
        </Dialog>
    )
};

export default DeleteModal;
