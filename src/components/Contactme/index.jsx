"use client";

import { useState } from "react";
import {
  MapPin,
  Mail,
  Phone,
  MessageCircle,
  Loader,
  CheckCircle,
  AlertCircle,
} from "react-feather";
import AppButton from "../UI/AppButton";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const contactInfo = [
  {
    icon: MapPin,
    title: "Address",
    lines: ["Mirpur 12, Dhaka - Bangladesh", "House of street"],
  },
  {
    icon: Mail,
    title: "E-Mail",
    lines: ["kazimdboktiar2020@gmail.com"],
  },
  {
    icon: Phone,
    title: "Call Me",
    lines: ["01894103578"],
  },
];

const initialForm = {
  name: "",
  phone: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactMe() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setStatus("error");
      setErrorMessage(
        "Contact form isn't configured yet — missing Web3Forms access key."
      );
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          name: form.name,
          phone: form.phone,
          email: form.email,
          subject: form.subject || `New message from ${form.name}`,
          message: form.message,
          to: "kazimdboktiar2020@gmail.com",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Something went wrong");
      }

      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message || "Failed to send message. Try again.");
    }
  };

  return (
    <div
      id="contact"
      className="bg-gradient-to-bl from-gray-900 via-black to-green-950 flex items-center justify-center px-4 py-20"
    >
      <div className="w-full max-w-7xl">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {contactInfo.map(({ icon: Icon, title, lines }) => (
            <div
              key={title}
              className="group bg-gray-900/40 border border-gray-700/50 rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-lime-600/60 hover:bg-gray-900/70"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-lime-500 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-lime-900/30 transition-transform duration-300 group-hover:scale-110">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-white text-xl font-semibold mb-3">
                {title}
              </h3>
              {lines.map((line) => (
                <p key={line} className="text-gray-400 text-sm leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="bg-gray-950/40 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-800 transition-colors duration-300 hover:border-lime-600/40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left Side - Heading */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-lime-500"></div>
                <span className="text-lime-400 font-medium tracking-wide">
                  GET IN TOUCH
                </span>
              </div>
              <h2 className="text-white text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Elevate your brand
                <br />
                with Me
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                Have a project in mind or just want to say hello? Fill out the
                form and I&apos;ll get back to you as soon as possible.
              </p>
            </div>

            {/* Right Side - Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                    className="bg-zinc-800/70 text-white px-4 py-3 rounded-lg border border-zinc-700 focus:border-lime-500 focus:ring-1 focus:ring-lime-500/50 focus:outline-none w-full transition-colors"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="bg-zinc-800/70 text-white px-4 py-3 rounded-lg border border-zinc-700 focus:border-lime-500 focus:ring-1 focus:ring-lime-500/50 focus:outline-none w-full transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="Your Email"
                    className="bg-zinc-800/70 text-white px-4 py-3 rounded-lg border border-zinc-700 focus:border-lime-500 focus:ring-1 focus:ring-lime-500/50 focus:outline-none w-full transition-colors"
                  />
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="bg-zinc-800/70 text-white px-4 py-3 rounded-lg border border-zinc-700 focus:border-lime-500 focus:ring-1 focus:ring-lime-500/50 focus:outline-none w-full transition-colors"
                  />
                </div>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  placeholder="Your Message"
                  rows="6"
                  className="bg-zinc-800/70 text-white px-4 py-3 rounded-lg border border-zinc-700 focus:border-lime-500 focus:ring-1 focus:ring-lime-500/50 focus:outline-none w-full resize-none transition-colors"
                ></textarea>

                <AppButton
                  type="submit"
                  title={
                    status === "loading"
                      ? "Sending..."
                      : status === "success"
                      ? "Message Sent"
                      : "Appointment Now"
                  }
                  icon={
                    status === "loading"
                      ? Loader
                      : status === "success"
                      ? CheckCircle
                      : MessageCircle
                  }
                  disabled={status === "loading"}
                  className={`w-full justify-center ${
                    status === "success"
                      ? "bg-green-500 text-black"
                      : "bg-lime-400 text-black hover:bg-lime-300"
                  } ${status === "loading" ? "[&_svg]:animate-spin opacity-80" : ""}`}
                />

                {status === "success" && (
                  <p className="flex items-center gap-2 text-green-400 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    Thanks! Your message has been sent — I&apos;ll reply soon.
                  </p>
                )}
                {status === "error" && (
                  <p className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errorMessage}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
