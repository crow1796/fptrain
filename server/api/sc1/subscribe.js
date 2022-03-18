import { useBody } from "h3";
import FirstpromoterApiNode from "firstpromoter-api-node";

export default async (req, res) => {
  const body = await useBody(req);

  const firstpromoterApiNode = new FirstpromoterApiNode({
    key: process.env.FIRSTPROMOTER_API_KEY,
    wid: process.env.FIRSTPROMOTER_WID,
  });
  let status = false;

  try {
    const fpRes = await firstpromoterApiNode.post("track/sale", {
      email: body.email,
      plan: "sc1-50",
      amount: 50 * 100,
      currency: "USD",
    });

    status = true;
  } catch (error) {
    console.log(error);
  }

  return {
    status,
  };
};
