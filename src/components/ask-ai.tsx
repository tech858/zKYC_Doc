"use client";

const PROMPTS: Record<string, string> = {
  kyc: `Build me a complete working Next.js app example that integrates the zKYC SDK.

**Package:** npm i zkyc-sdk-package@latest

**SDK usage:**
import { ZKYCProcess } from "zkyc-sdk-package";
await ZKYCProcess({
  apiKey: "prod_***",
  failurePage: "https://yourapp.com/kyc-failed",
  successPage: "https://yourapp.com/kyc-success",
});

**Check verification status (GET API):**
GET https://sdk.zkyc.tech/api/kyc/verifications/{ApplicantId}
Header: x-api-key: <your key>
Response status values: pending | valid | invalid

Please generate a full app with:
1. A page with a "Start KYC" button that calls ZKYCProcess
2. A /kyc-success page that calls the status API and shows the verification result
3. A /kyc-failed page with a retry option
Include all files, imports, and a brief setup guide.`,

  aptos: `Build me a complete working Next.js + Aptos wallet app example that integrates zKYC.

**Package:** npm i zkyc-aptos-package@latest

**Trigger verification:**
import { ZKYCProcess } from "zkyc-sdk-package";
await ZKYCProcess({
  apiKey: "test_your_key_here",
  successPage: "https://yourapp.com/verification-success",
  failurePage: "https://yourapp.com/verification-failed",
});

**Notes:**
- test_ key = sandboxed (no charges); prod_ key = production
- After KYC the user gets a proof string that can be anchored on Aptos if a wallet is connected
- The proof is valid until the underlying document expires

Please generate a full app with:
1. Aptos wallet connect button (use @aptos-labs/wallet-adapter-react)
2. "Verify Identity" button that triggers ZKYCProcess
3. A success page that displays the proof and lets the user anchor it on-chain
4. A failed page with retry
Include all files, imports, Move snippet if needed, and a brief setup guide.`,

  python: `Build me a complete working Python example with two scripts — a seller agent and a buyer agent — using the zKYC Python SDK.

**Package:** pip install zkyc-agent

**Config:**
from zkyc import ZKYCConfig
config = ZKYCConfig(
    agent_id="YOUR_AGENT_ID",
    private_key="0x...",
    rpc_url="https://sepolia.base.org",
    api_base="https://api.zkyc.tech",
    registry_address="0xYOUR_REGISTRY",
    reputation_address="0xYOUR_REPUTATION",
)

**Seller:** @seller.on_request("action") decorator + seller.listen()
**Buyer:** buyer.find_agent(action, min_rating) → buyer.call(seller, params) → buyer.wait_for_result(job) → buyer.rate(job)

Please generate:
1. seller.py — a seller agent that registers a "verify_identity" action and returns a mock KYC result
2. buyer.py — a buyer agent that finds the seller, pays, and prints the result
3. .env.example with all required variables
4. A brief setup and run guide
Include full working code with error handling and comments.`,
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
          <path d="M17.304 12.235c.27-.129.52-.296.74-.497a3.547 3.547 0 0 0 1.08-3.837 3.55 3.55 0 0 0-3.232-2.392H8.555a.623.623 0 0 0-.623.623v11.736c0 .344.28.623.623.623h7.554a3.677 3.677 0 0 0 3.677-3.677 3.68 3.68 0 0 0-2.482-3.579zM9.8 7.37h5.856a2.202 2.202 0 0 1 0 4.403H9.8V7.37zm5.998 9.024H9.8v-3.276h5.998a1.638 1.638 0 0 1 0 3.276z"/>
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
