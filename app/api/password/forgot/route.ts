import dbConnect from "@/backend/config/dbConnect";
import {createEdgeRouter} from "next-connect";
import {NextRequest} from "next/server";
import {forgotPassword} from "@/backend/controllers/authControllers";

interface RequestContext {
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.post(forgotPassword);

export async function POST(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}