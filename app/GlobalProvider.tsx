import {ReactNode} from "react";

export function GlobalProvider({children}: { children: ReactNode }) {
    return (
        <>
            {children}
        </>
    )
}