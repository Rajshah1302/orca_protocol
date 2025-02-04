const UserMailTemplate = (name) => {
	return `
	<!DOCTYPE html>
  <html lang="en">
  <head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Thank You for Your Submission</title>
	<style>
	  body {
		font-family: 'Arial', sans-serif;
		margin: 0;
		padding: 0;
		background-color: #f9f9f9;
		color: #333;
	  }
	  .container {
		max-width: 600px;
		margin: 0 auto;
		background-color: #ffffff;
		padding: 30px;
		border-radius: 12px;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
	  }
	  .header {
		text-align: center;
		padding-bottom: 20px;
	  }
	  .header img {
		max-width: 180px;
		margin-bottom: 20px;
	  }
	  h1 {
		color: #2d3e50;
		font-size: 26px;
		margin-bottom: 10px;
	  }
	  p {
		font-size: 16px;
		line-height: 1.6;
		color: #555;
		margin-bottom: 20px;
	  }
	  .cta-btn {
		display: inline-block;
		padding: 12px 25px;
		background-color: #007bff;
		color: #fff;
		text-decoration: none;
		border-radius: 8px;
		font-size: 16px;
		font-weight: bold;
		text-transform: uppercase;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
		transition: background-color 0.3s ease;
	  }
	  .cta-btn:hover {
		background-color: #0056b3;
	  }
	  .footer {
		text-align: center;
		font-size: 14px;
		color: #999;
		margin-top: 30px;
		padding-top: 20px;
		border-top: 1px solid #eee;
	  }
	  .footer a {
		color: #007bff;
		text-decoration: none;
	  }
	</style>
  </head>
  <body>
	<div class="container">
	  <div class="header">
		<img src="https://cdn.prod.website-files.com/64e9f0f50effffde4fd434e7/64eb1f07042fae226d684fd3_BlackLogo-Full.png" alt="SuperAI Logo">
	  </div>
	  <h1>Thank You for Your Submission, ${name}!</h1>
	  <p>We’ve successfully received your form submission. Our team will review the details and get back to you as soon as possible. In the meantime, feel free to explore more about us and our services.</p>
	  <p>We appreciate your interest in collaborating with SuperAI!</p>  
	  <div class="footer">
		<p>&copy; 2025 SuperAI | All Rights Reserved</p>
		<p>Need help? <a href="mailto:support@superai.com">Contact Support</a></p>
	  </div>
	</div>
  </body>
  </html>
	`;
  };
  
  module.exports = UserMailTemplate;
  