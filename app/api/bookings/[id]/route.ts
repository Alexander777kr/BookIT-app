import dbConnect from "@/backend/config/dbConnect";
import {createEdgeRouter} from "next-connect";
import {NextRequest} from "next/server";
import {getBookingDetails} from "@/backend/controllers/bookingControllers";
import {isAuthenticatedUser} from "@/backend/middlewares/auth";

interface RequestContext {
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser).get(getBookingDetails);

export async function GET(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}