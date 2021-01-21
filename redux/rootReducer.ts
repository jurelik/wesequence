export type RootStore = {
  isPlaying: boolean,
  tempo: number,
  currentNote: number,
  users: number,
  err?: string,
  loading: boolean
}
type ReduxAction = {
  type: string,
  [key: string]: any
}

const initialState: RootStore = {
  isPlaying: false,
  tempo: 120,
  currentNote: 0,
  users: 1,
  loading: true
}

const rootReducer = (state = initialState, action: ReduxAction) => {
  switch (action.type) {
    case 'INIT':
      if (action.err) {
        return { ...state, err: action.err, loading: false }
      }
      return { ...state, tempo: action.tempo, users: action.users, loading: false, err: undefined };
    case 'RESET_ERR_LOADING':
      return { ...state, loading: true, err: undefined };
    case 'USER_JOINED':
      return { ...state, users: state.users + 1 };
    case 'USER_LEFT':
      return { ...state, users: state.users - 1 };
    case 'CURRENT_NOTE':
      return { ...state, currentNote: action.val };
    case 'CHANGE_TEMPO':
      return { ...state, tempo: action.tempo };
    case 'CHANGE_IS_PLAYING':
      return { ...state, isPlaying: action.value };
    case 'CHANGE_SCENE':
      return { ...state, currentScene: action.index };
    default:
      return state;
  }
};

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
