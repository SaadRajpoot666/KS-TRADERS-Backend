const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const data = require("../models/model");
dotenv.config();
//creating a transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Bypasses SSL errors (debugging only)
  },
});

const postRequest = async (req, res) => {
  const { name, email, number, shop, items, totalPrice, location } = req.body;
  const orderedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const adminMailOptions = {
    from: "KS TRADERS",
    to: "khalidmehmoodeditz@gmail.com",
    subject: "New Order Received - KS TRADERS",
    html: ` 
  <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; background: #f9f9f9; font-family: Arial, sans-serif;">
    <h1 style="font-size: 30px; color: #333; text-align: center; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
      New Order Details
    </h1>
    <p style="font-size: 18px; color: #444;"><strong>Shop Name:</strong> ${shop}</p>

    <p style="font-size: 18px; color: #444;"><strong>Name:</strong> ${name}</p>
    <p style="font-size: 18px; color: #444;"><strong>Email:</strong> ${email}</p>
    <p style="font-size: 18px; color: #444;"><strong>Phone:</strong> ${number}</p>
    <p style="font-size: 18px; color: #444;"><strong>Location:</strong> ${location}</p>

    <h3 style="font-size: 22px; color: #007bff; margin-top: 20px;">Items Ordered:</h3>
    <ul style="font-size: 16px; color: #555; padding-left: 20px;">
      ${items
        .map(
          (item) => `<li>${item.name} - ${item.quantity} x Rs${item.price}</li>`
        )
        .join("")}
    </ul>

    <h3 style="font-size: 22px; color: #d9534f; margin-top: 20px;">
      Total Price: Rs${totalPrice}
    </h3>
 
    <h4 style="font-size:16px ;text-align:center;">Ordered At:  ${orderedDate}</h4>
  </div>
      `,
  };
  const customerMailOptions = {
    from: "KS TRaders",
    to: email,
    subject: " Order Conformation ✅",
    html: `
    <div>
    <h1>Your KS TRADERS Order Confirmation ✅</h1>
  <h2>Here's a copy of your order:</h2>
      <p style="font-size: 18px; color: #444;"><strong>Name:</strong> ${name}</p>
    <p style="font-size: 18px; color: #444;"><strong>Email:</strong> ${email}</p>
    <p style="font-size: 18px; color: #444;"><strong>Phone:</strong> ${number}</p>
    <p style="font-size: 18px; color: #444;"><strong>Location:</strong> ${location}</p>

    <h3 style="font-size: 25px; color: gray; margin-top: 20px;">Items Ordered:</h3>
    <ul style="font-size: 20px; color: #555; padding-left: 20px;">
      ${items
        .map(
          (item) => `<li>${item.name} - ${item.quantity} x Rs${item.price}</li>`
        )
        .join("")}
    </ul>

    <h3 style="font-size: 22px; color: #d9534f; margin-top: 20px;">
      Total Price: Rs${totalPrice}
    </h3>

    <h4 style="font-size: 20px; color: #28a745; text-align: center; margin-top: 30px;">
      🎉 Thanks for Your Order! 🎉
    </h4>
    <h4 style="font-size:16px ;text-align:center;">Ordered At:  ${orderedDate}</h4>

    
    </div>
  `,
  };
  try {
    const info1 = await transporter.sendMail(adminMailOptions);
    console.log("Email sent: ", info1.response); // Logs email response
    const info2 = await transporter.sendMail(customerMailOptions)
    console.log("Email sent:" , info2.response)
    res.status(200).json({ message: "Order Placed Successfully" });
  } catch (error) {
    console.error("Error sending email:", error); //  Logs error details
    res
      .status(500)
      .json({ message: "Error Sending Email", error: error.message });
  }
};

const postData = async (req, res) => {
  const { name, email, password, phone, message } = req.body;

  const submissionDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formEmailOptions = {
    from: "KS TRADERS",
    to: "khalidmehmoodeditz@gmail.com",
    subject: "New Form Submitted - KS TRADERS",
    html: `
      <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; background: #f9f9f9; font-family: Arial, sans-serif;">
        <h1 style="font-size:2rem; text-align:center; border-bottom:2px solid red; padding-bottom:10px;">New Form Submitted</h1>
        <p style="font-size:20px; margin-bottom:10px">Name:  ${name}</p>
        <p style="font-size:20px; margin-bottom:10px">Email:  ${email}</p>
        <p style="font-size:20px; margin-bottom:10px">Password:  ${password}</p>
        <p style="font-size:20px; margin-bottom:10px">Phone:  ${phone}</p>
        <p style="font-size:20px; margin-bottom:10px">Message:  ${message}</p>
        <h4 style="font-size:10px; text-align:center;">Submitted At:  ${submissionDate}</h4>
      </div>
    `,
  };
  const customerEmailOptions = {
    from: "KS TRADERS",
    to: email, // Send to the customer's email
    subject: "Thank You for Contacting KS TRADERS",
    html: `
      <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; background: #f9f9f9; font-family: Arial, sans-serif;">
        <h1 style="font-size:2rem; text-align:center; border-bottom:2px solid green; padding-bottom:10px;">Thank You, ${name}!</h1>
        <p style="font-size:20px; margin-bottom:10px">We have received your message and will get back to you shortly.</p>
        <p style="font-size:20px; margin-bottom:10px">Here’s a copy of what you submitted:</p>
        <p style="font-size:18px; margin-bottom:10px"><b>Email:</b> ${email}</p>
        <p style="font-size:18px; margin-bottom:10px"><b>Phone:</b> ${phone}</p>
        <p style="font-size:18px; margin-bottom:10px"><b>Message:</b> ${message}</p>
        <h4 style="font-size:10px; text-align:center;">Submitted At:  ${submissionDate}</h4>
      </div>
    `,
  };
  try {
    // Send email
    const info1 = await transporter.sendMail(formEmailOptions);
    console.log(` Email sent: ${info1.response}`);
    const info2 = await transporter.sendMail(customerEmailOptions);
    console.log(`Email sent: ${info2.response}`);
    // **DEBUGGING: Log before saving data**
    console.log(" Attempting to save data to the database...");

    // Save data to MongoDB
    const newUser = new data({ name, email, password, phone, message });
    res.status(200).json({
      success: true,
      message: "Email has been sent and user saved!",
      user: newUser,
    });
    await newUser.save();

    // **DEBUGGING: Log after saving**
    console.log("✅ Data successfully saved in the database!");
    
  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { postRequest, postData };
