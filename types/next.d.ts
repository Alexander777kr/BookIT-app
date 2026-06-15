import {NextRequest} from "next/server";
import {IUser} from "@/backend/models/user";

declare module '@reduxjs/toolkit/query/react' {
    interface FetchBaseQueryError {
        data: any;
    }
}

declare module 'next/server' {
    interface NextRequest {
        user: IUser;
    }
}
