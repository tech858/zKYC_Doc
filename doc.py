from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.lib import colors
from reportlab.pdfgen import canvas


class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        canvas.Canvas.__init__(self, *args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_number(self, page_count):
        self.setFont("Helvetica", 9)
        self.setFillColor(colors.grey)
        self.drawRightString(
            letter[0] - 0.75 * inch,
            0.5 * inch,
            f"Page {self._pageNumber} of {page_count}"
        )


def create_zkyc_pdf():
    doc = SimpleDocTemplate(
        "zKYC_Documentation.pdf",
        pagesize=letter,
        rightMargin=72,
        leftMargin=72,
        topMargin=72,
        bottomMargin=72,
    )

    story = []
    styles = getSampleStyleSheet()

    PURPLE = colors.HexColor('#3d047a')

    title_style = ParagraphStyle(
        'CustomTitle', parent=styles['Heading1'],
        fontSize=36, textColor=PURPLE,
        spaceAfter=30, alignment=TA_CENTER, fontName='Helvetica-Bold'
    )
    heading1_style = ParagraphStyle(
        'CustomHeading1', parent=styles['Heading1'],
        fontSize=24, textColor=PURPLE,
        spaceAfter=12, spaceBefore=24, fontName='Helvetica-Bold'
    )
    heading2_style = ParagraphStyle(
        'CustomHeading2', parent=styles['Heading2'],
        fontSize=18, textColor=PURPLE,
        spaceAfter=10, spaceBefore=16, fontName='Helvetica-Bold'
    )
    heading3_style = ParagraphStyle(
        'CustomHeading3', parent=styles['Heading3'],
        fontSize=14, textColor=PURPLE,
        spaceAfter=8, spaceBefore=8, fontName='Helvetica-Bold'
    )
    body_style = ParagraphStyle(
        'CustomBody', parent=styles['Normal'],
        fontSize=11, leading=16,
        alignment=TA_JUSTIFY, spaceAfter=12
    )
    code_style = ParagraphStyle(
        'Code', parent=styles['Normal'],
        fontSize=9, fontName='Courier',
        textColor=colors.HexColor('#1f2937'),
        backColor=colors.HexColor('#f3f4f6'),
        leftIndent=20, rightIndent=20,
        spaceAfter=12, spaceBefore=8
    )

    def code_block(text):
        escaped = (text
                   .replace('&', '&amp;')
                   .replace('<', '&lt;')
                   .replace('>', '&gt;')
                   .replace('\n', '<br/>')
                   .replace('    ', '&nbsp;&nbsp;&nbsp;&nbsp;')
                   .replace('  ', '&nbsp;&nbsp;'))
        return Paragraph(f"<font face='Courier' size='9'>{escaped}</font>", code_style)

    def numbered_list(items):
        out = []
        for i, item in enumerate(items, 1):
            out.append(Paragraph(f"{i}. {item}", body_style))
        return out

    # ── Title Page ───────────────────────────────────────────────────────────
    story.append(Spacer(1, 2 * inch))
    story.append(Paragraph("zKYC Documentation", title_style))
    story.append(Spacer(1, 0.3 * inch))
    story.append(Paragraph(
        "Privacy-Preserving Identity Verification",
        ParagraphStyle('subtitle', parent=styles['Normal'],
                       fontSize=16, alignment=TA_CENTER,
                       textColor=colors.HexColor('#4b5563'))
    ))
    story.append(Spacer(1, 3 * inch))
    story.append(Paragraph(
        "Version 1.0",
        ParagraphStyle('version', parent=styles['Normal'],
                       fontSize=12, alignment=TA_CENTER, textColor=colors.grey)
    ))
    story.append(PageBreak())

    # ── Table of Contents ────────────────────────────────────────────────────
    story.append(Paragraph("Table of Contents", heading1_style))
    story.append(Spacer(1, 0.2 * inch))

    toc_data = [
        ["1.", "Overview", "3"],
        ["2.", "Use Cases", "4"],
        ["3.", "Architecture", "6"],
        ["4.", "UI Components", "9"],
        ["5.", "AI Agent Components", "11"],
        ["6.", "KYC SDK Integration", "12"],
        ["7.", "Agent sdk", "14"],
        ["8.", "KYC Services", "19"],
    ]

    toc_table = Table(toc_data, colWidths=[0.5 * inch, 5 * inch, 0.5 * inch])
    toc_table.setStyle(TableStyle([
        ('FONT', (0, 0), (-1, -1), 'Helvetica', 11),
        ('TEXTCOLOR', (0, 0), (-1, -1), colors.HexColor('#1f2937')),
        ('ALIGN', (0, 0), (0, -1), 'RIGHT'),
        ('ALIGN', (2, 0), (2, -1), 'RIGHT'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(toc_table)
    story.append(PageBreak())

    # ── Section 1: Overview ──────────────────────────────────────────────────
    story.append(Paragraph("1. Overview", heading1_style))
    story.append(Spacer(1, 0.1 * inch))

    story.append(Paragraph(
        "Among the many things people value, privacy is one of the most precious and also one of the most fragile. "
        "Every day, individuals and autonomous systems are asked the same question: Who are you? To answer it, they hand over passports, "
        "IDs, selfies, credentials, and wallet addresses. These fragments of identity are copied, stored, and passed from one system "
        "to another, quietly accumulating risk. A single breach is enough to turn trust into exposure, leaving people with the "
        "unsettling knowledge that their identity may now belong to strangers.", body_style))

    story.append(Paragraph(
        "Imagine instead a world where identity does not need to be revealed to be trusted. Where a person proves "
        "they are legitimate without disclosing who they are, and where an AI agent can act autonomously on-chain without ever holding "
        "or leaking sensitive human data. In this world, verification happens once, privately, and produces a proof rather than a record.",
        body_style))

    story.append(Paragraph(
        "zKYC brings this model to life. It verifies identities — human or AI — using privacy-preserving cryptography, "
        "issuing cryptographic proofs that remain under the user's control. These proofs can be anchored on-chain as commitments, "
        "enabling trust and interoperability without exposure. For AI agents, verifiable credentials ensure they can securely "
        "authenticate and execute transactions, operating independently while remaining accountable. With zKYC, trust is established "
        "not by revealing identity, but by proving it safely, minimally, and permanently.", body_style))

    story.append(Spacer(1, 0.2 * inch))
    story.append(Paragraph("Core Services", heading3_style))

    story.append(Paragraph("<b>Privacy-Preserving Identity Verification</b>", body_style))
    story.append(Paragraph(
        "zKYC verifies human users and AI agents using zkPass zero-knowledge protocols, confirming "
        "authenticity without exposing sensitive data. A cryptographic proof is issued upon successful verification.", body_style))

    story.append(Paragraph("<b>On-Chain Proof Commitment</b>", body_style))
    story.append(Paragraph(
        "Verified users can link a wallet and store a hash of their verification proof as an on-chain "
        "commitment on Aptos, enabling verification while keeping data and proofs off-chain.", body_style))

    story.append(Paragraph("<b>Verifiable Credentials for AI Agents</b>", body_style))
    story.append(Paragraph(
        "zKYC issues standards-based verifiable credentials (ERC-8004, X402) to AI agents, enabling "
        "secure authentication and trusted on-chain transactions respectively.", body_style))

    story.append(PageBreak())

    # ── Section 2: Use Cases ─────────────────────────────────────────────────
    story.append(Paragraph("2. Use Cases", heading1_style))
    story.append(Spacer(1, 0.1 * inch))

    story.append(Paragraph(
        "zKYC isn't just backend infrastructure; it's here to solve a feeling you already know well: "
        "that small moment of hesitation every time someone online asks you to \"prove who you are.\"", body_style))
    story.append(Paragraph(
        "You want access. You want to play, trade, vote, build. But you don't want to hand your passport, "
        "face, and address to platforms you barely know and hope they never get hacked. zKYC exists exactly for that gap between "
        "what you want to do and what you are forced to give up.", body_style))

    story.append(Paragraph("Verify Once. Play Freely.", heading3_style))
    story.append(Paragraph(
        "Imagine you are about to join a high-stakes tournament or claim a rare in-game asset. "
        "The only thing between you and the match is a KYC form asking for your ID, selfies, maybe even a utility bill.", body_style))
    story.append(Paragraph(
        "You pause. Not because you don't want to play, but because you don't want yet another copy "
        "of your life sitting in another database.", body_style))
    story.append(Paragraph(
        "With zKYC, you verify once in a private way. Out of that, you get a proof that simply says: "
        "this is a real, unique person, old enough, not a bot. The game server never sees your real name, your address, or your "
        "documents. You still get to queue, compete, and win — but your identity stays yours.", body_style))

    story.append(Paragraph("Prove You're Human, Not Who You Are", heading3_style))
    story.append(Paragraph(
        "If you use DeFi seriously, you have probably run into platforms that ask you to upload "
        "documents just to deposit or earn yield. Maybe you walked away. Maybe you went through with it and felt uneasy.", body_style))
    story.append(Paragraph(
        "The question in your head is simple: why does every single protocol need a copy of my ID "
        "to know I am allowed to use it?", body_style))
    story.append(Paragraph(
        "With zKYC, you go through verification once. Behind the scenes, zKYC anchors a cryptographic "
        "commitment on-chain. When you connect your wallet to a compliant DeFi pool or RWA platform, you do not resend your documents. "
        "You present a proof. The protocol learns what it needs to know about you for compliance — not who you are in the real world.",
        body_style))
    story.append(Paragraph(
        "If one app is breached, there is no pile of your personal documents waiting to be leaked. "
        "The proof lives with you.", body_style))

    story.append(Paragraph("Verifiable AI Agents", heading3_style))
    story.append(Paragraph(
        "Maybe you are not just a user; you are building. You are creating an AI agent that should "
        "trade, route payments, or act as an on-chain assistant.", body_style))
    story.append(Paragraph(
        "You want that agent to act independently, but you also want people to trust that it is "
        "legitimate and constrained. You do not want to hard-code your own private keys into a script just so it can move on-chain.",
        body_style))
    story.append(Paragraph(
        "zKYC lets you give your agent its own verifiable credentials. The agent has an on-chain identity "
        "that can be checked by smart contracts and platforms. It can act, sign, and transact within clear limits, while your "
        "personal identity and keys stay separate. People can see that the agent is authorized — without seeing you.", body_style))

    story.append(Paragraph("For Communities and DAOs: A Fair Voice Without Giving Up Privacy", heading3_style))
    story.append(Paragraph(
        "If you have ever joined a DAO or online community, you know how fragile \"fairness\" can be. "
        "A few whales, a few sock-puppet accounts, and voting stops feeling like a community decision.", body_style))
    story.append(Paragraph(
        "You might want one person, one voice — but you do not want to upload passports to a DAO "
        "just to prove you are real.", body_style))
    story.append(Paragraph(
        "With zKYC, you can prove you are a unique human being and get a vote or role based on that, "
        "not just on the tokens you hold. The DAO can defend itself against fake accounts and spam without ever seeing your "
        "underlying identity.", body_style))
    story.append(Paragraph(
        "You participate fully. You keep your privacy. And you no longer have to choose between "
        "being safe and being included.", body_style))

    story.append(PageBreak())

    # ── Section 3: Architecture ──────────────────────────────────────────────
    story.append(Paragraph("3. Macro Architecture", heading1_style))
    story.append(Spacer(1, 0.1 * inch))

    story.append(Paragraph("zKYC Identity Verification", heading2_style))
    story.append(Paragraph("<b>End-to-end lifecycle:</b>", body_style))
    story.extend(numbered_list([
        "User starts verification in the secure zKYC environment.",
        "User is redirected to the zKYC webpage.",
        "zKYC performs document + facematch + liveness checks, then submits to our backend.",
        "zKYC back-end returns the response of the submission — either valid or invalid.",
        "If the KYC response is invalid, the user is redirected to the failure page.",
        "If the KYC response is valid, the zKPass proof is generated and given to the user.",
        "The proof is hashed and stored off-chain.",
        "The zKYC process is complete and the user is redirected to the success page.",
    ]))
    story.append(Spacer(1, 0.1 * inch))
    story.append(Paragraph("<b>zKPass Proofs</b>", body_style))
    story.append(Paragraph(
        "Proofs are small digital confirmations that show a verification was successful. "
        "They don't contain personal documents or sensitive information. Instead, they act like a receipt that anyone "
        "can check to confirm the result. This means you can prove compliance and trustworthiness without exposing "
        "user data, keeping privacy fully protected.", body_style))

    story.append(Spacer(1, 0.2 * inch))
    story.append(Paragraph("zKYC AI Agent Transaction", heading2_style))
    story.append(Paragraph("<b>End-to-end lifecycle:</b>", body_style))
    story.extend(numbered_list([
        "AI agent selects a service from the registered services in zKYC.",
        "After selecting a service, the agent requests the price from the service.",
        "The service sends the AI agent a proposal for pricing.",
        "If the AI approves the proposed quota, a handshake between agent and service is created.",
        "Agent proceeds to payment on the blockchain.",
        "Service executes their payment response.",
    ]))

    story.append(Spacer(1, 0.2 * inch))
    story.append(Paragraph("zKYC Identity Commitment", heading2_style))
    story.append(Paragraph("<b>End-to-end lifecycle:</b>", body_style))
    story.extend(numbered_list([
        "User starts verification in the secure zKYC environment.",
        "User is redirected to the zKYC webpage.",
        "User connects their wallet to the zKYC platform.",
        "zKYC performs document + facematch + liveness checks, then submits to our backend.",
        "zKYC back-end returns the response of the submission — either valid or invalid.",
        "If the KYC response is invalid, the user is redirected to the failure page.",
        "If the KYC response is valid, the zKPass proof is generated and given to the user.",
        "The proof is hashed and stored off-chain and on-chain in the Aptos blockchain.",
        "The zKYC process is complete and the user is redirected to the success page.",
    ]))

    story.append(PageBreak())

    # ── Section 4: UI Components ─────────────────────────────────────────────
    story.append(Paragraph("4. Provided KYC UI Components", heading1_style))
    story.append(Spacer(1, 0.1 * inch))
    story.append(Paragraph(
        "Use the hosted zKYC verification platform to keep sensitive data inside a trusted flow.", body_style))

    story.append(Paragraph("Start a New Verification", heading3_style))
    story.append(Paragraph("Redirect users to the hosted UI to begin the zKYC verification process.", body_style))

    story.append(Paragraph("Document Submissions", heading3_style))
    story.append(Paragraph(
        "Users submit an identity document of their choice for verification. The document is "
        "analyzed to ensure its authenticity and to detect potential forgery.", body_style))

    story.append(Paragraph("Facematch", heading3_style))
    story.append(Paragraph(
        "After submitting the document, the user is required to take a photo of their face. "
        "This image is matched against the portrait extracted from the previously submitted document.", body_style))

    story.append(Paragraph("Liveness Check", heading3_style))
    story.append(Paragraph(
        "To confirm that the user is a real, living person, a liveness check is performed. "
        "This step prevents fraud attempts using static images or automated systems.", body_style))

    story.append(Paragraph("Waiting Response", heading3_style))
    story.append(Paragraph(
        "Once all verification steps are completed, the KYC request is submitted and processed "
        "by our backend. Processing time typically ranges from 1 to 15 minutes.", body_style))

    story.append(Paragraph("Received Proof", heading3_style))
    story.append(Paragraph(
        "After successful verification, the user can download their zKPass proof as a JSON file.", body_style))

    story.append(Paragraph("Proof Verification", heading3_style))
    story.append(Paragraph(
        "Users who already possess a valid zKPass proof can verify their identity without repeating "
        "the zKYC submission process on any platform that supports zKYC verification.", body_style))

    story.append(PageBreak())

    # ── Section 5: AI Components ─────────────────────────────────────────────
    story.append(Paragraph("5. Provided AI UI Components", heading1_style))
    story.append(Spacer(1, 0.1 * inch))
    story.append(Paragraph(
        "Use the hosted zKYC verification platform to keep sensitive data inside a trusted flow.", body_style))
    story.append(Paragraph(
        "<b>Prerequisites:</b> Users must complete a KYC process before being able to register "
        "their AI agents. Once verified, they can start interacting with this side of zKYC.", body_style))

    story.append(Paragraph("AI Agent Registration", heading3_style))
    story.append(Paragraph("1. First, users must connect their chosen wallet.", body_style))
    story.append(Paragraph(
        "2. When the wallet connection is approved, the user assigns a name for the agent "
        "and a verifiable credential is created.", body_style))

    story.append(Paragraph("Service Registration", heading3_style))
    story.append(Paragraph(
        "Users can also register their service to enable on-chain transactions with the registered "
        "AI agents in zKYC.", body_style))

    story.append(PageBreak())

    # ── Section 6: KYC SDK ───────────────────────────────────────────────────
    story.append(Paragraph("6. KYC SDK Integration", heading1_style))
    story.append(Spacer(1, 0.1 * inch))
    story.append(Paragraph(
        "zKYC is a service package that redirects users to the zKYC page, where they go through "
        "a KYC verification process.", body_style))
    story.append(Paragraph(
        "Before integrating the SDK in your application, you will need to register at "
        "<font color='#2563eb'>https://app.zkyc.tech</font> and generate your API key.", body_style))

    story.append(Spacer(1, 0.2 * inch))
    story.append(Paragraph("Step 1: Install", heading3_style))
    story.append(code_block("npm i zkyc-sdk-package@latest"))

    story.append(Paragraph("Step 2: Call the Flow", heading3_style))
    story.append(Paragraph(
        "Invoke ZKYCProcess with your API key and redirect URLs.", body_style))
    story.append(code_block(
        "import React from 'react';\n"
        "import { ZKYCProcess } from \"zkyc-sdk-package\";\n\n"
        "export default function KYCButton() {\n"
        "  const handleKYC = async () => {\n"
        "    try {\n"
        "      await ZKYCProcess({\n"
        "        apiKey: \"prod_***********************************\",\n"
        "        failurePage: `${window.location.origin}/kyc-failed`,\n"
        "        successPage: `${window.location.origin}/kyc-success`,\n"
        "      });\n"
        "    } catch (error) {\n"
        "      console.error('KYC initiation failed:', error);\n"
        "      alert('Failed to start KYC process. Please try again.');\n"
        "    }\n"
        "  };\n\n"
        "  return <button onClick={handleKYC}>Start KYC Verification</button>;\n"
        "}"
    ))

    story.append(Paragraph("Check Verification Status (API)", heading3_style))
    story.append(Paragraph(
        "Fetch the verification status of your users via our API. Status values include: "
        "pending, valid, and invalid.", body_style))
    story.append(code_block(
        "const res = await fetch(\n"
        "  `https://sdk.zkyc.tech/api/kyc/verifications/${ApplicantId}`,\n"
        "  {\n"
        "    method: \"GET\",\n"
        "    headers: { \"x-api-key\": apiKey },\n"
        "  }\n"
        ");\n\n"
        "if (!res.ok) throw new Error(`HTTP error: ${res.status}`);\n"
        "const result = await res.json();\n"
        "console.log(\"Verification data\", result);"
    ))

    story.append(Paragraph("Required Parameters", heading3_style))
    params_data = [
        ['Parameter', 'Description'],
        ['apiKey', 'Your API key (test or production).'],
        ['failurePage', 'URL to redirect the user if verification fails.'],
        ['successPage', 'URL to redirect the user when verification is completed.'],
    ]
    params_table = Table(params_data, colWidths=[1.5 * inch, 4.5 * inch])
    params_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PURPLE),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 11),
        ('BACKGROUND', (0, 1), (-1, -1), colors.HexColor('#f3f4f6')),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
        ('FONTSIZE', (0, 1), (-1, -1), 10),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(params_table)

    story.append(Spacer(1, 0.2 * inch))
    story.append(Paragraph("Resources", heading3_style))
    story.append(Paragraph(
        "GitHub Repository: <font color='#2563eb'>https://github.com/tech858/aws_zkyc_test</font>", body_style))
    story.append(Paragraph("Demo: <font color='#2563eb'>https://demo.zkyc.tech</font>", body_style))

    story.append(PageBreak())

    # ── Section 7: Agent sdk ────────────────────────────────────────────────
    story.append(Paragraph("7. Agent sdk", heading1_style))
    story.append(Spacer(1, 0.1 * inch))
    story.append(Paragraph(
        "The zKYC Agent sdk lets you build AI agents that participate in the zKYC agent marketplace. "
        "A seller agent registers services and earns USDC by executing tasks. "
        "A buyer agent discovers sellers, pays in USDC, and receives results.", body_style))

    # Installation
    story.append(Paragraph("Installation", heading3_style))
    story.append(code_block("pip install zkyc-agent"))

    # Configuration
    story.append(Paragraph("Configuration", heading3_style))
    story.append(Paragraph(
        "Both buyer and seller agents use the same ZKYCConfig object:", body_style))
    story.append(code_block(
        "from zkyc import ZKYCConfig\n\n"
        "config = ZKYCConfig(\n"
        "    agent_id=\"YOUR_AGENT_ID\",           # From the platform dashboard\n"
        "    private_key=\"0x...\",                # Wallet you registered the agent with\n"
        "    rpc_url=\"https://sepolia.base.org\",\n"
        "    api_base=\"https://api.zkyc.tech\",\n"
        "    registry_address=\"0xYOUR_REGISTRY\",\n"
        "    reputation_address=\"0xYOUR_REPUTATION\",\n"
        ")"
    ))

    # Config reference table
    story.append(Paragraph("ZKYCConfig Reference", heading3_style))
    config_data = [
        ['Parameter', 'Required', 'Default', 'Description'],
        ['agent_id', 'Yes', '—', 'Your on-chain agent ID (uint256 as string). From the platform dashboard.'],
        ['private_key', 'Yes', '—', 'Ethereum private key of the wallet registered with the agent.'],
        ['rpc_url', 'Yes', '—', 'RPC endpoint for the target chain.'],
        ['api_base', 'Yes', '—', 'zKYC platform API base URL.'],
        ['registry_address', 'Yes', '—', 'Deployed AgentRegistry contract address.'],
        ['reputation_address', 'Yes', '—', 'Deployed AgentReputation contract address.'],
        ['usdc_address', 'No', 'Sepolia USDC', 'USDC ERC-20 contract address on your chain.'],
        ['chain_id', 'No', '11155111', 'Chain ID. Used in receipt signing to prevent cross-chain replay.'],
        ['request_timeout', 'No', '30.0', 'HTTP timeout in seconds for API calls.'],
        ['min_confirmations', 'No', '1', 'Minimum USDC transfer confirmations before payment is accepted.'],
    ]
    config_table = Table(config_data, colWidths=[1.4 * inch, 0.7 * inch, 1.1 * inch, 2.9 * inch])
    config_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PURPLE),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 10),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.HexColor('#f8fafc'), colors.white]),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
        ('FONTSIZE', (0, 1), (-1, -1), 9),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('ALIGN', (1, 0), (2, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]))
    story.append(config_table)
    story.append(Spacer(1, 0.2 * inch))

    # Seller Quickstart
    story.append(Paragraph("Seller Quickstart", heading2_style))
    story.append(Paragraph(
        "A seller registers service handlers and listens for incoming jobs.", body_style))
    story.append(code_block(
        "import asyncio\n"
        "from zkyc import Seller, ZKYCConfig\n\n"
        "config = ZKYCConfig(\n"
        "    agent_id=\"YOUR_AGENT_ID\",\n"
        "    private_key=\"0x...\",\n"
        "    rpc_url=\"https://sepolia.base.org\",\n"
        "    api_base=\"https://api.zkyc.tech\",\n"
        "    registry_address=\"0x...\",\n"
        "    reputation_address=\"0x...\",\n"
        ")\n\n"
        "seller = Seller(config)\n\n"
        "@seller.on_request(\"translate\")\n"
        "async def handle_translate(params: dict, job: dict) -> str:\n"
        "    # params = { \"text\": \"Hello world\", \"target_lang\": \"fr\" }\n"
        "    result = await my_translation_model(params[\"text\"], params[\"target_lang\"])\n"
        "    return result\n\n"
        "asyncio.run(seller.listen())"
    ))

    story.append(Paragraph("How Seller Payment Works", heading3_style))
    story.extend(numbered_list([
        "A buyer sends USDC directly to your agent's wallet on-chain.",
        "The mailbox creates a pending job record.",
        "Your seller polls for pending jobs via listen().",
        "Before executing the task, the SDK verifies the on-chain USDC transfer.",
        "If payment is confirmed, the handler runs.",
        "The result is stored in the mailbox and a reputation receipt is signed.",
    ]))
    story.append(Paragraph(
        "The seller never receives unverified jobs. If payment is not confirmed on-chain, "
        "the job is skipped until it reaches sufficient confirmations.", body_style))

    story.append(Paragraph("Registering Multiple Actions", heading3_style))
    story.append(code_block(
        "@seller.on_request(\"translate\")\n"
        "async def handle_translate(params: dict, job: dict) -> str:\n"
        "    return await my_translation_model(params[\"text\"], params[\"target_lang\"])\n\n"
        "@seller.on_request(\"summarize\")\n"
        "async def handle_summarize(params: dict, job: dict) -> str:\n"
        "    return await my_summarizer(params[\"text\"], params[\"max_length\"])\n\n"
        "asyncio.run(seller.listen(poll_interval=5.0))"
    ))

    story.append(PageBreak())

    # Buyer Quickstart
    story.append(Paragraph("Buyer Quickstart", heading2_style))
    story.append(Paragraph(
        "A buyer discovers a seller, sends payment, and waits for the result.", body_style))
    story.append(code_block(
        "import asyncio\n"
        "from zkyc import Buyer, ZKYCConfig\n\n"
        "config = ZKYCConfig(\n"
        "    agent_id=\"YOUR_AGENT_ID\",\n"
        "    private_key=\"0x...\",\n"
        "    rpc_url=\"https://sepolia.base.org\",\n"
        "    api_base=\"https://api.zkyc.tech\",\n"
        "    registry_address=\"0x...\",\n"
        "    reputation_address=\"0x...\",\n"
        ")\n\n"
        "async def main():\n"
        "    buyer = Buyer(config)\n\n"
        "    # 1. Find the best available seller for \"translate\"\n"
        "    seller = await buyer.find_agent(action=\"translate\", min_rating=4.0)\n\n"
        "    # 2. Pay and open the job\n"
        "    job = await buyer.call(\n"
        "        seller=seller,\n"
        "        params={\"text\": \"Hello world\", \"target_lang\": \"fr\"}\n"
        "    )\n\n"
        "    # 3. Wait for the seller to complete the task\n"
        "    result = await buyer.wait_for_result(job, timeout=120)\n"
        "    print(result)\n\n"
        "    # 4. Submit the reputation rating on-chain\n"
        "    tx = await buyer.rate(job)\n"
        "    print(f\"Rated on-chain: {tx}\")\n\n"
        "asyncio.run(main())"
    ))

    story.append(Paragraph("How Buyer Payment Works", heading3_style))
    story.extend(numbered_list([
        "find_agent() queries the registry and filters by KYC validity and rating.",
        "call() validates your params against the service's inputs_schema before sending payment — you fail fast if fields are missing.",
        "USDC is transferred directly from your wallet to the seller's wallet on-chain.",
        "The SDK waits for the payment to reach min_confirmations before opening the job.",
        "wait_for_result() polls the mailbox until the seller marks the job complete.",
        "rate() submits the seller's pre-signed reputation receipt on-chain.",
    ]))

    story.append(Paragraph("find_agent() Options", heading3_style))
    story.append(code_block(
        "seller = await buyer.find_agent(\n"
        "    action=\"translate\",  # Required: the action key to search for\n"
        "    min_rating=4.0,      # Optional: minimum average rating (0.0-5.0)\n"
        "    require_kyc=True,    # Optional: only KYC-verified agents (default True)\n"
        ")"
    ))

    story.append(Paragraph("The returned seller dict:", body_style))
    story.append(code_block(
        "{\n"
        "    \"agent\": {\n"
        "        \"agent_id\": \"123456...\",\n"
        "        \"name\": \"TranslateBot\",\n"
        "        \"wallet_address\": \"0x...\",\n"
        "        \"role\": \"seller\",\n"
        "    },\n"
        "    \"service\": {\n"
        "        \"id\": \"svc_abc...\",\n"
        "        \"action\": \"translate\",\n"
        "        \"api_url\": \"https://...\",\n"
        "        \"price_usdc\": \"1.50\",\n"
        "        \"inputs_schema\": {\n"
        "            \"text\": \"string\",\n"
        "            \"target_lang\": \"string\"\n"
        "        }\n"
        "    },\n"
        "    \"rating\": 4.8\n"
        "}"
    ))

    story.append(Paragraph("Input Schema Validation", heading3_style))
    story.append(Paragraph(
        "When a seller registers a service, they define an inputs_schema — the parameters a buyer must send. "
        "The SDK validates params before payment, preventing you from paying for a job that will be rejected:",
        body_style))
    story.append(code_block(
        "# Buyer calls with missing field — raises BuyerError BEFORE payment:\n"
        "job = await buyer.call(seller, params={\"text\": \"Hello\"})\n"
        "# BuyerError: Missing required parameters: ['target_lang']"
    ))

    story.append(Paragraph("Recovery: Crashed After Payment", heading3_style))
    story.append(Paragraph(
        "If your buyer process crashed after payment was sent but before the job was opened, "
        "use the transaction hash from your logs to recover:", body_style))
    story.append(code_block(
        "# Recover using the tx_hash from your logs or blockchain explorer\n"
        "job = buyer.get_job(\"0xABC123...\")\n"
        "result = await buyer.wait_for_result(job, timeout=300)\n"
        "await buyer.rate(job)"
    ))

    story.append(Paragraph(
        "If the job was never opened in the mailbox (crash happened between payment and open_job), "
        "use manual recovery:", body_style))
    story.append(code_block(
        "job = buyer.open_job_manually(\n"
        "    seller_agent_id=\"seller_agent_id_here\",\n"
        "    service_id=\"svc_abc...\",\n"
        "    tx_hash=\"0xABC123...\",\n"
        "    amount_usdc=\"1.50\",\n"
        "    task_payload={\n"
        "        \"action\": \"translate\",\n"
        "        \"params\": {\"text\": \"Hello\", \"target_lang\": \"fr\"}\n"
        "    }\n"
        ")\n"
        "result = await buyer.wait_for_result(job)"
    ))

    story.append(Paragraph("How Reputation Works", heading3_style))
    story.append(Paragraph(
        "After a seller completes a job, they sign a reputation receipt using their private key. "
        "This signature is stored in the mailbox alongside the result. When the buyer calls rate(), "
        "it submits this signature to the AgentReputation contract on-chain. The contract verifies the "
        "signature and records the rating immutably.", body_style))
    story.append(Paragraph(
        "The seller controls what rating they approve (default is 5). The seller's signature commits "
        "them to that rating — they cannot dispute a rating they pre-signed. This means:", body_style))
    for item in [
        "The buyer cannot fake a rating — the seller's signature is required.",
        "The seller cannot avoid a rating for a completed job — the signature is created automatically.",
        "Ratings are immutable on-chain once submitted.",
    ]:
        story.append(Paragraph(f"• {item}", body_style))

    story.append(Paragraph("Checking USDC Balance", heading3_style))
    story.append(code_block(
        "balance = buyer.get_usdc_balance()\n"
        "print(f\"Balance: {balance} USDC\")"
    ))

    story.append(PageBreak())

    # ── Section 8: Services Table ────────────────────────────────────────────
    story.append(Paragraph("8. KYC Services Comparison", heading1_style))
    story.append(Spacer(1, 0.1 * inch))
    story.append(Paragraph("Compare verification coverage and costs across zKYC plans.", body_style))
    story.append(Spacer(1, 0.2 * inch))

    services_data = [
        ['Feature', 'Basic', 'Standard', 'Full KYC'],
        ['Initial deposit', '$100', "Let's talk", "Let's talk"],
        ['Document verification + OCR', '✓', '✓', '✓'],
        ['Facial verification (liveness)', '✓', '✓', '✓'],
        ['Zero-knowledge proofs', '✓', '✓', '✓'],
        ['Emailing service', '—', '✓', '✓'],
        ['AML screening', '—', '+', '✓'],
        ['Address verification', '—', '+', '✓'],
        ['Video verification', '—', '—', '✓'],
        ['Ongoing monitoring', '—', '—', '+'],
        ['Cost per verification', '$1.50', "Let's talk", "Let's talk"],
    ]

    services_table = Table(services_data, colWidths=[2.2 * inch, 1.3 * inch, 1.3 * inch, 1.3 * inch])
    services_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), PURPLE),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 11),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('ALIGN', (1, 1), (-1, -1), 'CENTER'),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.HexColor('#f8fafc'), colors.white]),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
        ('FONTSIZE', (0, 1), (-1, -1), 10),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('FONTNAME', (0, 1), (0, -1), 'Helvetica-Bold'),
    ]))
    story.append(services_table)
    story.append(Spacer(1, 0.3 * inch))

    story.append(Paragraph("Notes", heading3_style))
    story.append(Paragraph("• Minimum monthly spend applies if usage is below $100.", body_style))
    story.append(Paragraph("• Pricing may change with advance notice.", body_style))

    doc.build(story, canvasmaker=NumberedCanvas)
    print("PDF created successfully!")


if __name__ == "__main__":
    create_zkyc_pdf()