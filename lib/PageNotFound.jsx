import { Button } from "@/components/ui/button";
import { createPageUrl } from "@/utils";

export default function PageNotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-3">
          404
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
          Page not found
        </h1>
        <p className="text-slate-400 mb-8">
          The page you’re looking for doesn’t exist, or has moved.
        </p>
        <a href={createPageUrl("Home")}>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl px-6">
            Back to Home
          </Button>
        </a>
      </div>
    </div>
  );
}

