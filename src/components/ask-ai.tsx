"use client";

const PROMPTS: Record<string, string> = {
  kyc: `Vibe-code me a complete, runnable Next.js demo app where the user fills in the ZKYCProcess parameters directly in the UI and runs the flow live.

**Package:** npm i zkyc-sdk-package@latest

**SDK:**
import { ZKYCProcess } from "zkyc-sdk-package";
await ZKYCProcess({ apiKey, failurePage, successPage });

**Status check API:**
GET https://sdk.zkyc.tech/api/kyc/verifications/{ApplicantId}
Header: x-api-key: <your key>
Response: { status: "pending" | "valid" | "invalid" }

Build a full Next.js app with these pages:

1. **Home page** — a styled demo form with three labeled inputs:
   - API Key (type=password, placeholder "test_... or prod_...")
   - Success URL (pre-filled with \`\${window.location.origin}/kyc-success\`)
   - Failure URL (pre-filled with \`\${window.location.origin}/kyc-failed\`)
   A "Start KYC Demo" button reads those inputs and calls \`ZKYCProcess({ apiKey, successPage, failurePage })\`. Store the apiKey in sessionStorage so the success page can use it.

2. **/kyc-success page** — reads ApplicantId from the URL query params, retrieves the apiKey from sessionStorage, calls the status API, and displays the verification result (status badge + raw JSON).

3. **/kyc-failed page** — shows a failure message and a "Try Again" button that goes back to home.

Include all files, imports, TypeScript types, and a 3-step setup guide (install → paste your key → npm run dev).`,

  aptos: `Vibe-code me a complete, runnable Next.js + Aptos wallet demo app where the user fills in the ZKYCProcess parameters in the UI and runs the flow live.

**Package:** npm i zkyc-sdk-package@latest

**SDK:**
import { ZKYCProcess } from "zkyc-sdk-package";
await ZKYCProcess({ apiKey, successPage, failurePage });

**Notes:**
- test_ key = sandboxed (no charges); prod_ key = production
- After KYC the user receives a proof string that can be anchored on Aptos
- The proof is valid until the underlying document expires

Build a full Next.js app with these pages:

1. **Home page** — Aptos wallet connect button (use @aptos-labs/wallet-adapter-react), then a demo form with three labeled inputs:
   - API Key (type=password, placeholder "test_... or prod_...")
   - Success URL (pre-filled with \`\${window.location.origin}/kyc-success\`)
   - Failure URL (pre-filled with \`\${window.location.origin}/kyc-failed\`)
   A "Verify Identity" button reads those inputs and calls \`ZKYCProcess({ apiKey, successPage, failurePage })\`. Store the apiKey in sessionStorage.

2. **/kyc-success page** — displays the proof string returned after verification, and a button to anchor the proof on-chain via the connected Aptos wallet.

3. **/kyc-failed page** — failure message and "Try Again" button back to home.

Include all files, imports, TypeScript types, a Move snippet if relevant, and a 3-step setup guide.`,

  python: `Vibe-code me a complete Python demo with two runnable scripts — a seller agent and a buyer agent — using the zKYC Python SDK. All configuration must come from CLI args or a .env file so the demo is fully parameterizable.

**Package:** pip install zkyc-agent

**Config (read from .env or CLI):**
from zkyc import ZKYCConfig
config = ZKYCConfig(
    agent_id=os.getenv("AGENT_ID"),
    private_key=os.getenv("PRIVATE_KEY"),
    rpc_url=os.getenv("RPC_URL", "https://sepolia.base.org"),
    api_base=os.getenv("API_BASE", "https://api.zkyc.tech"),
    registry_address=os.getenv("REGISTRY_ADDRESS"),
    reputation_address=os.getenv("REPUTATION_ADDRESS"),
)

**Seller:** @seller.on_request("action") decorator + seller.listen()
**Buyer:** buyer.find_agent(action, min_rating) → buyer.call(seller, params) → buyer.wait_for_result(job) → buyer.rate(job)

Generate:
1. seller.py — registers a "verify_identity" action, reads all config from env, returns a mock KYC result
2. buyer.py — reads all config from env, finds the seller, calls it, prints the result, and rates the job
3. .env.example listing every required variable with descriptions
4. A brief setup and run guide (pip install → fill .env → python seller.py / python buyer.py)

Include full working code with error handling, comments, and python-dotenv usage.`,
};

interface AskAIProps {
  pageKey?: keyof typeof PROMPTS;
}

export default function AskAI({ pageKey = "kyc" }: AskAIProps) {
  const prompt = PROMPTS[pageKey] ?? PROMPTS.kyc;
  const encoded = encodeURIComponent(prompt);

  return (
    <div className="not-prose flex flex-wrap gap-3">
      <a
        href={`https://claude.ai/new?q=${encoded}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-md bg-white/5 px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-white/10 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z"/>
        </svg>
        Ask Claude
      </a>
      <a
        href={`https://chatgpt.com/?q=${encoded}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-md bg-white/5 px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-white/10 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0L4.01 14.3A4.501 4.501 0 0 1 2.34 7.895zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.808 2.776a4.5 4.5 0 0 1-.676 8.119v-5.678a.79.79 0 0 0-.386-.666zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.807-2.773a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
        </svg>
        Ask ChatGPT
      </a>
    </div>
  );
}
