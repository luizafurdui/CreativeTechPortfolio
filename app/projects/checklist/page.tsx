"use client";

import ProjectLayout from "../ProjectLayout";
import Checklist from "../../components/framerMotion/checklist/checklist";

export default function FeedbackPage() {
  return (
    <ProjectLayout
      title="hacker"
      subtitle="Animated feedback UI with clean micro interactions."
      demo={<Checklist />}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">What it shows</h2>
          <ul className="mt-4 space-y-2 text-white/70">
            <li>Success and error states</li>
            <li>Loading transitions</li>
            <li>Reduced motion friendly</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
          <h2 className="text-lg font-semibold">Code</h2>
          <pre className="mt-4 overflow-auto text-sm text-white/80">
{`// your snippet`}
          </pre>
        </div>
      </div>
    </ProjectLayout>
  );
}
