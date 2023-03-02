import { UIState } from './';


type UIActionType = 
| { type: '[UI]-TOGGLE_MENU' } 


export const uiReducer = (state: UIState, action: UIActionType): UIState => {


   switch (action.type) {
       case '[UI]-TOGGLE_MENU':
            return {
              ...state,
              isMenuOpen: !state.isMenuOpen
           }

    default: 
            return state; 
    }
}