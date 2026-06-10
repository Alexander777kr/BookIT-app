import {catchAsyncErrors} from "@/backend/middlewares/catchAsyncErrors";
import {NextRequest, NextResponse} from "next/server";
import User from "@/backend/models/user";

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