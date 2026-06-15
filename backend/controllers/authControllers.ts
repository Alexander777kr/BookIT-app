import {catchAsyncErrors} from "@/backend/middlewares/catchAsyncErrors";
import {NextRequest, NextResponse} from "next/server";
import User from "@/backend/models/user";
import ErrorHandler from "@/backend/utils/errorHandler";
import {delete_file, upload_file} from "@/backend/utils/cloudinary";
import {resetPasswordHTMLTemplate} from "@/backend/utils/emailTemplates";
import sendEmails from "@/backend/utils/sendEmails";
import crypto from "crypto";

// Register user => /api/auth/register
export const registerUser = catchAsyncErrors(async (req: NextRequest) => {
    const body = await req.json();
    const {name, email, password} = body;

    const user = await User.create({
        name, email, password
    });

    return NextResponse.json({
        success: true,
    })
})

// Update use profile  =>  /api/me/update
export const updateProfile = catchAsyncErrors(async (req: NextRequest) => {
    const body = await req.json();

    const userData = {
        name: body.name,
        email: body.email,
    };

    const user = await User.findByIdAndUpdate(req.user._id, userData);

    return NextResponse.json({
        success: true,
        user,
    });
});

// Update password  =>  /api/me/update_password
export const updatePassword = catchAsyncErrors(async (req: NextRequest) => {
    const body = await req.json();

    const user = await User.findById(req?.user?._id).select("+password");

    const isMatched = await user.comparePassword(body.oldPassword);

    if (!isMatched) {
        throw new ErrorHandler('Old password is incorrect', 400);
    }

    user.password = body.password;
    await user.save();

    return NextResponse.json({
        success: true,
        user,
    });
});

// Upload avatar  =>  /api/me/upload_avatar
export const uploadAvatar = catchAsyncErrors(async (req: NextRequest) => {
    const body = await req.json();

    const avatarResponse = await upload_file(body?.avatar, "bookit/avatars");

    //Remove avatar from cloudinary

    if (req?.user?.avatar?.public_id) {
        await delete_file(req?.user?.avatar?.public_id);
    }

    const user = await User.findByIdAndUpdate(req?.user?._id, {
        avatar: avatarResponse
    });

    return NextResponse.json({
        success: true,
        user,
    });
});

// Forgot Password  =>  /api/passport/forgot
export const forgotPassword = catchAsyncErrors(async (req: NextRequest) => {
    const body = await req.json();

    const user = await User.findOne({email: body.email});

    if (!user) {
        throw new ErrorHandler('User not found', 400);
    }

    //Get reset token
    const resetToken = await user.getResetPasswordToken();

    await user.save();

    // Create reset password url
    const resetUrl = `${process.env.API_URL}/password/reset/${resetToken}`;

    const message = resetPasswordHTMLTemplate(user?.name, resetUrl);

    try {
        await sendEmails({email: user.email, subject: 'BookIT password recovery', message});
    } catch (error: any) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        throw new ErrorHandler(error?.message, 500);
    }

    return NextResponse.json({
        success: true,
        user,
    });
});


// Forgot Password  =>  /api/passport/reset/:token
export const resetPassword = catchAsyncErrors(async (req: NextRequest, {params}: {
    params: Promise<{ token: string }>
}) => {
    const {token} = await params;
    const body = await req.json();
    console.log('TOKEN', token);
    console.log('BODY', body);
    // @ts-ignore
    const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({resetPasswordToken, resetPasswordExpire: {$gt: Date.now()}});

    if (!user) {
        throw new ErrorHandler('Password reset token is invalid or expired', 404);
    }

    if (body.password !== body.confirmPassword) {
        throw new ErrorHandler('Passwords do not match', 400);
    }

    user.password = body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return NextResponse.json({
        success: true,
    });
});