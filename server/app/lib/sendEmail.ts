import nodemailer from 'nodemailer';

const emailAddress:string = process.env.EMAIL as string;
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: emailAddress,
		pass: process.env.EMAIL_KEY,
	},
});

export default function sendEmail(to: string, password: string, name: string):void {
	let content = `<p>Hi ${name},</p>`;
	content += '<p>You recently requested to reset your password.</p>';
	content += `<p>Your new password is <strong>${password}</strong>.</p>`;
	content += '<p>Regards,</p><p>Calen Support</p>';
	const mailOptions = {
		from: emailAddress,
		to,
		subject: 'Temporary password from Calen',
		html: content,
	};
	transporter.sendMail(mailOptions, (error, _info) => {
		if (error) {
			throw error;
		}
	});
}
