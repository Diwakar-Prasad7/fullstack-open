import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotificationMsg (state, action){
            return action.payload
        }
    }
})

const { setNotificationMsg } = notificationSlice.actions

export const setNotification = (msg, sec) => {
    return (dispatch) => {
        dispatch(setNotificationMsg(msg))

        setTimeout(() => {
            dispatch(setNotificationMsg(''))
        }, 1000 * sec)
    }
}

export default notificationSlice.reducer