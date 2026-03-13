"use client";

const PROMPTS: Record<string, string> = {
  kyc: `I'm reading the zKYC SDK integration documentation. Here's a summary of the page:

zKYC is a service package that redirects users through a KYC (Know Your Customer) verification flow.

**Installation:**
npm i zkyc-sdk-package@latest

**Usage:**
import { ZKYCProcess } from "zkyc-sdk-package";
await ZKYCProcess({
  apiKey: "prod_***",           // production or test key
  failurePage: "https://yourapp.com/kyc-failed",
  successPage: "https://yourapp.com/kyc-success",
});

**Check verification status (GET API):**
GET https://sdk.zkyc.tech/api/kyc/verifications/{ApplicantId}
Header: x-api-key: <your key>
Response status values: pending | valid | invalid

**Required parameters:** apiKey, failurePage, successPage

Can you help me understand how to integrate this into my application?`,

  aptos: `I'm reading the zKYC Aptos Integration documentation. Here's a summary of the page:

zKYC allows users to verify their identity and sign a commitment on the Aptos blockchain (web3).

**Prerequisites:**
- Node.js 18+
- A zKYC account (app.zkyc.tech)
- An API key (test key is fine to start)

**Installation:**
npm i zkyc-aptos-package@latest

**Trigger Verification (ZKYCProcess):**
import { ZKYCProcess } from "zkyc-sdk-package";
await ZKYCProcess({
  apiKey: "test_your_key_here",
  successPage: "https://yourapp.com/verification-success",
  failurePage: "https://yourapp.com/verification-failed",
});

**Notes:**
- Use a test_ prefixed key during development (sandboxed, no charges)
- Switch to a prod_ key for production (requires $100 minimum deposit)

**After verification:**
- The user receives a proof as a code string at the end of the KYC process
- The proof can optionally be anchored on Aptos if the user connected a wallet
- The proof is valid until the underlying document expires

Can you help me understand how to integrate zKYC with an Aptos web3 application?`,

  python: `I'm reading the zKYC Python SDK documentation. Here's a summary of the page:

The zKYC Python SDK lets you build AI agents that participate in the zKYC agent marketplace. A seller agent registers services and earns USDC. A buyer agent discovers sellers, pays in USDC, and receives results.

**Installation:**
pip install zkyc-agent

**Configuration (ZKYCConfig):**
from zkyc import ZKYCConfig
config = ZKYCConfig(
    agent_id="YOUR_AGENT_ID",
    private_key="0x...",
    rpc_url="https://sepolia.base.org",
    api_base="https://api.zkyc.tech",
    registry_address="0xYOUR_REGISTRY",
    reputation_address="0xYOUR_REPUTATION",
)

**Seller agent:** registers handlers with @seller.on_request("action") and calls seller.listen() to poll for jobs. Payment is verified on-chain before executing the task.

**Buyer agent:** calls buyer.find_agent(action, min_rating), then buyer.call(seller, params) to pay and open a job, buyer.wait_for_result(job) to get the result, and buyer.rate(job) to submit an on-chain reputation rating.

**Key features:**
- Input schema validation before payment (prevents paying for rejected jobs)
- On-chain USDC payment between agents
- Immutable on-chain reputation ratings
- Crash recovery via tx_hash

Can you help me understand how to build a buyer or seller agent using this SDK?`,
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
