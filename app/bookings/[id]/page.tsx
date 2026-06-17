import Error from '@/app/error';
import {getAuthHeader} from "@/helpers/authHeader";
import BookingDetails from "@/components/booking/BookingDetails";

export const metadata = {
    title: "My Bookings Details",
};

const getBooking = async (id: string) => {
    const authHeader = await getAuthHeader();
    const res = await fetch(`${process.env.API_URL}/api/bookings/${id}`, authHeader);
    return res.json();
};

export default async function MyBookingsPage({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    const data = await getBooking(id);
    if (data?.errMessage) {
        return <Error error={data}/>
    }
    return (
        <BookingDetails data={data}/>
    );
}