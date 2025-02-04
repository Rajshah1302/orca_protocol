const Contact = require('../models/Contact');
const mailSender = require('../utils/mailSender');
const ThankYouTemplate = require('../mail/templates/ThankYouMail');
const AdminTemplate = require('../mail/templates/MailToAdmin');

exports.submitContactForm = async (req, res) => {
    try {
        const {
            name,
            company,
            role,
            email,
            companyType,
            userBase,
            employeeCount,
            arrRange,
            dataStack,
            dataProblem,
        } = req.body;

        

        // Validate required fields
        if (!name || !email || !companyType || !userBase || !employeeCount || !arrRange || !dataStack) {
            return res.status(400).json({ error: 'Please fill out all required fields.' });
        }

        // Save to Database
        const newContact = new Contact({
            name,
            company,
            role,
            email,
            companyType,
            userBase,
            employeeCount,
            arrRange,
            dataStack,
            dataProblem,
        });

        await newContact.save();

        // email to user
        const ThankYou = ThankYouTemplate(name)
        const emailResponse  = await mailSender(
            email,
            'Thank you for your submission! | SuperAI',
            ThankYou
        )

        //email to admin
        const Admin = AdminTemplate(newContact)
        const emailResponseAdmin  = await mailSender(
            process.env.MAIL_USER,
            'New form submission!',
            Admin
        );

        res.status(201).json({ message: 'Form submitted successfully.' });
    } catch (err) {
        console.error('Error saving form data:', err);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
};
