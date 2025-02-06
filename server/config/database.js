import mongoose from "mongoose";
const { MONGODB_URL } = process.env;

exports.connectDB = () => {
	mongoose
		.connect(MONGODB_URL)
		.then(console.log(`DB Connection Success`))
		.catch((err) => {
			console.log(`DB Connection Failed`);
			console.log(err);
			process.exit(1);
		});
};
