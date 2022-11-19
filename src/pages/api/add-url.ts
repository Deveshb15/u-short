import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/client";
import { generateSlug } from 'random-word-slugs'

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req: NextApiRequest, res: NextApiResponse) => {

    if(req.method === "POST") {
        // console.log("YES")
        // console.log(req.body)
        let { url, slug } = JSON.parse(req.body)
        if(!slug) {
            slug = generateSlug()
        }
        
        // console.log("URL ", url, "SLUG", slug)
        try {

            const data = await prisma.shortLink.create({
                data: {
                    url,
                    slug
                }
            })
            res.status(200).json({ message: 'url added', slug, url, data })
        } catch(err) {
            console.log(err)
            res.status(500).json({ message: "Internal server error" })
        }

    } else {
        res.status(403).json({ message: "Not a valid request" })
    }
}