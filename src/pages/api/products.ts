import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Get Request");

  try {
    const result = await fetch(
      "https://server-products-node-production.up.railway.app/products"
    );
    const products = await result.json();
    res.status(200).json(products);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Error", error: err });
  }
}
