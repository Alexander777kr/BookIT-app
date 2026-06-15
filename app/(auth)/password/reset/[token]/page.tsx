import React from 'react';
import NewPassword from "@/components/user/NewPassword";

export const metadata = {
    title: 'Reset Password',
};

interface Props {
    params: Promise<{ token: string }>
}

const ResetPasswordPage = async ({params}: Props) => {
    const {token} = await params;
    return (
        <div>
            <NewPassword token={token}/>
        </div>
    );
};

export default ResetPasswordPage;