import { NextApiResponse, NextApiRequest } from "next";
const twillio = require('twilio');
const authToken = process.env.TWILIO_AUTH_TOKEN;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const myCellPhoneNumber = process.env.MY_NUMBER;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const client = twillio(accountSid, authToken);
    const auth = req.headers.authorization;
    if (auth === 'Testing1234') {
        await client.messages
            .create({
                body: `Create your todo list the night before with categories: \n Work \n Health \n Relationships \n Self Improvement \n Get better every day: https://jamesclear.com/continuous-improvement`,
                from: '+12694754126',
                to: `+1${myCellPhoneNumber}`
            })
            .then((message: String) => res.json(message), (err: Error) => res.json(err));
    } else {
        return res.status(401).end();
    }
}