import { useReducer } from 'react';
import { UIContext, uiReducer } from './';


interface Props {
   children: JSX.Element | JSX.Element[];
}

export interface UIState {
    isMenuOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
   isMenuOpen: false
}

export const UIProvider: React.FC<Props> = ({children}) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const toggleMenu = () => {
        dispatch({type: '[UI]-TOGGLE_MENU'});
    }


return (
    <UIContext.Provider
        value={{
                ...state,
                
                //methods
                toggleMenu
            }}>
        {children}
    </UIContext.Provider>
    )
}
