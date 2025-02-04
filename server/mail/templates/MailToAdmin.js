const MailToAdmin = (userData) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>User Submission Details</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
    }
    .header img {
      max-width: 200px;
    }
    h1 {
      color: #2d3e50;
      font-size: 24px;
    }
    p {
      font-size: 16px;
      line-height: 1.5;
      color: #555;
    }
    .footer {
      text-align: center;
      font-size: 14px;
      color: #999;
      margin-top: 20px;
    }
    .details {
      margin-top: 20px;
      background-color: #f9f9f9;
      padding: 15px;
      border-radius: 5px;
    }
    .details table {
      width: 100%;
      border-collapse: collapse;
    }
    .details th, .details td {
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    .highlight {
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://cdn.prod.website-files.com/64e9f0f50effffde4fd434e7/64eb1f07042fae226d684fd3_BlackLogo-Full.png" alt="Logo">
    </div>
    <h1>New User Submission</h1>
    <p>Hello Admin,</p>
    <p>A new user has submitted their contact form. Here are the details:</p>

    <div class="details">
      <table>
        <tr>
          <th class="highlight">Field</th>
          <th>Details</th>
        </tr>
        <tr>
          <td class="highlight">Name:</td>
          <td>${userData.name}</td>
        </tr>
        <tr>
          <td class="highlight">Email:</td>
          <td>${userData.email}</td>
        </tr>
        <tr>
          <td class="highlight">Company:</td>
          <td>${userData.company}</td>
        </tr>
        <tr>
          <td class="highlight">Role:</td>
          <td>${userData.role}</td>
        </tr>
        <tr>
          <td class="highlight">Company Type:</td>
          <td>${userData.companyType}</td>
        </tr>
        <tr>
          <td class="highlight">User Base:</td>
          <td>${userData.userBase}</td>
        </tr>
        <tr>
          <td class="highlight">Employee Count:</td>
          <td>${userData.employeeCount}</td>
        </tr>
        <tr>
          <td class="highlight">ARR Range:</td>
          <td>${userData.arrRange}</td>
        </tr>
        <tr>
          <td class="highlight">Data Stack:</td>
          <td>${userData.dataStack}</td>
        </tr>
        <tr>
          <td class="highlight">Data Problem:</td>
          <td>${userData.dataProblem}</td>
        </tr>
      </table>
    </div>

    <p>Please take the necessary actions and follow up with the user as needed.</p>

    <div class="footer">
      <p>&copy; 2025 SuperAI | All Rights Reserved</p>
    </div>
  </div>
</body>
</html>
    `;
}

module.exports = MailToAdmin;
