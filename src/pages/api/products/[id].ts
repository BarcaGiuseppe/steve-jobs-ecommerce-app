import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //console.log("GET");
  try {
    const id = req.url?.split("products/")[1];
    console.log(id);
    const result = await fetch(
      `https://server-products-node-production.up.railway.app/products/${id}`
    );
    const post = await result.json();
    if (!post) {
      return res.status(404).json({ message: "ERROR" });
    }
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({ message: "ERROR", err });
  }
}
