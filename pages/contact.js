import Head from "next/head";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import { useState } from "react";

export default function Contact() {
    
    const [submitStatus, setSubmitStatus] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [alertColor, setAlertColor] = useState('bg-green-500');

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const data = {
            firstName: event.target["First-Name"].value,
            email: event.target.Email.value,
            message: event.target.Message.value,
            subject: event.target.Subject.value,
        };
        
        const jsonData = JSON.stringify(data);
        console.log("json Data: ", jsonData);
    
        const response = await fetch('/api/form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData
        });
    
        try {
            // 1. Validation
            const validationResponse = await fetch('/api/form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const validationResult = await validationResponse.json();

            if (!validationResult.success) {
                // Validation failed
                setSubmitStatus(true);
                setResponseMessage(validationResult.message);
                setAlertColor('bg-red-500');
                return; // Stop the process
            }

            // 2. Validation successful, send to CF7
            const formData = new FormData();
            formData.append('firstName', data.firstName);
            formData.append('email', data.email);
            formData.append('message', data.message);
            formData.append('_wpcf7_unit_tag', 'wpcf7-f116-o1');

            const cf7Endpoint = 'https://headless.digitalhumanitydev.co.za/wp-json/contact-form-7/v1/contact-forms/116/feedback';

            const cf7Response = await fetch(cf7Endpoint, {
                method: 'POST',
                body: formData,
            });

            const cf7Result = await cf7Response.json();
            console.log(cf7Result);

            setSubmitStatus(true);
            setResponseMessage(cf7Result.message);

            if (cf7Result.status === 'mail_sent') {
                setAlertColor('bg-green-500');
            } else {
                setAlertColor('bg-red-500');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus(true);
            setResponseMessage('An error occurred while submitting the form.');
            setAlertColor('bg-red-500');
        }
    };

    return(
        <>
        <Head>
            <title>Contact Us</title>
            <meta name="robots" content="noindex" />
        </Head>
        <section className="bg-slate-700">
            <SiteHeader />
        </section>
        <section>
            <div className="container mx-auto lg:max-w-4xl">
                <h1 className="text-4xl text-center text-slate-800 py-10">Contact Us</h1>
                
                <form className="contact-form" name="Contact Form" onSubmit={handleSubmit}>
                    <label htmlFor="First-Name">First Name:</label>
                    <input type="text" id="First-Name" name="First-Name" />

                    <label htmlFor="Email">Email:</label>
                    <input type="email" id="Email" name="Email" />

                    <label htmlFor="Subject" className="hidden">Subject:</label>
                    <input type="text" id="Subject" name="Subject" className="hidden"/>

                    <label htmlFor="Message">Message:</label>
                    <textarea id="Message" name="Message" />

                    <button type="submit">Submit</button>
                </form>
                {submitStatus ? <SubmissionAlert message={responseMessage} alertColor={alertColor} /> : null}
            </div>
            
        </section>
        </>
    );
}

const SubmissionAlert = ({message, alertColor}) => {
    return (
        <div className={`${alertColor} py-2 px-4 mt-4 rounded`}>
            {message}
        </div>
    );
}