import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/client";

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req: NextApiRequest, res: NextApiResponse) => {
    const slug = req.query["slug"]?.toString()
    // console.log(slug)

    if(!slug) {
        res.statusCode = 404

        res.send(JSON.stringify({ message: "No slug found"}))
        return;
    }

    const data = await prisma.shortLink.findFirst({
        where: {
            slug: {
                equals: slug
            }
        }
    })

    if(!data) {
        res.statusCode = 404

        res.setHeader("Content-Type", "application/json")
        res.setHeader("Cache-Control", "s-maxage=60000, stale-while-revalidate")

        res.send(JSON.stringify({ message: "No slug found"}))
        return;
    }

    return res.json(data)
}