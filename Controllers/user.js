
const Admin = require('../Models/admin')
const Meds = require('../Models/medication')
const bcrypt = require('bcrypt');
const SendEmail = require('../Controllers/EmailController');
const crypto = require("crypto");

let verification_code;


module.exports = {
    defaultRoute: async (req, res) => {
        try {
            res.send(`Welcome to My Clinic Backend`);
        } catch (error) {
            res.status(500).send(error)
        }
    },
    addAmin: async (req, res) => {
        try {
            const payload = { ...req.body };
            const existingUser = await Admin.findOne({ email: payload.email });
            if (existingUser) {
                return res.status(201).send("User already exist")
            }
            const hashedPassword = await bcrypt.hash(payload.password, 10)

            // Sending Email
            req.body = {
                to: req.body.email, // list of receivers
                subject: "New Admin Account created.", // Subject line
                text: `Welcome to : SEKGOPO CLINIC ADMIN`, // plain text body
                html: `<h2>Good day <span style="color:green">${req.body.firstName}</span></h2>
                <p>Your Admin accounct with <span style="color:crimson">SEKGOPO CLINIC</span> has been created</p>
                <p>Username: ${req.body.email}</p>
                <p>Password: ${req.body.password}</p>`

            }
            SendEmail.send_email(req, res);

            payload.password = hashedPassword
            const newUser = new Admin(payload);
            const result = await newUser.save();
            res.status(201).send(result)



        } catch (error) {
            res.status(500).send(error)
        }
    },
    adminLogin: async (req, res) => {
        try {
            const payload = { ...req.body }
            const existingUser = await Admin.findOne({ email: payload.email });
            if (!existingUser) {
                return res.status(404).send("User not Found")
            }
            const match = await bcrypt.compare(payload.password, existingUser.password)
            if (!match) {
                return res.status(404).send("Invalid password")
            }

            res.send(existingUser);


        } catch (error) {
            res.status(500).send(error)
        }

    },
    forgot_password: async (req, res) => {
        const user = await Admin.find({ email: req.body.email });

        if (!user[0]) return res.status(400).send('User not found');

        try {
            verification_code = crypto.randomBytes(2).toString('hex');
            console.log("Very code =>>",verification_code)
            let body = {
                to: user[0].email, // list of receivers
                subject: "Verification Code", // Subject line
                text: `Your Verification code: ${verification_code}`, // plain text body
                html: `
                    <div class="container">
                        <img src="https://img.freepik.com/free-vector/emails-concept-illustration_114360-1355.jpg?w=740&t=st=1667382667~exp=1667383267~hmac=672fc7039e14cd627e26453fbfdc1f2ccc11bcae152a78e92ee8a4db108b6be9" alt="Logo" width="150px" height="150px" />
                        <h2>Hi ${user[0].firstName}</h2>
                        <p>Here is your verification code: <b>${verification_code}</b></p>
                    </div>
                `, // html body
            }

            req.body = body;
            SendEmail.send_email(req, res);
        } catch (err) {
            res.status(400).send(err);
        }
    },
    change_password: async (req, res) => {
        const hashedPassword = await bcrypt.hash(req.body.new_password, 10);

        await Admin.updateOne({ email: req.body.email }, {
            password: hashedPassword
        });

        res.status(200).send({ message: "success" });
    },
    getAdmins: async (req, res) => {
        const result = await Admin.find()
        res.status(200).send(result)
    },
    addMedication: async (req, res) => {
        try {
            const payload = { ...req.body };
            const newMedication = new Meds(payload)
            const result = await newMedication.save()
            res.status(201).send(result)
        } catch (error) {
            res.status(500).send(error)
        }
    },
    getMeds: async (req, res) => {
        try {
            const result = await Meds.find();
            res.status(200).send(result);
        } catch (error) {
            console.error("Error fetching medications:", error);
            res.status(500).send({ error: "An error occurred while fetching medications." });
        }
    },
    updateMeds: async (req, res) => {
        const options = { upsert: true };
        const filter = { ...req.params }
        try {
            const result = await Meds.updateOne(filter, req.body, options);
            console.log("Res", result)
            res.status(200).send(result)
        } catch (error) {
            res.status(500).send(error);
        }
    },
    deleteMed: async (req, res) => {
        try {
            const {_id} = req.params;
            const deletedItem = await Meds.findByIdAndDelete(_id);
            console.log("item to delete", deletedItem)
            if (!deletedItem) {
               return res.status(404).send("Medication not found")
            }

            res.status(200).send(deletedItem)

            
        } catch (error) {
            res.status(500).send(error)
        }
    }

}