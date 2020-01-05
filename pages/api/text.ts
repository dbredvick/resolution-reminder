import { NextApiResponse, NextApiRequest } from "next";
const twillio = require('twilio');
const authToken = process.env.TWILIO_AUTH_TOKEN;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const myCellPhoneNumber = process.env.MY_NUMBER;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const client = twillio(accountSid, authToken);
    const auth = req.headers.authorization;
    if (auth === 'Testing1234') {
        client.messages
            .create({
                body: 'Testing :)',
                from: '+12694754126',
                to: `+1${myCellPhoneNumber}`
            })
            .then((message: String) => res.json(message), (err: Error) => res.json(err));
    } else {
        return res.status(401).end();
    }
    return res.status(200).end();
}