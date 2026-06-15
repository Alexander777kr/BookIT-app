import Home from "@/components/Home";
import Error from "./error";

export const metadata = {
    title: "Homepage - BookIT",
};

const getRooms = async (params: string) => {
    const urlParams = new URLSearchParams(params);
    const queryString = urlParams.toString();
    const res = await fetch(`${process.env.API_URL}/api/rooms?${queryString}`, {cache: "no-cache"});
    return res.json();
};

export default async function HomePage({searchParams}: any) {
    const params = await searchParams;
    const data = await getRooms(params);
    if (data?.errMessage) {
        return <Error error={data}/>
    }
    return (
        <Home data={data}/>
    );
}
