import { Building2, Info, AlertTriangle } from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

type RequestRow = {
    name: string;
    type: string;
    description: string;
};

type ResponseRow = {
    name: string;
    type: string;
    presence: "mandatory" | "conditional";
    description: string;
};

const REQUEST_PARAMS: RequestRow[] = [
    {
        name: "accountName",
        type: "string",
        description: "the name to be assigned to the virtual account",
    },
    {
        name: "currency",
        type: "string",
        description: "the currency of the account",
    },
    {
        name: "email",
        type: "string",
        description: "the email of the account holder",
    },
    {
        name: "phone",
        type: "string",
        description: "the phone number of the account holder",
    },
    {
        name: "otherInfo",
        type: "Object",
        description: "this contains other kyc information about the account holder",
    },
    {
        name: "otherInfo.address",
        type: "string",
        description: "the address of the business",
    },
    {
        name: "otherInfo.idNumber",
        type: "string",
        description: "the id number of the business contact person",
    },
    {
        name: "otherInfo.idType",
        type: "string",
        description: "the type of identity of the account holder. Supported id types are passport, national_id, drivers_license, state_or_provincial_id, permanent_residency_id, visa, ssn",
    },
    {
        name: "otherInfo.dateOfBirth",
        type: "string",
        description: "the date of birth of the business contact person e.g. director of the business. Should be in the format yyyy-MM-dd",
    },
    {
        name: "otherInfo.taxId",
        type: "string",
        description: "the tax id of the business",
    },
    {
        name: "otherInfo.businessName",
        type: "string",
        description: "the business name",
    },
    {
        name: "otherInfo.businessUrl",
        type: "string",
        description: "the business website url",
    },
    {
        name: "otherInfo.beneficialOwner",
        type: "string",
        description: "the name of one of the business owners who owns above 25% shares",
    },
    {
        name: "otherInfo.uploadRef",
        type: "string",
        description: "the reference to the uploaded kyc document. kyc document for every account holder is required to be uploaded",
    },
];

const RESPONSE_PARAMS: ResponseRow[] = [
    {
        name: "responseCode",
        type: "string",
        presence: "mandatory",
        description: "the response code",
    },
    {
        name: "responseDescription",
        type: "string",
        presence: "mandatory",
        description: "the response description",
    },
    {
        name: "responseMessage",
        type: "string",
        presence: "mandatory",
        description: "the response message",
    },
    {
        name: "data",
        type: "Object",
        presence: "conditional",
        description: "the response details of the generated account. This is present if responseCode = 00",
    },
    {
        name: "data.accountNumber",
        type: "string",
        presence: "conditional",
        description: "the generated account number",
    },
    {
        name: "data.accountName",
        type: "string",
        presence: "conditional",
        description: "the account holder name",
    },
    {
        name: "data.bankName",
        type: "string",
        presence: "conditional",
        description: "the bank name",
    },
    {
        name: "data.bankCode",
        type: "string",
        presence: "conditional",
        description: "the bank code. defaults to 000000",
    },
    {
        name: "data.active",
        type: "boolean",
        presence: "conditional",
        description: "this indicates if the account is active or not. generated accounts become active after 24hours",
    },
    {
        name: "data.otherInfo",
        type: "Object",
        presence: "conditional",
        description: "other details of the generated account",
    },
    {
        name: "data.otherInfo.routingNumber",
        type: "string",
        presence: "conditional",
        description: "the routing number",
    },
    {
        name: "data.otherInfo.ach",
        type: "Object",
        presence: "conditional",
        description: "These are account details specific to ach. This is expected if they are different from the general account number and routing number mentioned above",
    },
    {
        name: "data.otherInfo.rtp",
        type: "Object",
        presence: "conditional",
        description: "These are account details specific to rtp. This is expected if they are different from the general account number and routing number mentioned above",
    },
    {
        name: "data.otherInfo.wire",
        type: "Object",
        presence: "conditional",
        description: "These are account details specific to wire. This is expected if they are different from the general account number and routing number mentioned above",
    },
];

