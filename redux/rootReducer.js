const initialState = {
  isPlaying: false,
  tempo: 125
}
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TEST': {
      return state;
    }
    default: {
      return state;
    }
  }
  
};

export default rootReducer;
