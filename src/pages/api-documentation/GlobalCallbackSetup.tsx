import {Webhook} from "lucide-react";
import CodeBlock from "@/components/CodeBlock.tsx";

const GlobalCallbackSetup = () => {
    const getEndpoint = () => `POST https://{{baseUrl}}/{{userAppContext}}/merchant-app/update-merchant-callback`;

    const getRequestBodyCode = () => {
        return `{
  "callbackUrl": "https://webhook.site/0a6400cc-1fb6-4a24-a5d4-1810b3c6acb0",
  "callbackSecret": "1111111"
}`;
    };

    const getRequestExample = () => {
        return `curl --location 'https://{{baseUrl}}/{{userAppContext}}/merchant-app/update-merchant-callback'
--header 'x-channel-id: CHANNEL_ID'
--header 'x-channel-code: CHANNEL_CODE'
--header 'x-merchant-id: YOUR_MERCHANT_ID'
--header 'Authorization: Bearer YOUR_ACCESS_TOKEN'
--header 'Content-Type: application/json'
--data '{
  "callbackUrl": "https://webhook.site/0a6400cc-1fb6-4a24-a5d4-1810b3c6acb0",
  "callbackSecret": "1111111"
}'`;
    };

    const getSuccessResponse = () => {
        return `{
  "responseCode": "00",
  "responseDescription": "Successful",
  "responseMessage": "Merchant callback URL updated successfully"
}`;
    };

    const getErrorResponse = () => {
        return `{
  "responseCode": "99",
  "responseDescription": "Failed",
  "responseMessage": "Invalid callback URL format"
}`;
    };

    const getCallbackPayloadExample = () => {
        return `{
  "transactionId": "00000423060111141481697464946545699112233",
  "amount": 5000.00,
  "currency": "NGN",
  "status": "SUCCESSFUL",
  "merchantId": "22f36327-493c-492d-a390-5bf321ff51ba",
  "reference": "MERCHANT_REF_12345",
  "paymentType": "COLLECTION",
  "timestamp": "2024-01-15T10:30:00Z",
  "customerEmail": "customer@example.com",
  "metadata": {
    "orderId": "ORD-12345",
    "customField": "value"
  }
}`;
    };

    const getSignatureVerificationExample = () => {
        return `import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.security.MessageDigest;
import java.util.Arrays;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/webhooks")
public class WebhookController {

    private static final String HMAC_ALGORITHM = "HmacSHA256";
    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Verify HMAC signature using timing-safe comparison
     */
    private boolean verifyCallbackSignature(String payload, String receivedSignature, String secret) {
        try {
            // Create HMAC using SHA-256
            Mac hmac = Mac.getInstance(HMAC_ALGORITHM);
            SecretKeySpec secretKey = new SecretKeySpec(secret.getBytes("UTF-8"), HMAC_ALGORITHM);
            hmac.init(secretKey);

            // Calculate signature
            byte[] hash = hmac.doFinal(payload.getBytes("UTF-8"));
            String calculatedSignature = bytesToHex(hash);

            // Use timing-safe comparison to prevent timing attacks
            return MessageDigest.isEqual(
                receivedSignature.getBytes(),
                calculatedSignature.getBytes()
            );
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Convert byte array to hex string
     */
    private String bytesToHex(byte[] bytes) {
        StringBuilder result = new StringBuilder();
        for (byte b : bytes) {
            result.append(String.format("%02x", b));
        }
        return result.toString();
    }

    /**
     * Passpoint webhook handler
     */
    @PostMapping("/passpoint")
    public ResponseEntity<?> handlePasspointWebhook(
            @RequestBody String rawPayload,
            @RequestHeader("x-passpoint-signature") String signature) {

        String callbackSecret = System.getenv("CALLBACK_SECRET");

        // Verify signature
        if (!verifyCallbackSignature(rawPayload, signature, callbackSecret)) {
            System.err.println("Invalid webhook signature");
            return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Unauthorized"));
        }

        // Process the webhook
        try {
            WebhookPayload payload = objectMapper.readValue(rawPayload, WebhookPayload.class);

            switch (payload.getStatus()) {
                case "SUCCESSFUL":
                    handleSuccessfulPayment(payload);
                    break;
                case "FAILED":
                    handleFailedPayment(payload);
                    break;
                case "PENDING":
                    handlePendingPayment(payload);
                    break;
                default:
                    System.out.println("Unknown payment status: " + payload.getStatus());
            }

            // Always respond with 200 to acknowledge receipt
            return ResponseEntity.ok(Map.of("received", true));

        } catch (Exception error) {
            System.err.println("Webhook processing error: " + error.getMessage());
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Internal server error"));
        }
    }

    // Payment processing methods
    private void handleSuccessfulPayment(WebhookPayload payload) {
        // Implement your successful payment logic
        System.out.println("Processing successful payment: " + payload.getTransactionId());
    }

    private void handleFailedPayment(WebhookPayload payload) {
        // Implement your failed payment logic
        System.out.println("Processing failed payment: " + payload.getTransactionId());
    }

    private void handlePendingPayment(WebhookPayload payload) {
        // Implement your pending payment logic
        System.out.println("Processing pending payment: " + payload.getTransactionId());
    }
}

// Webhook payload model
class WebhookPayload {
    private String transactionId;
    private double amount;
    private String currency;
    private String status;
    private String merchantId;
    private String reference;
    private String paymentType;
    private String timestamp;
    private String customerEmail;
    private Map<String, Object> metadata;

    // Getters and setters
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }

    // ... other getters and setters
}`;
    };

    return (
        <div className="py-8 sm:py-10 space-y-16">
            {/* Hero */}
            <section>
                <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/40 text-brand text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                    <Webhook className="h-3.5 w-3.5" />
                    API Reference
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                    Merchant Callback Setup
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
                    Configure your merchant callback URL to receive real-time payment notifications. This endpoint
                    allows you to set as well as update your callback details which will be used for all transaction
                    events. If not set, callback details from individual payment requests will be used.
                </p>
            </section>

            {/* Update Merchant Callback URL */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Webhook className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Update merchant callback URL</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    Set or update your merchant's global callback URL and secret for receiving payment notifications.
                </p>

                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-muted/30 dark:bg-card/50 border border-border rounded-2xl">
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400">POST</span>
                        <code className="text-xs text-muted-foreground break-all">
                            https://{"{{baseUrl}}"}/{"{{userAppContext}}"}/merchant-app/update-merchant-callback
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
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">Authorization</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">Bearer YOUR_ACCESS_TOKEN</td>
                                </tr>
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
                                    <td className="px-5 py-3.5 font-mono text-xs text-foreground">Content-Type</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">application/json</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Endpoint</h4>
                            <CodeBlock>{getEndpoint()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Request body</h4>
                            <CodeBlock language="json">{getRequestBodyCode()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">cURL example</h4>
                            <CodeBlock language="bash">{getRequestExample()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Signature verification (Java)</h4>
                            <CodeBlock language="java">{getSignatureVerificationExample()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Response</h4>
                            <CodeBlock language="json">{getSuccessResponse()}</CodeBlock>
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Error response</h4>
                            <CodeBlock language="json">{getErrorResponse()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>

            {/* Callback Payload Structure */}
            <section>
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-brand-50 dark:bg-brand-950/40 w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                        <Webhook className="h-4 w-4 text-brand" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Callback payload structure</h2>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl">
                    When payment events occur, Passpoint will send a POST request to your callback
                    URL with transaction details.
                </p>

                <div className="space-y-4">
                    <div className="bg-white dark:bg-card border border-border rounded-2xl p-5 sm:p-6 space-y-5">
                        <div>
                            <h4 className="text-sm font-medium text-foreground mb-3">Callback payload</h4>
                            <CodeBlock language="json">{getCallbackPayloadExample()}</CodeBlock>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default GlobalCallbackSetup;
