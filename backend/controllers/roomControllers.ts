import {NextRequest, NextResponse} from "next/server";
import Room, {IRoom} from '../models/room';
import {catchAsyncErrors} from "@/backend/middlewares/catchAsyncErrors";
import ErrorHandler from "@/backend/utils/errorHandler";
import APIFilters from "@/backend/utils/apiFilters";

// Get all rooms => /api/rooms
export const allRooms = catchAsyncErrors(async (req: NextRequest) => {
    const resPerPage: number = 8;
   // const rooms = await Room.find();
    const {searchParams} = new URL(req.url);
    const queryStr:any = {};
    searchParams.forEach((value, key) => {
        queryStr[key] = value;
    });
    const apiFilters = new APIFilters(Room, queryStr).search();
    const rooms: IRoom[] = await apiFilters.query;
    return NextResponse.json({
        success: true,
        resPerPage,
        rooms
    })
});

// Create new room  =>  /api/admin/rooms
export const newRoom = catchAsyncErrors(async (req: NextRequest) => {
    const body = await req.json();

    const room = await Room.create(body);

    return NextResponse.json({
        success: true,
        room,
    });
});

// Get room details /api/rooms/:id
export const getRoomDetails = catchAsyncErrors(async (req: NextRequest, {params}: {
    params: Promise<{ id: string }>
}) => {
    const {id} = await params;

    const room = await Room.findById(id);

    if (!room) {
        throw new ErrorHandler('Room not found', 404);
    }
    return NextResponse.json({
        success: true,
        room
    });
});

// Update room details /api/admin/rooms/:id
export const updateRoom = catchAsyncErrors(async (req: NextRequest, {params}: { params: Promise<{ id: string }> }) => {
    const {id} = await params;

    let room = await Room.findById(id);
    const body = await req.json();
    if (!room) {
        throw new ErrorHandler('Room not found', 404);
    }
    room = await Room.findByIdAndUpdate(id, body, {
        new: true
    });
    return NextResponse.json({
        success: true,
        room
    });
});

// Delete room details /api/admin/rooms/:id
export const deleteRoom = catchAsyncErrors(async (req: NextRequest, {params}: { params: Promise<{ id: string }> }) => {
    const {id} = await params;

    const room = await Room.findById(id);
    if (!room) {
        throw new ErrorHandler('Room not found', 404);
    }

    //TODO - delete images associated with the room
    await room.deleteOne();
    return NextResponse.json({
        success: true
    });
});