import { useState, useEffect } from "react";
import cvFile from "../../assets/MahmoudTamer_Fullstack.pdf";
import "bootstrap/dist/css/bootstrap.min.css";
import "./contact.css";
import emailjs from "@emailjs/browser";

const Icons = {
    linkedin: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452H17.21v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.984V9h3.105v1.561h.045c.432-.82 1.49-1.683 3.067-1.683 3.28 0 3.885 2.16 3.885 4.969v6.605zM5.337 7.433a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6zm1.553 13.019H3.783V9h3.107v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" /></svg>,
    email: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" /></svg>,
    whatsapp: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg>,
    github: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>,
    download: <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" /></svg>,
    send: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>,
    check: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>,
};

const contactLinks = [
    { icon: Icons.linkedin, label: "LinkedIn", value: "linkedin.com/in/mahmoudtamer0", href: "https://www.linkedin.com/in/mahmoudtamer0" },
    { icon: Icons.email, label: "Email", value: "mahmoud.tamer.developer@gmail.com", href: "mailto:mahmoud.tamer.developer@gmail.com" },
    { icon: Icons.whatsapp, label: "WhatsApp", value: "+20 112 351 1914", href: "https://wa.me/201123511914" },
    { icon: Icons.github, label: "GitHub", value: "github.com/mahmoudtamer0", href: "https://github.com/mahmoudtamer0" },
];

function useScrollReveal() {
    useEffect(() => {
        const els = document.querySelectorAll(".sr");
        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
            { threshold: 0.12 }
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);
}

function ContactSection() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        setSending(true);

        emailjs.send(
            "service_l33qm8h",
            "template_bqxj7l1",
            {
                name: form.name,
                email: form.email,
                message: form.message,
            },
            "s8d_HsS8GsbrNNZvN"
        )
            .then(() => {
                setSending(false);
                setSent(true);
                setForm({ name: "", email: "", message: "" });
            })
            .catch(() => {
                setSending(false);
                alert("Something went wrong, try again.");
            });
    };
    useScrollReveal();
    return (
        <section id="contact">
            <div className="contact-blob" />

            <div className="container contact-inner" style={{ maxWidth: 1100 }}>
                <div className="row g-5 align-items-center">

                    <div className="col-lg-5">
                        <span className="section-label-contact sr sr-left sr-d1">Get In Touch</span>
                        <h2 className="section-title-contact sr sr-left sr-d2">Let's work<br />together.</h2>
                        <p className="contact-tagline sr sr-left sr-d3">
                            Have a project in mind or just want to say hi?
                            My inbox is always open — I'll get back to you ASAP.
                        </p>

                        <div className="contact-list">
                            {contactLinks.map((c, i) => (
                                <a key={c.label} href={c.href} target="_blank" rel="noreferrer"
                                    className={`contact-item sr sr-left sr-d${Math.min(i + 3, 6)}`}>
                                    <div className="contact-icon-wrap">{c.icon}</div>
                                    <div>
                                        <span className="contact-item-label">{c.label}</span>
                                        <span className="contact-item-value">{c.value}</span>
                                    </div>
                                </a>
                            ))}
                        </div>

                        <div className="cv-strip sr sr-left sr-d6">
                            <div className="cv-strip-text">
                                Want my full résumé?<br />
                                <strong>Download my CV</strong> — updated 2026
                            </div>
                            <a href={cvFile} download="Mahmoud_Tamer_CV.pdf" className="btn-cv-strip">
                                {Icons.download} Download CV
                            </a>
                        </div>
                    </div>

                    <div className="col-lg-7">
                        <div className="form-card sr sr-right sr-d2">
                            <h3 className="form-card-title">Send a Message</h3>
                            <p className="form-card-sub">I'll reply within 24 hours ✌️</p>

                            <form onSubmit={handleSubmit}>
                                <div className="row g-3">
                                    <div className="col-sm-6">
                                        <div className="field-wrap">
                                            <label className="field-label">Your Name</label>
                                            <input className="field-input" type="text" name="name"
                                                placeholder="John Doe" value={form.name} onChange={handleChange} required />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="field-wrap">
                                            <label className="field-label">Email Address</label>
                                            <input className="field-input" type="email" name="email"
                                                placeholder="you@email.com" value={form.email} onChange={handleChange} required />
                                        </div>
                                    </div>
                                </div>

                                <div className="field-wrap">
                                    <label className="field-label">Message</label>
                                    <textarea className="field-input" name="message" rows={5}
                                        placeholder="Hey Mahmoud, I'd love to work with you on..."
                                        value={form.message} onChange={handleChange} required />
                                </div>

                                <button type="submit" className="btn-send" disabled={sending}>
                                    {sending ? (
                                        <>
                                            <span style={{ width: 14, height: 14, border: "2px solid #111", borderTopColor: "transparent", borderRadius: "50%", animation: "spin .6s linear infinite", display: "inline-block" }} />
                                            Sending...
                                        </>
                                    ) : (
                                        <>{Icons.send} Send Message</>
                                    )}
                                </button>

                                {sent && (
                                    <div className="success-msg">
                                        {Icons.check} Message sent! I'll get back to you soon.
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default ContactSection


// export default function ContactFooter() {
//     useScrollReveal();
//     return (
//         <>
//             <style>{styles}</style>
//             <ContactSection />
//             <Footer />
//         </>
//     );
// }