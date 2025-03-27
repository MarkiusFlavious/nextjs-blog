export default function handler(req, res) {
    const body = req.body;

    console.log("Received body:", body);

    if (!body.firstName || !body.email || !body.message) {
        return res.status(400).json({ success: false, message: "All fields are required." }); // Corrected status to 200.
    }

    if (body.subject) {
        return res.status(400).json({ success: false, message: "An unexpected error has occurred. Shame." });
    }

    // Add your custom validation logic here
    if (body.email.length < 5) {
        return res.status(200).json({ success: false, message: "email is too short" });
    }

    return res.status(200).json({ success: true, message: "Validation successful!" });
}