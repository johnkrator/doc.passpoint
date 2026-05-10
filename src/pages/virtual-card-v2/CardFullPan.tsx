import { FileText, Info, Lock, ShieldAlert } from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const CardFullPan = () => {
    const endpointCode = () => `GET https://{{baseUrl}}/{{cardContext}}/show-card?id=`;
    const curlCode = () => `curl --location 'https://{{baseUrl}}/{{cardContext}}/show-card?id='`;
    const responseCode = () => `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "card pan revealed",
  "otherInfo": "cardfullpan",
  "securityCode": "cvv",
  "expiryInfo": "expirydisplay"
}`;

    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <FileText className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Get Card Full PAN
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Reveal the full unmasked card number, CVV, and expiry details.
                </p>
            </section>

            {/* How This Endpoint Works */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <ShieldAlert className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How This Endpoint Works</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-xl">
                    This is a sensitive endpoint that returns raw card credentials. Read the security guidance below before integrating.
                </p>

                <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <p className="text-xs font-semibold text-foreground uppercase tracking-wider">What Is Returned</p>
                            <p className="text-xs text-muted-foreground">The response includes the full unmasked card number (PAN), CVV/CVC security code, and expiry date. These are the credentials a cardholder needs to make purchases at online merchants.</p>
                        </div>
                        <div className="space-y-1.5">
                            <p className="text-xs font-semibold text-foreground uppercase tracking-wider">PCI Compliance</p>
                            <p className="text-xs text-muted-foreground">
                                <span className="font-medium text-foreground">Do not log or store</span> the returned PAN or CVV in your database, server logs, or analytics. Render the credentials in a secure, ephemeral UI element that auto-clears after 30–60 seconds.
                            </p>
                        </div>
                        <div className="space-y-1.5">
                            <p className="text-xs font-semibold text-foreground uppercase tracking-wider">When to Call This</p>
                            <p className="text-xs text-muted-foreground">Only call this endpoint when the authenticated cardholder explicitly requests to view their card number  for example, from a "Show card details" button in your app. Never call this in automated or background processes.</p>
                        </div>
                        <div className="space-y-1.5">
                            <p className="text-xs font-semibold text-foreground uppercase tracking-wider">Access Control</p>
                            <p className="text-xs text-muted-foreground">Always require user authentication (such as a PIN, biometric, or session re-verification) before calling this endpoint in your application. Rate-limit calls per session to prevent programmatic scraping.</p>
                        </div>
                    </div>
                    <div className="border-t border-border pt-4 flex items-start gap-3">
                        <Lock className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs font-semibold text-foreground mb-0.5">Secure Display Pattern</p>
                            <p className="text-xs text-muted-foreground">Render the PAN and CVV in a component that masks the values by default, reveals them only on a deliberate tap or click, and automatically re-masks after 30–60 seconds of inactivity. Never copy the values into state that outlives the user's current view.</p>
                        </div>
                    </div>
                    <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                        <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">
                            For non-sensitive card metadata (status, masked PAN, billing details), use <strong>Get Card Details</strong> instead  it does not expose raw credentials and is safe for frequent calls.
                        </p>
                    </div>
                </div>
            </section>

            {/* API Endpoint */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <FileText className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Show card PAN</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Pass the card's UUID to retrieve the full PAN, security code, and expiry.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-brand-50 text-brand dark:bg-brand-950/40 dark:text-brand/80">GET</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{cardContext}}"}/show-card?id=
                        </code>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                        <div className="px-5 py-3 border-b border-border bg-muted/30">
                            <h4 className="text-sm font-semibold text-foreground">Headers</h4>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                <tr className="border-b border-border">
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Header</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Value</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">x-channel-id</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">CHANNEL_ID</td>
                                </tr>
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">x-channel-code</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">CHANNEL_CODE</td>
                                </tr>
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">x-merchant-id</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">YOUR_MERCHANT_ID</td>
                                </tr>
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">Authorization</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">Bearer [your-access-token]</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                        <div className="px-5 py-3 border-b border-border bg-muted/30">
                            <h4 className="text-sm font-semibold text-foreground">Query parameters</h4>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                <tr className="border-b border-border">
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Parameter</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                <tr className="hover:bg-muted/20 transition-colors">
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">id</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">The card UUID</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Endpoint</h4>
                            <CodeBlock>{endpointCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">cURL example</h4>
                            <CodeBlock language="bash">{curlCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{responseCode()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CardFullPan;
