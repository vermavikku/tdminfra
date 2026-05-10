import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { contactDetails } from "../../../data/siteData";
import { fetchJson, postJson } from "../../../lib/api";
import { slugify } from "../../../lib/assets";

const ContactSection = () => {
  const [searchParams] = useSearchParams();
  const machineryIdParam = searchParams.get("machineryId");
  const equipmentSlugParam = searchParams.get("equipmentSlug");

  const [machineryOptions, setMachineryOptions] = useState([]);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [optionsError, setOptionsError] = useState("");

  const [selectedMachineryId, setSelectedMachineryId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const normalizePhone = (value) => value.replace(/\D/g, "").slice(0, 10);
  const normalizeName = (value) => value.replace(/[^a-zA-Z\s'-]/g, "");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setOptionsLoading(true);
      setOptionsError("");
      try {
        const res = await fetchJson("/machineries/dropdown/list");
        const list = Array.isArray(res?.data) ? res.data : [];
        if (!cancelled) {
          setMachineryOptions(list);
        }
      } catch {
        if (!cancelled) {
          setOptionsError("Could not load equipment list. Please try again later.");
          setMachineryOptions([]);
        }
      } finally {
        if (!cancelled) {
          setOptionsLoading(false);
        }
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!machineryOptions.length) {
      return;
    }
    const idStr = machineryIdParam?.trim() || "";
    if (idStr && /^\d+$/.test(idStr)) {
      const ok = machineryOptions.some((m) => String(m.id) === idStr);
      if (ok) {
        setSelectedMachineryId(idStr);
        return;
      }
    }
    const slug = equipmentSlugParam?.trim();
    if (slug) {
      const normalized = slug.toLowerCase();
      const match = machineryOptions.find(
        (m) => slugify(String(m.title || "")) === normalized,
      );
      if (match) {
        setSelectedMachineryId(String(match.id));
      }
    }
  }, [machineryOptions, machineryIdParam, equipmentSlugParam]);

  const selectedTitle = machineryOptions.find(
    (m) => String(m.id) === selectedMachineryId,
  )?.title;

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setFormError("");
      setSubmitted(false);

      const mid = Number(selectedMachineryId);
      if (!mid || Number.isNaN(mid)) {
        setFormError("Please select the machinery (subject).");
        return;
      }
      if (!name.trim()) {
        setFormError("Please enter a valid name using letters only.");
        return;
      }
      if (!email.trim()) {
        setFormError("Please fill in your email address.");
        return;
      }
      if (!phone.trim() || phone.length !== 10) {
        setFormError("Please enter a 10-digit phone number.");
        return;
      }

      setSubmitting(true);
      try {
        await postJson("/enquiries", {
          machinery_id: mid,
          machine_type: selectedTitle || undefined,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: message.trim() || undefined,
        });
        setSubmitted(true);
        setSelectedMachineryId("");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } catch (err) {
        setFormError(
          err instanceof Error ? err.message : "Submission failed. Please try again.",
        );
      } finally {
        setSubmitting(false);
      }
    },
    [selectedMachineryId, name, email, phone, message, selectedTitle],
  );

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-10 max-w-xl animate-fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
            Contact us
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Reach out to us to request a quote or discuss any project needs.
          </p>
          <p className="mt-4 text-sm text-slate-600">
            Or call directly at{" "}
            <a href={`tel:${contactDetails.phone.replace(/\s/g, "")}`} className="text-blue-700 font-medium hover:underline">
              {contactDetails.phone}
            </a>{" "}
            or{" "}
            <a href={`tel:${contactDetails.secondaryPhone.replace(/\s/g, "")}`} className="text-blue-700 font-medium hover:underline">
              {contactDetails.secondaryPhone}
            </a>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="hidden md:flex items-center justify-center animate-fade-up" style={{ animationDelay: "80ms" }}>
            <img
              src="/cdn.prod.website-files.com/617f940309b8436c1932ee96/617f940409b8436f2d32f00d_image-contact-saaslify-template.svg"
              alt="Contact illustration"
              className="w-full max-w-sm opacity-90"
            />
          </div>

          <form
            className="border border-slate-200/80 bg-white rounded-2xl p-6 shadow-lg shadow-slate-900/5 animate-fade-up"
            onSubmit={onSubmit}
          >
            {submitted ? (
              <p className="mb-4 text-sm font-medium text-emerald-800 bg-emerald-50 border border-emerald-200/80 rounded-xl px-4 py-3">
                Thank you. Your enquiry was received. We will get back to you soon.
              </p>
            ) : null}

            {formError ? (
              <p className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200/80 rounded-xl px-4 py-3">
                {formError}
              </p>
            ) : null}

            {optionsError ? (
              <p className="mb-4 text-sm text-amber-800 bg-amber-50 border border-amber-200/80 rounded-xl px-4 py-3">
                {optionsError}
              </p>
            ) : null}

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(normalizeName(e.target.value))}
                  placeholder="Full name"
                  autoComplete="name"
                  className="w-full min-h-[48px] px-4 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  autoComplete="email"
                  className="w-full min-h-[48px] px-4 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(normalizePhone(e.target.value))}
                  placeholder="0997898979"
                  autoComplete="tel"
                  maxLength={10}
                  className="w-full min-h-[48px] px-4 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Subject (machinery)</label>
                <select
                  name="machinery"
                  value={selectedMachineryId}
                  onChange={(e) => setSelectedMachineryId(e.target.value)}
                  disabled={optionsLoading || !!optionsError}
                  className="w-full min-h-[48px] px-4 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 disabled:bg-slate-50 disabled:text-slate-500"
                >
                  <option value="">
                    {optionsLoading ? "Loading equipment…" : "Select machinery"}
                  </option>
                  {machineryOptions.map((m) => (
                    <option key={m.id} value={String(m.id)}>
                      {m.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
              <textarea
                name="message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Please enter Location, Duration, Height/Capacity and any other info about the requirement"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting || optionsLoading || !!optionsError}
              className="w-full min-h-[48px] rounded-xl bg-blue-600 text-white font-medium shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {submitting ? "Sending…" : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
