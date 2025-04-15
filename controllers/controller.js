const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

// Creating a transporter
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
  try {
    const { name, email, number, shop, items, totalPrice, location } = req.body;
    const orderedDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: "khalidmehmoodeditz@gmail.com",
      subject: "New Order Received - KS TRADERS",
      html: `
        <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; background: #f9f9f9; font-family: Arial, sans-serif;">
          <h1 style="font-size: 30px; text-align: center;">New Order Details</h1>
          <p><strong>Shop Name:</strong> ${shop}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${number}</p>
          <p><strong>Location:</strong> ${location}</p>
          <h3>Items Ordered:</h3>
          <ul>
            ${items.map((item) => `<li>${item.name} - ${item.quantity} x Rs${item.price}</li>`).join("")}
          </ul>
          <h3>Total Price: Rs${totalPrice}</h3>
          <h4>Ordered At: ${orderedDate}</h4>
        </div>
      `,
    };

    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Order Confirmation ✅",
      html: `
        <div>
          <h1>Your KS TRADERS Order Confirmation ✅</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${number}</p>
          <p><strong>Location:</strong> ${location}</p>
          <h3>Items Ordered:</h3>
          <ul>
            ${items.map((item) => `<li>${item.name} - ${item.quantity} x Rs${item.price}</li>`).join("")}
          </ul>
          <h3>Total Price: Rs${totalPrice}</h3>
          <h4>🎉 Thanks for Your Order! 🎉</h4>
          <h4>Ordered At: ${orderedDate}</h4>
        </div>
      `,
    };

    // Send emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(customerMailOptions);

    res.status(200).json({ message: "Order Placed Successfully ✅" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ message: "Error Sending Email", error: error.message });
  }
};

const postData = async (req, res) => {
  try {
    const { name, email, password, phone, message } = req.body;

    const submissionDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const formEmailOptions = {
      from: process.env.EMAIL_USER,
      to: "khalidmehmoodeditz@gmail.com",
      subject: "New Form Submitted - KS TRADERS",
      html: `
        <div>
          <h1>New Form Submitted</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong> ${message}</p>
          <h4>Submitted At: ${submissionDate}</h4>
        </div>
      `,
    };

    const customerEmailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank You for Contacting KS TRADERS",
      html: `
        <div>
          <h1>Thank You, ${name}!</h1>
          <p>We have received your message and will get back to you shortly.</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong> ${message}</p>
          <h4>Submitted At: ${submissionDate}</h4>
        </div>
      `,
    };

    // Send emails
    await transporter.sendMail(formEmailOptions);
    await transporter.sendMail(customerEmailOptions);

    res.status(200).json({ message: "Form Submitted Successfully ✅" });
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { postRequest, postData };
