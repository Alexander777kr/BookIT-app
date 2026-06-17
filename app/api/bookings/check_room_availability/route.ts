import dbConnect from "@/backend/config/dbConnect";
import {createEdgeRouter} from "next-connect";
import {NextRequest} from "next/server";
import {checkBookingRoomAvailability} from "@/backend/controllers/bookingControllers";

interface RequestContext {
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.get(checkBookingRoomAvailability);

export async function GET(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}