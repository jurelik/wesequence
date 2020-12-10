const initialState = {
  isPlaying: false,
  tempo: 125,
  scenes: []
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TEST': {
      return state;
    }
    case 'INIT': {
      return { ...state, scenes: action.scenes };
    }
    case 'CHANGE_TEMPO':
      return { ...state, tempo: action.tempo };
    default: {
      return state;
    }
  }
};

export default rootReducer;
