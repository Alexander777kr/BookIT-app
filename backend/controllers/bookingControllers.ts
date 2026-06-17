import {catchAsyncErrors} from "@/backend/middlewares/catchAsyncErrors";
import Booking, {IBooking} from "@/backend/models/booking";
import {NextRequest, NextResponse} from "next/server";
import Moment from "moment";
import {extendMoment} from "moment-range";
import ErrorHandler from "@/backend/utils/errorHandler";

const moment = extendMoment(Moment);

// Create new Booking => /api/bookings
export const newBooking = catchAsyncErrors(async (req: NextRequest) => {
    const body = await req.json();
    const {room, checkInDate, checkOutDate, daysOfStay, amountPaid, paymentInfo} = body;
    const booking = await Booking.create({
        room, user: req.user._id, checkInDate, checkOutDate, daysOfStay, amountPaid, paymentInfo,
        paidAt: Date.now()
    });

    return NextResponse.json({
        booking
    })
})


// Check Booking Room Availability => /api/bookings/check
export const checkBookingRoomAvailability = catchAsyncErrors(async (req: NextRequest) => {
    const {searchParams} = new URL(req.url);
    const roomId = searchParams.get("roomId");
    const checkInDate: Date = new Date(searchParams.get("checkInDate") as string);
    const checkOutDate: Date = new Date(searchParams.get("checkOutDate") as string);

    const bookings: IBooking[] = await Booking.find({
        room: roomId, $and: [
            {checkInDate: {$lte: checkOutDate}}, {checkOutDate: {$gte: checkInDate}}
        ]
    });

    const isAvailable: boolean = bookings.length === 0;

    return NextResponse.json({
        isAvailable
    })
})

// Get Room Booked Dates => /api/bookings/booked_dates
export const getRoomBookedDates = catchAsyncErrors(async (req: NextRequest) => {
    const {searchParams} = new URL(req.url);
    const roomId = searchParams.get("roomId");
    const bookings = await Booking.find({room: roomId});
    const bookedDates = bookings.flatMap(booking => Array.from(moment.range(moment(booking.checkInDate), moment(booking.checkOutDate)).by('day')))

    return NextResponse.json({
        bookedDates
    })
})

// Get current user bookings => /api/bookings/me
export const myBookings = catchAsyncErrors(async (req: NextRequest) => {
    const bookings = await Booking.find({user: req.user?._id});

    return NextResponse.json({
        bookings
    })
})

// Get booking details => /api/bookings/:id
export const getBookingDetails = catchAsyncErrors(async (req: NextRequest, {params}: {
    params: Promise<{ id: string }>
}) => {
    const {id} = await params;
    const booking = await Booking.findById(id).populate('user room');
    console.log(booking);
    if (booking.user._id.toString() !== req.user?._id) {
        throw new ErrorHandler('You cannot view this booking', 403);
    }

    return NextResponse.json({
        booking
    })
})


