import type { NextApiRequest, NextApiResponse } from 'next';
import User, { IUser } from '../../../models/User';
import dbConnect from '../../../utils/mongo';
const cookie = require('cookie');
const bcrypt = require('bcrypt');

type ResponseData = {
	message?: string;
	errorMessage?: string;
	data?: {};
};
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>
) {
	await dbConnect();

	const { method } = req;

	if (method === 'POST') {
		try {
			const userFromBody = req.body;
			if (userFromBody.repeatPassword) {
				const salt = await bcrypt.genSalt(10);
				userFromBody.password = await bcrypt.hash(userFromBody.password, salt);
				const user: IUser = await User.create(userFromBody);
				res
					.status(201)
					.json({ message: 'User successfully created.', data: user });
			} else {
				const user = await User.findOne({ email: userFromBody.email });
				if (user) {
					const result = await bcrypt.compare(
						userFromBody.password,
						user.password
					);
					if (result) {
						res.setHeader(
							'Set-Cookie',
							cookie.serialize('token', process.env.TOKEN, {
								sameSite: 'strict',
								path: '/'
							})
						);
						res.status(200).json({
							message: 'Login successfull',
							data: { _id: user._id, email: user.email }
						});
					}
				}
				throw new Error('Wrong email or password.');
			}
		} catch (error: any) {
			if (error.code === 11000) {
				res.status(400).json({ errorMessage: 'User already exists.' });
			}
			res.status(400).json({ errorMessage: error.message });
		}
	}
}
