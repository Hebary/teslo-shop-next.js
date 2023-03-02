import { createContext } from 'react';


interface ContextProps {
    isMenuOpen: boolean;

    //methods
    toggleMenu: () => void
}

export const UIContext = createContext({} as ContextProps);