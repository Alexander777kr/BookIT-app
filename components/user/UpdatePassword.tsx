'use client';
import React, {useEffect, useState} from 'react';
import {useUpdatePasswordMutation} from "@/redux/api/userApi";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import ButtonLoader from "@/components/layout/ButtonLoader";

const UpdatePassword = () => {
    const [password, setPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [updatePassword, {isLoading, error, isSuccess}] = useUpdatePasswordMutation();
    const router = useRouter();

    useEffect(() => {

        if (error && "data" in error) {
            // @ts-ignore
            toast.error(error?.data?.errMessage);
        }

        if (isSuccess) {
            toast.success('Password updated successfully.');
            router.refresh();
        }
    }, [error, isSuccess]);

    const submitHandler = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const passwords = {password, oldPassword};

        updatePassword(passwords);
    };
    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-8">
                <form
                    className="shadow rounded bg-body"
                    onSubmit={submitHandler}
                >
                    <h2 className="mb-4">Change Password</h2>

                    <div className="mb-3">
                        <label className="form-label" htmlFor="old_password_field">
                            Old Password
                        </label>
                        <input
                            type="password"
                            id="old_password_field"
                            className="form-control"
                            name="oldPassword"
                            value={oldPassword}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOldPassword(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label" htmlFor="new_password_field">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="new_password_field"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn form-btn w-100 py-2" disabled={isLoading}>
                        {isLoading ? <ButtonLoader/> : 'Set Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;