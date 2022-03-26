import './App.css';
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

import {fetchUsers} from "./redux/user-api";
import Table from "./components/Table";
import UserFeedback from "./components/UserFeedback";
import AddEditModal from "./components/AddEditModal";
import DeleteModal from "./components/DeleteModal";
import {Button} from "@mui/material";

const App = () => {
    const dispatch = useDispatch();
    const [userToEdit, setUserToEdit] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);

    useEffect(() => {
        (async () => {
            await dispatch(fetchUsers());
        })();
    }, [dispatch]);

    return (
        <div className="container">
            <div className="button-wrapper">
                <Button variant="outlined" onClick={() => setUserToEdit({
                    name: '', age: '', email: ''
                })} sx={{marginY: '10px'}}>+ Add user</Button>
            </div>
            <Table setUserToEdit={setUserToEdit} setUserToDelete={setUserToDelete} />
            <UserFeedback/>
            {userToEdit && <AddEditModal userToEdit={userToEdit} handleClose={() => setUserToEdit(null)}/>}
            {userToDelete && <DeleteModal userToDelete={userToDelete} handleClose={() => setUserToDelete(null)}/>}
        </div>
    );
}

export default App;
