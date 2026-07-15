import { Link } from "react-router-dom";
import { Reveal, SectionLabel } from "@/components/premium/Motion";

export default function Contact() {
  return (
    <div className="bg-paper min-h-screen pt-28 pb-24">
      <div className="max-w-site mx-auto px-5 md:px-8 lg:px-12">
        <Reveal>
          <SectionLabel>Contact</SectionLabel>
          <h1 className="mt-4 font-display text-5xl md:text-7xl font-extrabold tracking-tight">
            Talk to engineering.
          </h1>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-2 gap-10">
          <form
            className="bg-white border border-line p-6 md:p-10 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Request received — our team will respond shortly.");
            }}
          >
            <p className="font-display text-sm font-semibold tracking-[0.14em] uppercase">
              Service / Quote Request
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {["Name", "Email", "Company", "Phone"].map((label) => (
                <label key={label} className="block">
                  <span className="text-xs text-muted">{label}</span>
                  <input required className="mt-1 w-full border border-line px-3 py-3 outline-none focus:border-ink" />
                </label>
              ))}
            </div>
            <label className="block">
              <span className="text-xs text-muted">Request type</span>
              <select className="mt-1 w-full border border-line px-3 py-3 outline-none">
                <option>Quote Request</option>
                <option>Service Request</option>
                <option>Call Back</option>
                <option>Live Chat follow-up</option>
              </select>
            </label>
            <label className="block">
              <span className="text-xs text-muted">Project intent</span>
              <select className="mt-1 w-full border border-line px-3 py-3 outline-none">
                <option>PVC Strip Curtains</option>
                <option>Rapid Roller Doors</option>
                <option>Both / project mix</option>
                <option>Service only</option>
              </select>
            </label>
            <label className="block">
              <span className="text-xs text-muted">Message</span>
              <textarea rows={4} className="mt-1 w-full border border-line px-3 py-3 outline-none focus:border-ink" />
            </label>
            <p className="text-xs text-muted">
              Typical response within one business day. Your details are used only for this enquiry.
            </p>
            <button
              type="submit"
              className="w-full py-4 bg-ink text-white font-display text-[0.7rem] font-semibold tracking-[0.16em] uppercase hover:bg-accent transition-colors"
            >
              Submit
            </button>
          </form>

          <div className="space-y-6">
            <div className="aspect-[4/3] bg-mist border border-line overflow-hidden relative">
              <iframe
                title="DROOOV Australia"
                className="absolute inset-0 w-full h-full grayscale contrast-125"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://maps.google.com/maps?q=Melbourne%20Australia&t=&z=11&ie=UTF8&iwloc=&output=embed"
              />
            </div>
            <div className="space-y-3 text-sm">
              <p className="font-display font-bold text-lg">DROOOV</p>
              <p className="text-muted">1300 DROOOV · Australia-wide</p>
              <a href="mailto:support@drooov.com.au" className="text-accent hover:underline">
                support@drooov.com.au
              </a>
              <div className="pt-4 flex flex-wrap gap-3">
                <Link
                  to="/quote-builder"
                  className="px-5 py-3 bg-ink text-white font-display text-[0.65rem] font-semibold tracking-[0.14em] uppercase"
                >
                  Quote Builder
                </Link>
                <Link
                  to="/service"
                  className="px-5 py-3 border border-line font-display text-[0.65rem] font-semibold tracking-[0.14em] uppercase"
                >
                  Book Technician
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
