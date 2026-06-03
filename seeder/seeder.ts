import Room from "../backend/models/room";
import mongoose from "mongoose";
import {rooms} from "./data";
// require('dotenv').config({ path: 'next.config.js' })
import {IRoom} from "../backend/models/room";

type IRoomSeed = Omit<
    IRoom,
    "_id" | "createdAt" | "user" | "location"
>;
const seedRooms = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/bookit-v2");

        await Room.deleteMany();
        console.log("Rooms are deleted");

        await Room.insertMany(rooms as any);
        console.log("Rooms are added");

        process.exit();
    } catch (error) {
        console.log(error);
        process.exit();
    }
};

seedRooms();