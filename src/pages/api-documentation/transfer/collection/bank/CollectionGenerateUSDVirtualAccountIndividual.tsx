import { User, Info, AlertTriangle } from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

type RequestRow = {
    name: string;
    type: string;
    required: boolean;
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
        required: true,
        description: "the name to be assigned to the virtual account",
    },
    {
        name: "currency",
        type: "string",
        required: true,
        description: "the currency of the account",
    },
    {
        name: "email",
        type: "string",
        required: true,
        description: "the email of the account holder",
    },
    {
        name: "phone",
        type: "string",
        required: true,
        description: "the phone number of the account holder",
    },
    {
        name: "otherInfo",
        type: "Object",
        required: true,
        description: "this contains other kyc information about the account holder",
    },
    {
        name: "otherInfo.address",
        type: "string",
        required: true,
        description: "the full address of the account holder",
    },
    {
        name: "otherInfo.idNumber",
        type: "string",
        required: true,
        description: "the id number of the individual account holder",
    },
    {
        name: "otherInfo.idType",
        type: "string",
        required: true,
        description: "the type of identity of the account holder. Supported id types are passport, national_id, drivers_license, state_or_provincial_id, permanent_residency_id, visa, ssn",
    },
    {
        name: "otherInfo.dateOfBirth",
        type: "string",
        required: true,
        description: "the date of birth of the individual account holder. Should be in the format yyyy-MM-dd",
    },
    {
        name: "otherInfo.uploadRef",
        type: "string",
        required: true,
        description: "the reference to the uploaded kyc document. kyc document for every account holder is required to be uploaded",
    },
    {
        name: "otherInfo.gender",
        type: "string",
        required: true,
        description: "the gender of the account holder. 1-Male, 2-Female",
    },
    {
        name: "otherInfo.nationality",
        type: "string",
        required: true,
        description: "the account holder's nationality. the country code must be a 3-letter ISO country code",
    },
    {
        name: "otherInfo.addressStreet",
        type: "string",
        required: true,
        description: "address of the account holder",
    },
    {
        name: "otherInfo.addressCity",
        type: "string",
        required: true,
        description: "city of the account holder",
    },
    {
        name: "otherInfo.addressState",
        type: "string",
        required: true,
        description: "state of the account holder",
    },
    {
        name: "otherInfo.addressCountry",
        type: "string",
        required: true,
        description: "country of the account holder. the country code must be a 3-letter ISO country code",
    },
    {
        name: "otherInfo.addressZipCode",
        type: "string",
        required: true,
        description: "zip code of the account holder address",
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
    `POST https://{{baseUrl}}/{{paymentContext}}/ft-app/generate-virtual-account?type=individual`;

const getRequestBody = () =>
    `{
  "accountName": "Joe Biden",
  "currency": "USD",
  "email": "joe@yahoo.com",
  "phone": "08116070111",
  "otherInfo": {
    "address": "123 Main Street, New York",
    "idNumber": "A12345678",
    "idType": "passport",
    "dateOfBirth": "1990-01-15",
    "uploadRef": "kyc-upload-ref-id",
    "gender": "1",
    "nationality": "NGA",
    "addressStreet": "Folagoro",
    "addressCity": "Yaba",
    "addressState": "Lagos",
    "addressCountry": "NGA",
    "addressZipCode": "23401"
  }
}`;

const getCurlRequest = () =>
    `curl --location 'https://{{baseUrl}}/{{paymentContext}}/ft-app/generate-virtual-account?type=individual' \\
--header 'x-channel-id: CHANNEL_ID' \\
--header 'x-channel-code: CHANNEL_CODE' \\
--header 'x-merchant-id: YOUR_MERCHANT_ID' \\
--header 'Content-Type: application/json' \\
--data-raw '{
  "accountName": "Joe Biden",
  "currency": "USD",
  "email": "joe@yahoo.com",
  "phone": "08116070111",
  "otherInfo": {
    "address": "123 Main Street, New York",
    "idNumber": "A12345678",
    "idType": "passport",
    "dateOfBirth": "1990-01-15",
    "uploadRef": "kyc-upload-ref-id",
    "gender": "1",
    "nationality": "NGA",
    "addressStreet": "Folagoro",
    "addressCity": "Yaba",
    "addressState": "Lagos",
    "addressCountry": "NGA",
    "addressZipCode": "23401"
  }
}'`;

const getResponse = () =>
    `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "virtual account has been created successfully",
  "data": {
    "accountName": "John Benson",
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

const CollectionGenerateUsdVirtualAccountIndividual = () => {
    return (
        <div className="py-8 sm:py-10 space-y-16">

            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <User className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Generate USD Virtual Account — Individual
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    This endpoint generates a USD virtual account for an individual. Generated accounts become active after 24 hours.
                </p>
            </section>

            {/* How USD Individual Virtual Accounts Work */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <User className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">How USD Individual Virtual Accounts Work</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
                    A USD individual virtual account is a US bank account number provisioned for a specific person. Like business accounts, it supports ACH, RTP, and Wire payment rails — but the KYC requirements are tailored for individual consumers rather than entities, requiring personal identity documentation instead of company registration details.
                </p>

                <div className="space-y-4 mb-8">
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-4">
                        <div className="flex items-center gap-2 mb-1">
                            <Info className="h-4 w-4 text-brand shrink-0" />
                            <h3 className="text-sm font-semibold text-foreground">Key behaviours</h3>
                        </div>
                        <div className="space-y-2">
                            {[
                                { title: "24-hour activation", desc: "Individual accounts become active approximately 24 hours after creation. The active field in the response will be false until activation completes." },
                                { title: "Identity verification required", desc: "Upload identity documents before calling this endpoint. Pass the resulting uploadRef in the request. Supported id types include: passport, national_id, drivers_license, state_or_provincial_id, permanent_residency_id, visa, ssn." },
                                { title: "Multi-rail account details", desc: "The response returns separate routing/account numbers for ACH, RTP, and Wire — use the correct rail details when providing payment instructions to the account holder." },
                                { title: "One account per individual", desc: "Each individual should have a single USD virtual account. Generating multiple accounts for the same person may trigger compliance flags." },
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

                    <div className="bg-muted/40 dark:bg-background/40 border border-border rounded-xl p-4 flex items-start gap-3">
                        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">
                            <strong className="text-foreground">Upload KYC documents first.</strong> You must complete the document upload process and receive a valid <code className="font-mono bg-muted px-1 py-0.5 rounded">uploadRef</code> before calling this endpoint. Requests submitted without a valid <code className="font-mono bg-muted px-1 py-0.5 rounded">uploadRef</code> will fail. Refer to the Document Upload endpoint in the Assets section.
                        </p>
                    </div>
                </div>
            </section>

            {/* Endpoint + Tables */}
            <section className="space-y-6">
                <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                    <code className="text-xs text-muted-foreground break-all">
                        https://dev.mypasspoint.com/paypass/ft-app/generate-virtual-account?type=individual
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
                        <User className="h-4 w-4 text-brand" />
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

export default CollectionGenerateUsdVirtualAccountIndividual;
