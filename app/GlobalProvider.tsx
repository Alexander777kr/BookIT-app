import {ReactNode} from "react";
import {Toaster} from 'react-hot-toast';

export function GlobalProvider({children}: { children: ReactNode }) {
    return (
        <>
            <Toaster/>
            {children}
        </>
    )
}