import { configureStore } from '@reduxjs/toolkit'

//Character reducer
import characterReducer from './redux/characterSlice'

export default configureStore({
  reducer: {
    character:characterReducer
  },
})