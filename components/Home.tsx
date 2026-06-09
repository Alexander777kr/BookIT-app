'use client';

import React from 'react';
import RoomItem from "@/components/room/RoomItem";
import {IRoom} from "@/backend/models/room";
import CustomPagination from "@/components/layout/CustomPagination";
import Link from "next/link";
import {useSearchParams} from "next/navigation";

interface Props {
    data: {
        success: boolean;
        resPerPage: number;
        filteredRoomsCount: number;
        rooms: IRoom[];
    }
}

const Home = ({data}: Props) => {
    const {rooms, resPerPage, filteredRoomsCount} = data;
    const searchParams = useSearchParams();
    const location = searchParams.get("location");
    return (
        <div>
            <section id="rooms" className="container mt-5">
                <h2 className="mb-3 ml-2 stays-heading">{location ? `${filteredRoomsCount} rooms found in ${location}` : "All rooms"}</h2>
                <Link href="/search" className="ml-2 back-to-search">
                    <i className="fa fa-arrow-left"></i> Back to Search
                </Link>
                <div className="row mt-4">
                    {rooms.length === 0 ?
                        <div className="alert alert-danger mt-5 w-100"><b>No rooms.</b></div> : rooms.map(room => (
                            <RoomItem key={String(room._id)} room={room}/>))}
                </div>
            </section>
            <CustomPagination resPerPage={resPerPage} filteredRoomsCount={filteredRoomsCount}/>
        </div>
    );
};

export default Home;