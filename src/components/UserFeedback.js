import {Slide, Snackbar, SnackbarContent} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {resetSnackbar} from "../redux/userSlice";

const UserFeedback = () => {
    const [snackbarData, setSnackbarData] = useState(null);
    const [showSnackbar, setShowSnackbar] = useState(false);

    const {info, error} = useSelector(state => state.users.feedback);
    const dispatch = useDispatch();


    useEffect(() => {
        if (error?.text) {
            setSnackbarData({ text: (error.text), color: 'red' });
            setShowSnackbar(true);
        }
    }, [error]);

    // TODO: When this case comes, uncomment and adjust it
    useEffect(() => {
        if (info) {
            setSnackbarData({ text: info.text, color: 'green' });
            setShowSnackbar(true);
        }
    }, [info]);

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            autoHideDuration={3500}
            open={showSnackbar}
            onClose={() => {
                setShowSnackbar(false);
                setSnackbarData(null);
                dispatch(resetSnackbar());
            }}
            TransitionComponent={Slide}
        >
            {snackbarData?.color && snackbarData?.text && (
                <SnackbarContent
                    style={{
                        backgroundColor: snackbarData.color,
                    }}
                    message={<span>{snackbarData.text}</span>}
                />
            )}
        </Snackbar>
    )
};

export default UserFeedback;
