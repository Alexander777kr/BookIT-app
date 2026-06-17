import Error from '@/app/error';
import {getAuthHeader} from "@/helpers/authHeader";
import Invoice from "@/components/invoice/invoice";

export const metadata = {
    title: "Booking Invoice",
};

const getBooking = async (id: string) => {
    const authHeader = await getAuthHeader();
    const res = await fetch(`${process.env.API_URL}/api/bookings/${id}`, authHeader);
    return res.json();
};

export default async function InvoicePage({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    const data = await getBooking(id);
    if (data?.errMessage) {
        return <Error error={data}/>
    }
    return (
        <Invoice data={data}/>
    );
}