const getEndpoint = () =>
    `POST https://{{baseUrl}}/{{paymentContext}}/ft-app/generate-virtual-account?type=business`;

const getRequestBody = () =>
    `{
  "accountName": "Acme Corp",
  "currency": "USD",
  "email": "finance@acmecorp.com",
  "phone": "08116070111",
  "otherInfo": {
    "address": "123 Business Park, New York",
    "idNumber": "A12345678",
    "idType": "passport",
    "dateOfBirth": "1980-06-20",
    "taxId": "TAX-98765",
    "businessName": "Acme Corporation",
    "businessUrl": "https://acmecorp.com",
    "beneficialOwner": "John Doe",
    "uploadRef": "kyc-upload-ref-id"
  }
}`;

const getCurlRequest = () =>
    `curl --location 'https://{{baseUrl}}/{{paymentContext}}/ft-app/generate-virtual-account?type=business' \\
--header 'x-channel-id: CHANNEL_ID' \\
--header 'x-channel-code: CHANNEL_CODE' \\
--header 'x-merchant-id: YOUR_MERCHANT_ID' \\
--header 'Content-Type: application/json' \\
--data-raw '{
  "accountName": "Acme Corp",
  "currency": "USD",
  "email": "finance@acmecorp.com",
  "phone": "08116070111",
  "otherInfo": {
    "address": "123 Business Park, New York",
    "idNumber": "A12345678",
    "idType": "passport",
    "dateOfBirth": "1980-06-20",
    "taxId": "TAX-98765",
    "businessName": "Acme Corporation",
    "businessUrl": "https://acmecorp.com",
    "beneficialOwner": "John Doe",
    "uploadRef": "kyc-upload-ref-id"
  }
}'`;

const getResponse = () =>
    `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "virtual account has been created successfully",
  "data": {
    "accountName": "Acme Corp",
    "accountNumber": "0185487837",
    "bankName": "CHASE BANK",
    "bankCode": "000000",
    "active": false,
    "otherInfo": {
      "routingNumber": "021000021",
      "ach": {
        "routingNumber": "021000021",
        "accountNumber": "0185487837"
      },
      "rtp": {
        "routingNumber": "021000021",
        "accountNumber": "0185487837"
      },
      "wire": {
        "routingNumber": "021000021",
        "accountNumber": "0185487837"
      }
    }
  }
}`;

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-border bg-muted/30">
                <h4 className="text-sm font-semibold text-foreground">{title}</h4>
            </div>
            {children}
        </div>
    );
}

