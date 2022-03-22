import { useBody } from "h3";
import fetch from "node-fetch";
import recurly, { AccountCreate, PurchaseCreate } from "recurly";

interface TokenType {
  id: string;
}

interface BodyType {
  email: string;
  firstName: string;
  lastName: string;
  token: TokenType;
  planCode: string;
  quantity: number;
}

export default async (req, res) => {
  const body: BodyType = await useBody(req);

  let status = false;

  try {
    const client = new recurly.Client(process.env.RECURLY_API_KEY);

    const accountCreate: AccountCreate = {
      code: body.email,
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
    };

    const account = await client.createAccount(accountCreate);

    let purchaseReq: PurchaseCreate = {
      currency: "USD",
      account: {
        code: account.code,
        billingInfo: {
          tokenId: body.token.id,
        },
      },
      subscriptions: [
        { planCode: body.planCode, quantity: body.quantity || 1 },
      ],
    };

    let invoiceCollection = await client.createPurchase(purchaseReq);
    status = true;
  } catch (error) {
    console.log(error);
  }

  return {
    status,
  };
};
