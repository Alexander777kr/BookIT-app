import dbConnect from "@/backend/config/dbConnect";
import {createEdgeRouter} from "next-connect";
import {NextRequest} from "next/server";
import {resetPassword} from "@/backend/controllers/authControllers";

interface RequestContext {
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.put(resetPassword);

export async function PUT(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx);
}