const CollectionGenerateUsdVirtualAccountBusiness = () => {
    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <Building2 className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Generate USD Virtual Account  Business
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    This endpoint generates a USD virtual account for a business. Generated accounts become active after 24 hours.
                </p>
            </section>

            {/* How USD Business Virtual Accounts Work */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Building2 className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How USD Business Virtual Accounts Work</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    A USD business virtual account is a US bank account number provisioned specifically for a registered business entity. It supports multiple payment rails  ACH, RTP, and Wire  each with their own account and routing numbers for maximum compatibility with the US banking ecosystem.
                </p>

                <div className="space-y-4 mb-8">
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-4">
                        <div className="flex items-center gap-2 mb-1">
                            <Info className="h-4 w-4 text-brand shrink-0" />
                            <h3 className="text-sm font-semibold text-foreground">Key behaviours</h3>
                        </div>
                        <div className="space-y-2">
                            {[
                                { title: "24-hour activation window", desc: "Accounts are not active immediately. They become active approximately 24 hours after creation. Do not attempt to receive payments before activation." },
                                { title: "Multi-rail account details", desc: "The response includes separate account/routing numbers for ACH, RTP, and Wire. Different payment senders may require different rail-specific details." },
                                { title: "KYC document upload required", desc: "You must upload KYC documents before calling this endpoint and pass the returned uploadRef in the request. Accounts cannot be created without verified identity documentation." },
                                { title: "Beneficial owner disclosure", desc: "US regulations (FinCEN) require disclosure of any individual owning 25% or more of the business. Provide this in the beneficialOwner field." },
                            ].map(({ title, desc }) => (
                                <div key={title} className="flex items-start gap-3 px-4 py-3 bg-muted/30 dark:bg-background/30 border border-border rounded-xl">
                                    <Info className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-xs font-semibold text-foreground">{title}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl overflow-hidden">
                        <div className="px-5 py-3 border-b border-border bg-muted/30">
                            <h4 className="text-sm font-semibold text-foreground">Supported payment rails</h4>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Rail</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Settlement</th>
                                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Best For</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {[
                                        { rail: "ACH", time: "1–3 business days", use: "Payroll, vendor payments, regular business payments" },
                                        { rail: "RTP", time: "Near-instant (seconds)", use: "Time-sensitive payments, gig economy disbursements" },
                                        { rail: "Wire", time: "1–5 business days", use: "Large-value transfers, international USD payments" },
                                    ].map(({ rail, time, use }) => (
                                        <tr key={rail} className="hover:bg-muted/20 transition-colors">
                                            <td className="px-5 py-3.5"><span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">{rail}</span></td>
                                            <td className="px-5 py-3.5 text-muted-foreground text-xs font-medium">{time}</td>
                                            <td className="px-5 py-3.5 text-muted-foreground text-xs">{use}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">
                            <strong className="text-foreground">All fields in otherInfo are mandatory for business accounts.</strong> Missing KYC data  including taxId, beneficialOwner, and uploadRef  will result in account creation failure. Ensure all documentation is uploaded and verified before calling this endpoint.
                        </p>
                    </div>
                </div>
            </section>

            {/* Endpoint + Tables */}
            <section className="space-y-6">
                <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                    <code className="text-xs text-muted-foreground break-all">
                        https://dev.mypasspoint.com/paypass/ft-app/generate-virtual-account?type=business
                    </code>
                </div>

                {/* Request Parameters */}
                <SectionCard title="Request Parameters">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Parameter</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Required</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {REQUEST_PARAMS.map((row) => (
                                    <tr key={row.name} className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5">
                                            <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">{row.name}</span>
                                        </td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-xs">{row.type}</td>
                                        <td className="px-5 py-3.5">
                                            <span className="text-xs font-semibold text-red-600 dark:text-red-400">mandatory</span>
                                        </td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-sm">{row.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </SectionCard>

                {/* Response Parameters */}
                <SectionCard title="Response Parameters">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Parameter</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Mandatory</th>
                                    <th className="px-5 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {RESPONSE_PARAMS.map((row) => (
                                    <tr key={row.name} className="hover:bg-muted/20 transition-colors">
                                        <td className="px-5 py-3.5">
                                            <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">{row.name}</span>
                                        </td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-xs">{row.type}</td>
                                        <td className="px-5 py-3.5">
                                            {row.presence === "mandatory"
                                                ? <span className="text-xs font-semibold text-red-600 dark:text-red-400">mandatory</span>
                                                : <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">conditional</span>}
                                        </td>
                                        <td className="px-5 py-3.5 text-muted-foreground text-sm">{row.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </SectionCard>
            </section>

            {/* Code examples */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Building2 className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Code examples</h2>
                </div>

                <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                    <div>
                        <h4 className="text-sm font-medium text-foreground mb-3">Endpoint</h4>
                        <CodeBlock>{getEndpoint()}</CodeBlock>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-foreground mb-3">Request body</h4>
                        <CodeBlock language="json">{getRequestBody()}</CodeBlock>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-foreground mb-3">cURL example</h4>
                        <CodeBlock language="bash">{getCurlRequest()}</CodeBlock>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                        <CodeBlock language="json">{getResponse()}</CodeBlock>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default CollectionGenerateUsdVirtualAccountBusiness;
