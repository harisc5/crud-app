import {createSlice} from "@reduxjs/toolkit";
import {createUser, deleteUser, fetchUsers, updateUser} from "./user-api";

export const initialState = {
    users: [],
    feedback: {
        info: null,
        error: null,
    },
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        resetSnackbar: (state) => {
            state.feedback = {
                info: null,
                error: null,
            };
        }
    },
    extraReducers: {
        [fetchUsers.fulfilled]: (state, action) => {
            state.users = action.payload.data;
        },
        [createUser.fulfilled]: (state, action) => {
            state.users = [...state.users, action.payload.data];
            state.feedback.info = {
                text: "User created successfully"
            }
        },
        [deleteUser.fulfilled]: (state, action) => {
            const deletedUser = action.payload.data;
            state.users = state.users?.filter(user => user.id !== deletedUser?.id);
            state.feedback.info = {
                text: "User deleted successfully"
            }
        },
        [updateUser.fulfilled]: (state, action) => {
            const updatedUser = action.payload.data;
            state.users = state.users.reduce((users, user) => {
                if (user?.id === updatedUser?.id) {
                    return [...users, updatedUser];
                }

                return [...users, user];
            }, []);
            state.feedback.info = {
                text: "User updated successfully"
            }
        },
        [fetchUsers.rejected]: (state) => {
            state.feedback.error = {
                text: "Unable to retrieve users"
            }
        },
        [updateUser.rejected]: (state) => {
            state.feedback.error = {
                text: "Unable to update user"
            }
        },
        [deleteUser.rejected]: (state) => {
            state.feedback.error = {
                text: "Unable to delete user"
            }
        }
    },
});

export const {resetSnackbar} = usersSlice.actions;

export default usersSlice.reducer;
