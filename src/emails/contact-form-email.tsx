type ContactFormEmailProps = {
  name: string;
  email: string;
  message: string;
};

const ContactFormEmail = ({ name, email, message }: ContactFormEmailProps) => (
  <div>
    <h1>Contact form submission</h1>
    <p>
      From <strong>{name}</strong> at {email}
    </p>
    <h2>Message:</h2>
    <p>{message}</p>
  </div>
);
export default ContactFormEmail;
