import { createSlice } from "@reduxjs/toolkit";

// redux is not used
const initialState = {
    segment: null,
    segmentsList: []
};

export const segmentSlice = createSlice({
    name: "segment",
    initialState,
    reducers: {
        setSegment: (state, action) => {
            state.segment = action.payload.statement;
        }
    }
});

export const { setSegment } = segmentSlice.actions;
export default segmentSlice.reducer;