import dbConnect from "@/backend/config/dbConnect";
import {createEdgeRouter} from "next-connect";
import {NextRequest} from "next/server";
import {getRoomBookedDates} from "@/backend/controllers/bookingControllers";

interface RequestContext {
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.get(getRoomBookedDates);

export async function GET(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}