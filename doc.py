from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle, Image
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
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
            letter[0] - 0.75*inch,
            0.5*inch,
            f"Page {self._pageNumber} of {page_count}"
        )

def create_zkyc_pdf():
    # Create PDF document
    doc = SimpleDocTemplate(
        "zKYC_Documentation.pdf",
        pagesize=letter,
        rightMargin=72,
        leftMargin=72,
        topMargin=72,
        bottomMargin=72,
    )
    
    # Container for the 'Flowable' objects
    story = []
    
    # Get sample style sheet
    styles = getSampleStyleSheet()
    
    # Create custom styles
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=36,
        textColor=colors.HexColor('#3d047a'),
        spaceAfter=30,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )
    
    heading1_style = ParagraphStyle(
        'CustomHeading1',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor('#3d047a'),
        spaceAfter=12,
        spaceBefore=24,
        fontName='Helvetica-Bold'
    )
    
    heading2_style = ParagraphStyle(
        'CustomHeading2',
        parent=styles['Heading2'],
        fontSize=18,
        textColor=colors.HexColor('#3d047a'),
        spaceAfter=10,
        spaceBefore=16,
        fontName='Helvetica-Bold'
    )
    
    heading3_style = ParagraphStyle(
        'CustomHeading3',
        parent=styles['Heading3'],
        fontSize=14,
        textColor=colors.HexColor('#3d047a'),
        spaceAfter=8,
        spaceBefore=8,
        fontName='Helvetica-Bold'
    )
    
    body_style = ParagraphStyle(
        'CustomBody',
        parent=styles['Normal'],
        fontSize=11,
        leading=16,
        alignment=TA_JUSTIFY,
        spaceAfter=12
    )
    
    code_style = ParagraphStyle(
        'Code',
        parent=styles['Normal'],
        fontSize=9,
        fontName='Courier',
        textColor=colors.HexColor('#1f2937'),
        backColor=colors.HexColor('#f3f4f6'),
        leftIndent=20,
        rightIndent=20,
        spaceAfter=12,
        spaceBefore=8
    )
    
    # Title Page
    story.append(Spacer(1, 2*inch))
    story.append(Paragraph("zKYC Documentation", title_style))
    story.append(Spacer(1, 0.3*inch))
    story.append(Paragraph("Privacy-Preserving Identity Verification", 
                          ParagraphStyle('subtitle', parent=styles['Normal'], 
                                       fontSize=16, alignment=TA_CENTER, 
                                       textColor=colors.HexColor('#4b5563'))))
    story.append(Spacer(1, 3*inch))
    story.append(Paragraph("Version 1.0", 
                          ParagraphStyle('version', parent=styles['Normal'], 
                                       fontSize=12, alignment=TA_CENTER,
                                       textColor=colors.grey)))
    story.append(PageBreak())
    
    # Table of Contents
    story.append(Paragraph("Table of Contents", heading1_style))
    story.append(Spacer(1, 0.2*inch))
    
    toc_data = [
        ["1.", "Overview", "3"],
        ["2.", "Use Cases", "4"],
        ["3.", "Architecture", "6"],
        ["4.", "UI Components", "9"],
        ["5.", "AI Agent Components", "11"],
        ["6.", "SDK Integration", "12"],
        ["7.", "KYC Services", "14"],
    ]
    
    toc_table = Table(toc_data, colWidths=[0.5*inch, 5*inch, 0.5*inch])
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
    
    # Section 1: Overview
    story.append(Paragraph("1. Overview", heading1_style))
    story.append(Spacer(1, 0.1*inch))
    
    overview_text = """Among the many things people value, privacy is one of the most precious and also one of the most fragile. 
    Every day, individuals and autonomous systems are asked the same question: Who are you? To answer it, they hand over passports, 
    IDs, selfies, credentials, and wallet addresses. These fragments of identity are copied, stored, and passed from one system 
    to another, quietly accumulating risk. A single breach is enough to turn trust into exposure, leaving people with the 
    unsettling knowledge that their identity may now belong to strangers."""
    story.append(Paragraph(overview_text, body_style))
    
    overview_text2 = """Imagine instead a world where identity does not need to be revealed to be trusted. Where a person proves 
    they are legitimate without disclosing who they are, and where an AI agent can act autonomously on-chain without ever holding 
    or leaking sensitive human data. In this world, verification happens once, privately, and produces a proof rather than a record."""
    story.append(Paragraph(overview_text2, body_style))
    
    overview_text3 = """zKYC brings this model to life. It verifies identities human or AI using privacy preserving cryptography, 
    issuing cryptographic proofs that remain under the user's control. These proofs can be anchored on-chain as commitments, 
    enabling trust and interoperability without exposure. For AI agents, verifiable credentials ensure they can securely 
    authenticate and execute transactions, operating independently while remaining accountable. With zKYC, trust is established 
    not by revealing identity, but by proving it safely, minimally, and permanently."""
    story.append(Paragraph(overview_text3, body_style))
    story.append(Spacer(1, 0.2*inch))
    
    story.append(Paragraph("Core Services", heading3_style))
    
    story.append(Paragraph("<b>Privacy-Preserving Identity Verification</b>", body_style))
    story.append(Paragraph("""zKYC verifies human users and AI agents using zkPass zero-knowledge protocols, confirming 
    authenticity without exposing sensitive data. A cryptographic proof is issued upon successful verification.""", body_style))
    
    story.append(Paragraph("<b>On-Chain Proof Commitment</b>", body_style))
    story.append(Paragraph("""Verified users can link a wallet and store a hash of their verification proof as an on-chain 
    commitment on Aptos, enabling verification while keeping data and proofs off-chain.""", body_style))
    
    story.append(Paragraph("<b>Verifiable Credentials for AI Agents</b>", body_style))
    story.append(Paragraph("""zKYC issues standards-based verifiable credentials (ERC-8004, X402) to AI agents, enabling 
    secure authentication and trusted on-chain transactions respectively.""", body_style))
    
    story.append(PageBreak())
    
    # Section 2: Use Cases
    story.append(Paragraph("2. Use Cases", heading1_style))
    story.append(Spacer(1, 0.1*inch))
    
    story.append(Paragraph("""zKYC isn't just backend infrastructure; it's here to solve a feeling you already know well: 
    that small moment of hesitation every time someone online asks you to "prove who you are." """, body_style))
    
    story.append(Paragraph("""You want access. You want to play, trade, vote, build. But you don't want to hand your passport, 
    face, and address to platforms you barely know and hope they never get hacked. zKYC exists exactly for that gap between 
    what you want to do and what you are forced to give up.""", body_style))
    story.append(Spacer(1, 0.1*inch))
    
    story.append(Paragraph("Verify Once. Play Freely.", heading3_style))
    story.append(Paragraph("""Imagine you are about to join a high-stakes tournament or claim a rare in-game asset. 
    The only thing between you and the match is a KYC form asking for your ID, selfies, maybe even a utility bill.""", body_style))
    
    story.append(Paragraph("""You pause. Not because you don't want to play, but because you don't want yet another copy 
    of your life sitting in another database.""", body_style))
    
    story.append(Paragraph("""With zKYC, you verify once in a private way. Out of that, you get a proof that simply says: 
    this is a real, unique person, old enough, not a bot. The game server never sees your real name, your address, or your 
    documents. You still get to queue, compete, and win – but your identity stays yours.""", body_style))
    story.append(Spacer(1, 0.1*inch))
    
    story.append(Paragraph("Prove You're Human, Not Who You Are", heading3_style))
    story.append(Paragraph("""If you use DeFi seriously, you have probably run into platforms that ask you to upload 
    documents just to deposit or earn yield. Maybe you walked away. Maybe you went through with it and felt uneasy.""", body_style))
    
    story.append(Paragraph("""The question in your head is simple: why does every single protocol need a copy of my ID 
    to know I am allowed to use it?""", body_style))
    
    story.append(Paragraph("""With zKYC, you go through verification once. Behind the scenes, zKYC anchors a cryptographic 
    commitment on-chain. When you connect your wallet to a compliant DeFi pool or RWA platform, you do not resend your documents. 
    You present a proof. The protocol learns what it needs to know about you for compliance – not who you are in the real world.""", 
    body_style))
    
    story.append(Paragraph("""If one app is breached, there is no pile of your personal documents waiting to be leaked. 
    The proof lives with you.""", body_style))
    story.append(Spacer(1, 0.1*inch))
    
    story.append(Paragraph("Verifiable AI Agents", heading3_style))
    story.append(Paragraph("""Maybe you are not just a user; you are building. You are creating an AI agent that should 
    trade, route payments, or act as an on-chain assistant.""", body_style))
    
    story.append(Paragraph("""You want that agent to act independently, but you also want people to trust that it is 
    legitimate and constrained. You do not want to hard-code your own private keys into a script just so it can move on-chain.""", 
    body_style))
    
    story.append(Paragraph("""zKYC lets you give your agent its own verifiable credentials. The agent has an on-chain identity 
    that can be checked by smart contracts and platforms. It can act, sign, and transact within clear limits, while your 
    personal identity and keys stay separate. People can see that the agent is authorized – without seeing you.""", body_style))
    story.append(Spacer(1, 0.1*inch))
    
    story.append(Paragraph("For Communities and DAOs: A Fair Voice Without Giving Up Privacy", heading3_style))
    story.append(Paragraph("""If you have ever joined a DAO or online community, you know how fragile "fairness" can be. 
    A few whales, a few sock-puppet accounts, and voting stops feeling like a community decision.""", body_style))
    
    story.append(Paragraph("""You might want one person, one voice – but you do not want to upload passports to a DAO 
    just to prove you are real.""", body_style))
    
    story.append(Paragraph("""With zKYC, you can prove you are a unique human being and get a vote or role based on that, 
    not just on the tokens you hold. The DAO can defend itself against fake accounts and spam without ever seeing your 
    underlying identity.""", body_style))
    
    story.append(Paragraph("""You participate fully. You keep your privacy. And you no longer have to choose between 
    being safe and being included.""", body_style))
    
    story.append(PageBreak())
    
    # Section 3: Architecture
    story.append(Paragraph("3. Macro Architecture", heading1_style))
    story.append(Spacer(1, 0.1*inch))
    
    story.append(Paragraph("zKYC Identity Verification", heading2_style))
    story.append(Paragraph("<b>End-to-end lifecycle:</b>", body_style))
    
    lifecycle_items = [
        "User starts verification in the secure zKYC environment.",
        "User is redirected to the zKYC webpage.",
        "zKYC performs document + facematch + liveness checks then it is submitted to our backend.",
        "zKYC back-end returns the response of the submission that could be valid or invalid.",
        "If the KYC response is invalid user is redirected to the failure page.",
        "If the KYC response is valid the zKPass proof is generated and given to the user.",
        "The proof is hashed and stored off-chain.",
        "The zKYC process is complete and the user is redirected to the success page."
    ]
    
    for i, item in enumerate(lifecycle_items, 1):
        story.append(Paragraph(f"{i}. {item}", body_style))
    story.append(Spacer(1, 0.1*inch))
    
    story.append(Paragraph("<b>zKPass Proofs</b>", body_style))
    story.append(Paragraph("""Proofs are small digital confirmations that show a verification was successful. 
    They don't contain personal documents or sensitive information. Instead, they act like a receipt that anyone 
    can check to confirm the result. This means you can prove compliance and trustworthiness without exposing 
    user data, keeping privacy fully protected.""", body_style))
    story.append(Spacer(1, 0.2*inch))
    
    story.append(Paragraph("zKYC AI Agent Transaction", heading2_style))
    story.append(Paragraph("<b>End-to-end lifecycle:</b>", body_style))
    
    ai_lifecycle_items = [
        "AI agent selects a service from the registered services in zKYC.",
        "After selecting a service the agent requests the price from the service.",
        "Service sends to the AI agent a proposal for pricing.",
        "If the AI approved the proposed quota then a handshake between agent and service is created.",
        "Agent proceeds to payment in the blockchain.",
        "Service executes their payment response."
    ]
    
    for i, item in enumerate(ai_lifecycle_items, 1):
        story.append(Paragraph(f"{i}. {item}", body_style))
    story.append(Spacer(1, 0.2*inch))
    
    story.append(Paragraph("zKYC Identity Commitment", heading2_style))
    story.append(Paragraph("<b>End-to-end lifecycle:</b>", body_style))
    
    commitment_lifecycle_items = [
        "User starts verification in the secure zKYC environment.",
        "User is redirected to the zKYC webpage.",
        "User connects their wallet to zKYC platform.",
        "zKYC performs document + facematch + liveness checks then it is submitted to our backend.",
        "zKYC back-end returns the response of the submission that could be valid or invalid.",
        "If the KYC response is invalid user is redirected to the failure page.",
        "If the KYC response is valid the zKPass proof is generated and given to the user.",
        "The proof is hashed and stored off-chain and on-chain in the Aptos blockchain.",
        "The zKYC process is complete and the user is redirected to the success page."
    ]
    
    for i, item in enumerate(commitment_lifecycle_items, 1):
        story.append(Paragraph(f"{i}. {item}", body_style))
    
    story.append(PageBreak())
    
    # Section 4: UI Components
    story.append(Paragraph("4. Provided KYC UI Components", heading1_style))
    story.append(Spacer(1, 0.1*inch))
    
    story.append(Paragraph("""Use the hosted zKYC verification platform to keep sensitive data inside a trusted flow.""", 
                          body_style))
    
    story.append(Paragraph("Start a New Verification", heading3_style))
    story.append(Paragraph("""Redirect users to the hosted UI to begin the zKYC verification process.""", body_style))
    story.append(Spacer(1, 0.1*inch))
    
    story.append(Paragraph("Document Submissions", heading3_style))
    story.append(Paragraph("""Users submit an identity document of their choice for verification. The document is 
    analyzed to ensure its authenticity and to detect potential forgery.""", body_style))
    story.append(Spacer(1, 0.1*inch))
    
    story.append(Paragraph("Facematch", heading3_style))
    story.append(Paragraph("""After submitting the document, the user is required to take a photo of their face. 
    This image is matched against the portrait extracted from the previously submitted document.""", body_style))
    story.append(Spacer(1, 0.1*inch))
    
    story.append(Paragraph("Liveness Check", heading3_style))
    story.append(Paragraph("""To confirm that the user is a real, living person, a liveness check is performed. 
    This step prevents fraud attempts using static images or automated systems.""", body_style))
    story.append(Spacer(1, 0.1*inch))
    
    story.append(Paragraph("Waiting Response", heading3_style))
    story.append(Paragraph("""Once all verification steps are completed, the KYC request is submitted and processed 
    by our backend. Processing time typically ranges from 1 to 15 minutes.""", body_style))
    story.append(Spacer(1, 0.1*inch))
    
    story.append(Paragraph("Received Proof", heading3_style))
    story.append(Paragraph("""After successful verification, the user can download their zKPass proof as a JSON file.""", 
                          body_style))
    story.append(Spacer(1, 0.1*inch))
    
    story.append(Paragraph("Proof Verification", heading3_style))
    story.append(Paragraph("""Users who already possess a valid zKPass proof can verify their identity without repeating 
    the zKYC submission process on any platform that supports zKYC verification.""", body_style))
   
    story.append(PageBreak())
    
    # Section 5: AI Components
    story.append(Paragraph("5. Provided AI UI Components", heading1_style))
    story.append(Spacer(1, 0.1*inch))
    
    story.append(Paragraph("""Use the hosted zKYC verification platform to keep sensitive data inside a trusted flow.""", 
                          body_style))
    
    story.append(Paragraph("<b>Prerequisites:</b> User must go through a KYC process before being able to register "
                          "their AI agents. Once they are verified they can start interacting with this side of zKYC.", 
                          body_style))
    story.append(Spacer(1, 0.1*inch))
    
    story.append(Paragraph("AI Agent Registration", heading3_style))
    story.append(Paragraph("""1. First users must connect their chosen wallet.""", body_style))
    story.append(Paragraph("""2. When the wallet connection is approved the user assigns a name for the agent, 
    and a verifiable credential is created.""", body_style))
    story.append(Spacer(1, 0.1*inch))
    
    story.append(Paragraph("Service Registration", heading3_style))
    story.append(Paragraph("""On the other hand, users can register their service to enable on-chain transactions 
    with the registered AI agents in zKYC.""", body_style))
    
    story.append(PageBreak())
    
    # Section 6: SDK
    story.append(Paragraph("6. KYC SDK Integration", heading1_style))
    story.append(Spacer(1, 0.1*inch))
    
    story.append(Paragraph("""zKYC is a service package that redirects users to the zKYC page, where they go through 
    a KYC verification process.""", body_style))
    story.append(Spacer(1, 0.1*inch))
    
    story.append(Paragraph("""Before integrating the SDK in your application, you will need to register at 
    <font color='#2563eb'>https://app.zkyc.tech</font> and generate your private key.""", body_style))
    story.append(Spacer(1, 0.2*inch))
    
    story.append(Paragraph("Step 1: Install", heading3_style))
    story.append(Paragraph("Add the SDK to your application:", body_style))
    story.append(Paragraph("<font face='Courier' size='10'>npm i zkyc-sdk-package@latest</font>", code_style))
    story.append(Spacer(1, 0.1*inch))
    
    story.append(Paragraph("Step 2: Call the Flow", heading3_style))
    story.append(Paragraph("""Invoke <font face='Courier'>ZKYCProcess</font> with the user/session id, your API key, 
    the service type, and redirect URLs.""", body_style))
    
    code_example = """import React from 'react';
import { ZKYCProcess } from "zkyc-sdk-package";

export default function KYCButton() {
  const handleKYC = async () => {
    try {
      await ZKYCProcess({
        apiKey: "prod_***********************************", 
        failurePage: `${window.location.origin}/kyc-failed`,
        successPage: `${window.location.origin}/kyc-success`,
      });
    } catch (error) {
      console.error('KYC initiation failed:', error);
      alert('Failed to start KYC process. Please try again.');
    }
  };

  return <button onClick={handleKYC}>Start KYC Verification</button>;
}"""
    
    story.append(Paragraph("<font face='Courier' size='9'>" + code_example.replace('\n', '<br/>') + "</font>", 
                          code_style))
    story.append(Spacer(1, 0.2*inch))
    
    story.append(Paragraph("Check Verification Status (API)", heading3_style))
    story.append(Paragraph("""Fetch the verification status of your users via our API. Status values include: 
    pending, valid, and invalid.""", body_style))
    
    api_code = """const res = await fetch(
  `https://sdk.zkyc.tech/api/kyc/verifications/${ApplicantId}`,
  {
    method: "GET",
    headers: {
      "x-api-key": apiKey,
    },
  }
);

if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
const result = await res.json();
console.log("Verification data", result);"""
    
    story.append(Paragraph("<font face='Courier' size='9'>" + api_code.replace('\n', '<br/>') + "</font>", 
                          code_style))
    story.append(Spacer(1, 0.2*inch))
    
    story.append(Paragraph("Required Parameters", heading3_style))
    
    params_data = [
        ['Parameter', 'Description'],
        ['apiKey', 'Your API key (test or production).'],
        ['failurePage', 'URL to redirect the user if verification fails.'],
        ['successPage', 'URL to redirect the user when verification is completed.'],
    ]
    
    params_table = Table(params_data, colWidths=[1.5*inch, 4.5*inch])
    params_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#3d047a')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('ALIGN', (1, 0), (-1, -1), 'CENTER'),  # Center all other columns including headers
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 11),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('BACKGROUND', (0, 1), (-1, -1), colors.HexColor('#f3f4f6')),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
        ('FONTSIZE', (0, 1), (-1, -1), 10),
        ('TOPPADDING', (0, 1), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 1), (-1, -1), 8),
    
    ]))
    story.append(params_table)
    story.append(Spacer(1, 0.2*inch))
    
    story.append(Paragraph("Resources", heading3_style))
    story.append(Paragraph("GitHub Repository: <font color='#2563eb'>https://github.com/tech858/aws_zkyc_test</font>", 
                          body_style))
    story.append(Paragraph("Demo: <font color='#2563eb'>https://demo.zkyc.tech</font>", body_style))
    
    story.append(PageBreak())
    
    # Section 7: Services Table
    story.append(Paragraph("7. KYC Services Comparison", heading1_style))
    story.append(Spacer(1, 0.1*inch))
    
    story.append(Paragraph("Compare verification coverage and costs across zKYC plans.", body_style))
    story.append(Spacer(1, 0.2*inch))
    
    # Create services comparison table
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
        ['Cost per verification', '$1.20', "Let's talk", "Let's talk"],
    ]
    
    services_table = Table(services_data, colWidths=[2.2*inch, 1.3*inch, 1.3*inch, 1.3*inch])
    services_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#3d047a')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('ALIGN', (1, 1), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
         ('FONTSIZE', (0, 0), (-1, 0), 11),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('BACKGROUND', (0, 1), (-1, -1), colors.HexColor('#f8fafc')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.HexColor('#f8fafc'), colors.white]),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
        ('FONTSIZE', (0, 1), (-1, -1), 10),
        ('TOPPADDING', (0, 1), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 1), (-1, -1), 8),
        ('FONTNAME', (0, 1), (0, -1), 'Helvetica-Bold'),
    ]))
    story.append(services_table)
    story.append(Spacer(1, 0.3*inch))
    
    story.append(Paragraph("Notes", heading3_style))
    story.append(Paragraph("• Minimum monthly spend applies if usage is below $100.", body_style))
    story.append(Paragraph("• Pricing may change with advance notice.", body_style))
    story.append(Spacer(1, 0.2*inch))
    
    
    
    # Build PDF
    doc.build(story, canvasmaker=NumberedCanvas)
    print("PDF created successfully!")

if __name__ == "__main__":
    create_zkyc_pdf()