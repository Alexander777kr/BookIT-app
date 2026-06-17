import dbConnect from "@/backend/config/dbConnect";
import {createEdgeRouter} from "next-connect";
import {NextRequest} from "next/server";
import {isAuthenticatedUser} from "@/backend/middlewares/auth";
import {stripeCheckoutSession} from "@/backend/controllers/paymentControllers";

interface RequestContext {
    params: Promise<{ id: string; }>
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser).get(stripeCheckoutSession);

export async function GET(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}