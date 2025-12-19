import CopyCode from '../_components/CopyCode';
import DocPageLayout from '../_components/DocPageLayout';

const processExample = `"use client";
import { ZKYCProcess } from "zkyc-lfg";

export default function Example() {
  return (
    <button
      onClick={() =>
        ZKYCProcess(
          "df232ee0-b0e9-479d-9d4e-bb97e4d77472", // user/session id
          "test_f891b652bbf3005a23fffc8b3f78ada4ee8424eca4bf553d", // test API key
          "OCR", // service: "OCR" | "FaceLive" | "All" | null
          "https://yourapp.com/failure", // failure redirect
          "https://yourapp.com/pending" // success/pending redirect
        )
      }
      className="rounded-md bg-white px-4 py-2 text-black"
    >
      Start KYC process
    </button>
  );
}`;

const statusExample = `const res = await fetch(
  \`https://sdk.zkyc.tech/api/kyc/verifications/\${userId}\`,
  {
    method: "GET",
    headers: {
      "x-user-id": clientId,
      "x-api-key": apiKey,
    },
  }
);

if (!res.ok) throw new Error(\`HTTP error: \${res.status}\`);
const result = await res.json();
console.log("Verification data", result);`;

export default function SdkIntegrationPage() {
  return (
    <DocPageLayout
      badge="Integration"
      title="SDK integration"
      description="Treat zKYC as a simple SDK call that launches verification and returns a reusable proof when complete."
    >

      <section className="grid gap-6 md:grid-cols-2 mb-10">
        <Step
          title="Install"
          description="Add the SDK to your application."
          body={<CopyCode code="npm i zkyc-lfg@latest" label="Install zKYC" />}
        />
        <Step
          title="Call the flow"
          description="Invoke ZKYCProcess with the user/session id, your API key, the service type, and redirect URLs."
          body={<CopyCode code={processExample} label="Trigger verification" />}
        />
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4 mb-10">
        <h2 className="text-2xl font-semibold text-white mb-2">Check verification status (API)</h2>
        <p className="text-slate-300 leading-relaxed">
          Fetch the verification status for a specific user ID. Use sandbox keys first, then swap to production in your
          deployment environment.
        </p>
        <CopyCode code={statusExample} label="Status endpoint" />
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-6 mb-10">
        <h2 className="text-2xl font-semibold text-white mb-4">Required parameters</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="bg-white/5">
              <tr>
                <th className="px-4 py-3 font-semibold text-white">Parameter</th>
                <th className="px-4 py-3 font-semibold text-white">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 font-mono text-blue-300">userId</td>
                <td className="px-4 py-3 text-slate-200">Unique identifier of the user/session.</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 font-mono text-blue-300">apiKey</td>
                <td className="px-4 py-3 text-slate-200">Your API key (test or production).</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 font-mono text-blue-300">serviceType</td>
                <td className="px-4 py-3 text-slate-200">Verification type: OCR, Liveness, All, or null for basic IDV.</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 font-mono text-blue-300">failurePage</td>
                <td className="px-4 py-3 text-slate-200">URL to redirect the user if verification fails.</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 font-mono text-blue-300">pendingPage</td>
                <td className="px-4 py-3 text-slate-200">URL to redirect the user when verification is pending or complete.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocPageLayout>
  );
}

function Step({ title, description, body }: { title: string; description: string; body: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-slate-300 leading-relaxed">{description}</p>
      {body}
    </div>
  );
}

