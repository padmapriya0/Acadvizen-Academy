"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { Suspense } from "react";
import { supabase } from "../../lib/supabase";

function ContactForm() {
  const searchParams = useSearchParams();
  const courseFromUrl = searchParams.get("course") || "";
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: courseFromUrl,
    message: "",
  });
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (courseFromUrl)
      setForm((current) => ({ ...current, subject: courseFromUrl }));
  }, [courseFromUrl]);

  function update(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function submit(event) {
    event.preventDefault();
    setStatus("");
    setBusy(true);
    try {
      const cleanForm = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        subject: form.subject.trim() || "Course enquiry",
        message: form.message.trim(),
      };
      if (cleanForm.name.length < 2 || cleanForm.message.length < 10) {
        setStatus(
          "Please enter your name and a message of at least 10 characters.",
        );
        return;
      }
      if (supabase) {
        const { error } = await supabase
          .from("contact_messages")
          .insert([cleanForm]);
        if (error) throw error;
        setStatus("Thank you! Your message has been submitted.");
      } else {
        setStatus(
          "Demo mode: your form was validated, but no message was saved. Add Supabase settings to enable database storage.",
        );
      }
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus(
        "We couldn't save your message. Check your Supabase table and policies, or try again later.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="form-card" onSubmit={submit}>
      <h2 style={{ fontSize: "1.8rem" }}>Send us a message</h2>
      <p>Fill out the form and our learning team can follow up.</p>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="name">Full name *</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={update}
            placeholder="Your name"
            required
            minLength={2}
          />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email address *</label>
          <input
            id="email"
            name="email"
            value={form.email}
            onChange={update}
            type="email"
            placeholder="you@example.com"
            required
          />
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="subject">Subject</label>
        <input
          id="subject"
          name="subject"
          value={form.subject}
          onChange={update}
          placeholder="What would you like to know?"
        />
      </div>
      <div className="form-field">
        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={update}
          placeholder="Tell us how we can help..."
          required
          minLength={10}
        />
      </div>
      {status && (
        <div className="form-status" role="status">
          {status}
        </div>
      )}
      <button className="btn btn-primary" type="submit" disabled={busy}>
        {busy ? "Sending..." : "Send message"} <Send size={16} />
      </button>
      <p style={{ fontSize: ".78rem", marginTop: 14, marginBottom: 0 }}></p>
    </form>
  );
}

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">We're here to help</span>
          <h1>Let's talk about your next step.</h1>
          <p>
            Questions about a course or not sure where to begin? Send us a
            message.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container contact-grid">
          <aside className="contact-info-card">
            <span
              className="eyebrow"
              style={{
                background: "#ffffff14",
                borderColor: "#ffffff25",
                color: "#d8ccff",
              }}
            >
              Get in touch
            </span>
            <h2>We'd love to hear from you.</h2>
            <p>
              Tell us what you're working toward and we'll help you explore the
              right learning options.
            </p>
            <div className="contact-method">
              <span className="contact-method-icon">
                <Mail size={20} />
              </span>
              <div>
                <strong>Email</strong>
                <small>hello@acadvizen.com</small>
              </div>
            </div>
            <div className="contact-method">
              <span className="contact-method-icon">
                <MessageCircle size={20} />
              </span>
              <div>
                <strong>Course enquiries</strong>
                <small>Ask about topics, levels and learning paths</small>
              </div>
            </div>
            <div className="contact-method">
              <span className="contact-method-icon">
                <MapPin size={20} />
              </span>
              <div>
                <strong>Flexible learning</strong>
                <small>Explore learning from wherever you are</small>
              </div>
            </div>
          </aside>
          <Suspense
            fallback={<div className="form-card">Loading contact form…</div>}
          >
            <ContactForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
