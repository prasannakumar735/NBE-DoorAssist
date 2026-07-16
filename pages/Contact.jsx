import { Link } from "react-router-dom";
import { MapPin, ExternalLink } from "lucide-react";
import { Reveal, SectionLabel } from "@/components/premium/Motion";

export default function Contact() {
  return (
    <div className="bg-paper pt-28 pb-24">
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
                  <span className="text-xs text-muted-foreground">{label}</span>
                  <input required className="mt-1 w-full border border-line px-3 py-3 outline-none focus:border-ink" />
                </label>
              ))}
            </div>
            <label className="block">
              <span className="text-xs text-muted-foreground">Request type</span>
              <select className="mt-1 w-full border border-line px-3 py-3 outline-none">
                <option>Quote Request</option>
                <option>Service Request</option>
                <option>Call Back</option>
                <option>Live Chat follow-up</option>
              </select>
            </label>
            <label className="block">
              <span className="text-xs text-muted-foreground">Project intent</span>
              <select className="mt-1 w-full border border-line px-3 py-3 outline-none">
                <option>PVC Strip Curtains</option>
                <option>Rapid Roller Doors</option>
                <option>Both / project mix</option>
                <option>Service only</option>
              </select>
            </label>
            <label className="block">
              <span className="text-xs text-muted-foreground">Message</span>
              <textarea rows={4} className="mt-1 w-full border border-line px-3 py-3 outline-none focus:border-ink" />
            </label>
            <p className="text-xs text-muted-foreground">
              Typical response within one business day. Your details are used only for this enquiry.
            </p>
            <button
              type="submit"
              className="w-full py-4 bg-ink text-white font-display text-[0.7rem] font-semibold tracking-[0.16em] uppercase hover:bg-brand transition-colors"
            >
              Submit
            </button>
          </form>

          <div className="space-y-6">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Melbourne+Australia"
              target="_blank"
              rel="noopener noreferrer"
              className="group aspect-[4/3] bg-mist border border-line overflow-hidden relative flex flex-col items-center justify-center gap-3 text-center px-6 hover:border-brand/50 transition-colors"
            >
              <MapPin className="w-8 h-8 text-brand" />
              <div>
                <p className="font-display font-bold text-ink">Melbourne, VIC</p>
                <p className="mt-1 text-sm text-muted-foreground">Australia-wide service &amp; delivery</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand group-hover:text-brandDark">
                Open in Google Maps
                <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </a>
            <div className="space-y-3 text-sm">
              <p className="font-display font-bold text-lg">DROOOV</p>
              <p className="text-muted-foreground">1300 DROOOV · Australia-wide</p>
              <a href="mailto:support@drooov.com.au" className="text-brand hover:underline">
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
