export interface NavRoute {
    label: string;
    href: string;
    children?: NavRoute[];
}

export interface NavSection {
    title: string;
    items: NavRoute[];
}

export const NAV_SECTIONS: NavSection[] = [
    {
        title: "GETTING STARTED",
        items: [
            { label: "Introduction", href: "/introduction" },
            { label: "API Integrations", href: "/api-integrations" },
        ],
    },
    {
        title: "API DOCUMENTATION",
        items: [
            { label: "Authentication", href: "/authentication" },
            { label: "Wallet", href: "/wallet" },
            {
                label: "Transfer",
                href: "/transfer",
                children: [
                    { label: "Transfer Introduction", href: "/transfer/transfer-introduction" },
                    {
                        label: "Payout",
                        href: "/payout",
                        children: [
                            {
                                label: "Momo",
                                href: "/payout/momo",
                                children: [
                                    { label: "Get Momo Payout Network", href: "/payout/momo/get-network" },
                                    { label: "Get Momo Payout Currency", href: "/payout/momo/get-payout-network" },
                                    { label: "Validate Momo Msisdn", href: "/payout/momo/validate-msisdn" },
                                    { label: "Momo Transfer", href: "/payout/momo/transfer" },
                                ],
                            },
                            {
                                label: "Bank",
                                href: "/payout/bank",
                                children: [
                                    {
                                        label: "Local",
                                        href: "/payout/bank/local",
                                        children: [
                                            { label: "Get Banks", href: "/payout/bank/local/get-banks" },
                                            { label: "Account Enquiry", href: "/payout/bank/local/account-enquiry" },
                                            { label: "Account Transfer - NGN", href: "/payout/bank/local/account-transfer-ngn" },
                                            { label: "Passpoint Enquiry", href: "/payout/bank/local/passpoint-enquiry" },
                                            { label: "Passpoint Wallet Transfer", href: "/payout/bank/local/passpoint-wallet-transfer" },
                                        ],
                                    },
                                    {
                                        label: "Foreign",
                                        href: "/payout/bank/foreign",
                                        children: [
                                            { label: "API Summary", href: "/payout/bank/foreign/summary" },
                                            { label: "Get Available Countries", href: "/payout/bank/foreign/get-available-countries" },
                                            { label: "Get Payment Methods", href: "/payout/bank/foreign/get-payment-methods" },
                                            { label: "ACH - USD", href: "/payout/bank/foreign/ach-usd" },
                                            { label: "WIRE - USD", href: "/payout/bank/foreign/wire-usd" },
                                            { label: "RTP - USD", href: "/payout/bank/foreign/rtp-usd" },
                                            { label: "FEDNOW - USD", href: "/payout/bank/foreign/fednow-usd" },
                                            { label: "Account Deposit - USD", href: "/payout/bank/foreign/account-deposit-usd" },
                                            { label: "Account Deposit - GBP", href: "/payout/bank/foreign/account-deposit-gbp" },
                                            { label: "Account Deposit - EUR", href: "/payout/bank/foreign/account-deposit-eur" },
                                            { label: "Account Deposit - CNY", href: "/payout/bank/foreign/account-deposit-cny" },
                                            { label: "Momo Deposit - CNY", href: "/payout/bank/foreign/momo-deposit-cny" },
                                            { label: "B2B Transfer - CNY", href: "/payout/bank/foreign/b2b-transfer-cny" },
                                            { label: "B2C Transfer - CNY", href: "/payout/bank/foreign/b2c-transfer-cny" },
                                            { label: "B2B Transfer - USD", href: "/payout/bank/foreign/b2b-transfer-usd" },
                                        ],
                                    },
                                ],
                            },
                            { label: "Rate", href: "/payout/rate" },
                            { label: "Report", href: "/payout/report" },
                            { label: "Convert Funds", href: "/payout/convert-funds" },
                            { label: "Fund Transfer Callback Sample", href: "/payout/funds-transfer-callback-sample" },
                        ],
                    },
                    {
                        label: "Collection",
                        href: "/collection",
                        children: [
                            {
                                label: "Momo",
                                href: "/collection/momo",
                                children: [
                                    { label: "Get Momo Collection Currency", href: "/collection/momo/get-currency" },
                                    { label: "Get Momo Collection Network", href: "/collection/momo/get-network" },
                                    { label: "Momo Request to Pay", href: "/collection/momo/request-to-pay" },
                                ],
                            },
                            {
                                label: "Bank",
                                href: "/collection/bank",
                                children: [
                                    {
                                        label: "Open Banking",
                                        href: "/collection/bank/open-banking",
                                        children: [
                                            { label: "Request payment - foreign", href: "/collection/bank/open-banking/request-payment-foreign" },
                                            {
                                                label: "Preselect",
                                                href: "/collection/bank/open-banking/preselect",
                                                children: [
                                                    { label: "Get Banks", href: "/collection/bank/open-banking/preselect/get-banks" },
                                                    { label: "Get Countries", href: "/collection/bank/open-banking/preselect/get-countries" },
                                                    { label: "Request payment - foreign [with bank preselect]", href: "/collection/bank/open-banking/preselect/request-payment-foreign-with-bank-preselect" },
                                                ],
                                            },
                                        ],
                                    },
                                    { label: "Get collection currency", href: "/collection/bank/get-collection-currency" },
                                    { label: "Generate NGN static virtual account", href: "/collection/bank/generate-ngn-static-virtual-account" },
                                    { label: "Generate NGN dynamic virtual account", href: "/collection/bank/generate-ngn-dynamic-virtual-account" },
                                    { label: "Generate NGN dynamic virtual account - with other info", href: "/collection/bank/generate-ngn-dynamic-virtual-account-with-other-info" },
                                    { label: "Generate USD virtual account - individual", href: "/collection/bank/generate-usd-virtual-account-individual" },
                                    { label: "Generate USD virtual account - business", href: "/collection/bank/generate-usd-virtual-account-business" },
                                    { label: "List virtual accounts - NGN - paginated", href: "/collection/bank/list-virtual-accounts-ngn-paginated" },
                                    { label: "Get virtual account", href: "/collection/bank/get-virtual-account" },
                                ],
                            },
                            { label: "Report", href: "/collection/report" },
                            { label: "Wallet credit callback sample", href: "/collection/wallet-credit-callback-sample" },
                        ],
                    },
                    { label: "List countries", href: "/transfer/list-countries" },
                    { label: "Transfer status", href: "/transfer/transfer-status" },
                    { label: "Payment status report", href: "/transfer/payment-status-report" },
                    { label: "Resend single webhook", href: "/transfer/resend-single-webhook" },
                    { label: "Resend bulk webhook", href: "/transfer/resend-bulk-webhook" },
                    { label: "Confirm momo payment", href: "/transfer/confirm-momo-payment" },
                ],
            },
            {
                label: "Virtual Card v2",
                href: "/virtual-card-v2",
                children: [
                    { label: "Card Introduction", href: "/virtual-card-v2/card-introduction" },
                    { label: "Issue Card (Default Billing Details)", href: "/virtual-card-v2/issue-card-default-billing" },
                    { label: "Issue Card (Client Billing Details)", href: "/virtual-card-v2/issue-card-client-billing" },
                    { label: "Issue And Fund Card (Client Billing Details)", href: "/virtual-card-v2/issue-and-fund-card-client-billing" },
                    { label: "Card Details", href: "/virtual-card-v2/card-details" },
                    { label: "Card Full Pan", href: "/virtual-card-v2/card-full-pan" },
                    { label: "Card Balance", href: "/virtual-card-v2/card-balance" },
                    { label: "Card Profile Status", href: "/virtual-card-v2/card-profile-status" },
                    { label: "Freeze Card", href: "/virtual-card-v2/freeze-card" },
                    { label: "Unfreeze Card", href: "/virtual-card-v2/unfreeze-card" },
                    { label: "Fund Card", href: "/virtual-card-v2/fund-card" },
                    { label: "Withdraw from Card", href: "/virtual-card-v2/withdraw-from-card" },
                    { label: "Card Transaction", href: "/virtual-card-v2/card-transaction" },
                    { label: "Card Transactions List", href: "/virtual-card-v2/card-transactions-list" },
                    { label: "Terminate Card", href: "/virtual-card-v2/terminate-card" },
                    { label: "Update Card Callback Details", href: "/virtual-card-v2/update-card-callback-details" },
                    { label: "Card Statement", href: "/virtual-card-v2/card-statement" },
                    { label: "Card Statement by Transaction Id", href: "/virtual-card-v2/card-statement-by-transaction-id" },
                    { label: "Realtime Authorization Decision Maker", href: "/virtual-card-v2/realtime-authorization-decision-maker" },
                ],
            },
        ],
    },
    {
        title: "GUIDES",
        items: [
            { label: "API Rate Limits", href: "/api-rate-limits" },
            { label: "Quick Guides", href: "/quick-guides" },
            { label: "Transaction Dynamics on Passpoint", href: "/transaction-dynamics" },
        ],
    },
    {
        title: "LEARN MORE",
        items: [
            { label: "Manage User Roles and Permissions", href: "/user-roles" },
            { label: "Status responses and their meanings", href: "/status-responses" },
        ],
    },
];
