import React, {useState, useEffect, useMemo, useCallback} from "react";
import {useLocation} from "react-router-dom";
import {SearchContext} from "./SearchContextTypes";
import type {SearchItem} from "./SearchContextTypes";
import {
    Home,
    Settings,
    Smartphone,
    Building2,
    Globe,
    CreditCard,
    BarChart3,
    Book,
    Users,
    Webhook,
    Play,
    Key,
    Wallet,
    ArrowLeftRight,
    Download,
    Upload
} from "lucide-react";

// Complete and comprehensive search data - PRODUCTION READY
const searchData: SearchItem[] = [
    // Getting Started
    {
        title: "Homepage",
        content: "Welcome to Passpoint API documentation. Start here to learn about our payment infrastructure, APIs, and integration guides.",
        url: "/",
        section: "GETTING STARTED",
        icon: Home,
        keywords: ["home", "welcome", "start", "overview", "documentation", "docs", "main"],
        aliases: ["landing", "index", "root", "/"]
    },
    {
        title: "Introduction",
        content: "Get started with Passpoint APIs and learn the basics of payment processing, authentication, and core concepts.",
        url: "/introduction",
        section: "GETTING STARTED",
        icon: Book,
        keywords: ["introduction", "intro", "basics", "getting started", "overview", "begin", "start guide"],
        aliases: ["intro", "getting-started", "basics", "/introduction"]
    },
    {
        title: "Authentication",
        content: "API authentication, API keys, bearer tokens, init-credentials, get-auth-token, whitelisted IPs, and security implementation best practices.",
        url: "/authentication",
        section: "API DOCUMENTATION",
        icon: Key,
        keywords: ["authentication", "auth", "api key", "security", "token", "bearer", "oauth", "credentials", "login", "x-channel-id", "x-channel-code", "x-merchant-id", "merchantId", "apiKey", "accessToken", "init credentials", "get auth token"],
        aliases: ["auth", "api-key", "access-token", "authorization", "/authentication"],
        tags: ["x-channel-id", "x-channel-code", "x-merchant-id", "bearer token", "init credentials", "merchant credentials", "merchantId", "apiKey", "accessToken", "expiresIn", "init-credentials", "get-auth-token", "whitelisted ip", "get-all-whitelisted-ip"]
    },
    {
        title: "API Integrations",
        content: "REST API, SDKs, Webhooks, Authentication, Quick Start Examples, and integration patterns for your application.",
        url: "/api-integrations",
        section: "GETTING STARTED",
        icon: Settings,
        keywords: ["integration", "rest", "sdk", "webhook", "api", "connect", "setup", "configure", "x-channel-id", "x-channel-code", "x-merchant-id", "headers", "mandatory headers", "pitfalls"],
        aliases: ["integrations", "setup", "configuration", "api-integrations", "/api-integrations"],
        tags: ["x-channel-id", "x-channel-code", "x-merchant-id", "x-channel-id = 3", "x-channel-code = legacy-api-user", "legacy-api-user", "channel id", "channel code", "merchant id", "mandatory headers", "missing headers"]
    },

    // Guides
    {
        title: "Quick Guides",
        content: "Fast track guides to get you started with common integration patterns, code examples, and best practices.",
        url: "/quick-guides",
        section: "GUIDES",
        icon: Book,
        keywords: ["quick", "guide", "tutorial", "example", "pattern", "how to", "walkthrough"],
        aliases: ["guides", "tutorials", "examples", "quick-guides", "/quick-guides"]
    },
    {
        title: "API Rate Limits",
        content: "Learn about API rate limiting, quotas, throttling policies, and best practices for managing requests efficiently.",
        url: "/api-rate-limits",
        section: "GUIDES",
        icon: BarChart3,
        keywords: ["rate", "limit", "quota", "throttle", "request", "429", "rate-limit", "per-second"],
        aliases: ["rate-limiting", "throttling", "quotas", "api-rate-limits", "/api-rate-limits"]
    },
    {
        title: "Global Callback Setup",
        content: "Configure global webhooks, callback URLs, and event notifications for your application to receive real-time updates.",
        url: "/global-callback-setup",
        section: "API DOCUMENTATION",
        icon: Webhook,
        keywords: ["callback", "webhook", "global", "notification", "event", "listener", "hooks", "callbackUrl", "callbackSecret", "update-merchant-callback", "x-passpoint-signature", "signature verification", "hmac"],
        aliases: ["webhooks", "callbacks", "notifications", "events", "global-callback-setup", "/global-callback-setup"],
        tags: ["callbackUrl", "callbackSecret", "update-merchant-callback", "x-passpoint-signature", "hmac signature", "signature verification", "callback payload", "transactionId", "paymentType"]
    },

    // Core Services
    {
        title: "Wallet",
        content: "Digital wallet management, balance operations, multi-currency support, and wallet transaction history.",
        url: "/wallet",
        section: "CORE SERVICES",
        icon: Wallet,
        keywords: ["wallet", "balance", "digital", "currency", "account", "funds", "deposit"],
        aliases: ["wallets", "account-balance", "funds", "/wallet"]
    },
    {
        title: "Transfer",
        content: "Send money between wallets, accounts, and payment methods. Manage transfers and transaction statuses.",
        url: "/transfer",
        section: "CORE SERVICES",
        icon: ArrowLeftRight,
        keywords: ["transfer", "send", "money", "payment", "move", "transaction"],
        aliases: ["transfers", "send-money", "move-funds", "/transfer"]
    },
    {
        title: "Collection",
        content: "Collect payments from customers through multiple channels including bank transfers and mobile money.",
        url: "/collection",
        section: "CORE SERVICES",
        icon: Download,
        keywords: ["collection", "collect", "payment", "receive", "invoice", "charge", "accept-payment"],
        aliases: ["collections", "receive-payment", "accept-payment", "/collection"]
    },
    {
        title: "Payout",
        content: "Process secure payouts to bank accounts, cards, and digital wallets worldwide.",
        url: "/payout",
        section: "CORE SERVICES",
        icon: Upload,
        keywords: ["payout", "disburse", "send", "withdraw", "distribute", "disbursement"],
        aliases: ["payouts", "disbursements", "withdrawals", "/payout"]
    },

    // Collection Methods - Bank
    {
        title: "Bank Collections",
        content: "Collect payments from bank accounts worldwide using Open Banking APIs, virtual accounts, and direct bank integrations.",
        url: "/collection/bank",
        section: "COLLECTIONS",
        icon: Building2,
        keywords: ["bank", "collection", "open banking", "ach", "wire", "virtual account"],
        aliases: ["bank-collection", "banking", "collection-bank", "/collection/bank"]
    },
    {
        title: "Open Banking Collections",
        content: "Secure bank-to-bank payments using Open Banking APIs, PSD2 compliance, and instant verification.",
        url: "/collection/bank/open-banking",
        section: "COLLECTIONS",
        icon: Building2,
        keywords: ["open banking", "bank", "secure", "api", "psd2", "instant", "verification"],
        aliases: ["open-banking", "psd2", "collection-bank-open-banking", "/collection/bank/open-banking"]
    },
    {
        title: "Get Collection Currency",
        content: "Retrieve supported currencies for collection operations and virtual account generation.",
        url: "/collection/bank/get-collection-currency",
        section: "COLLECTIONS",
        icon: Building2,
        keywords: ["currency", "collection", "supported", "available", "list"],
        aliases: ["currencies", "supported-currencies", "collection-currency", "get-collection-currency", "/collection/bank/get-collection-currency"]
    },
    {
        title: "Generate NGN Static Virtual Account",
        content: "Create permanent Nigerian Naira virtual accounts for receiving payments.",
        url: "/collection/bank/generate-ngn-static-virtual-account",
        section: "COLLECTIONS",
        icon: Building2,
        keywords: ["ngn", "naira", "nigeria", "virtual account", "static", "permanent", "generate"],
        aliases: ["nigerian-account", "ngn-account", "static-virtual-account", "generate-ngn-static", "/collection/bank/generate-ngn-static-virtual-account"]
    },
    {
        title: "Generate NGN Dynamic Virtual Account",
        content: "Create temporary Nigerian Naira virtual accounts for one-time or limited-use payments.",
        url: "/collection/bank/generate-ngn-dynamic-virtual-account",
        section: "COLLECTIONS",
        icon: Building2,
        keywords: ["ngn", "naira", "nigeria", "virtual account", "dynamic", "temporary", "generate"],
        aliases: ["temp-account", "dynamic-account", "generate-ngn-dynamic", "/collection/bank/generate-ngn-dynamic-virtual-account"]
    },
    {
        title: "Generate NGN Dynamic Virtual Account with Other Info",
        content: "Create Nigerian Naira dynamic virtual accounts with additional metadata and custom fields.",
        url: "/collection/bank/generate-ngn-dynamic-virtual-account-with-other-info",
        section: "COLLECTIONS",
        icon: Building2,
        keywords: ["ngn", "naira", "nigeria", "virtual account", "dynamic", "metadata", "custom fields"],
        aliases: ["dynamic-account-metadata", "ngn-account-info", "generate-ngn-dynamic-other-info", "/collection/bank/generate-ngn-dynamic-virtual-account-with-other-info"]
    },
    {
        title: "Generate USD Virtual Account - Individual",
        content: "Create US Dollar virtual accounts for individual customers and personal use cases.",
        url: "/collection/bank/generate-usd-virtual-account-individual",
        section: "COLLECTIONS",
        icon: Building2,
        keywords: ["usd", "dollar", "usa", "virtual account", "individual", "personal", "generate"],
        aliases: ["us-account", "dollar-account", "usd-individual", "generate-usd-individual", "/collection/bank/generate-usd-virtual-account-individual"]
    },
    {
        title: "Generate USD Virtual Account - Business",
        content: "Create US Dollar virtual accounts for business entities and commercial use cases.",
        url: "/collection/bank/generate-usd-virtual-account-business",
        section: "COLLECTIONS",
        icon: Building2,
        keywords: ["usd", "dollar", "usa", "virtual account", "business", "commercial", "generate"],
        aliases: ["business-account", "commercial-account", "usd-business", "generate-usd-business", "/collection/bank/generate-usd-virtual-account-business"]
    },
    {
        title: "List Virtual Accounts NGN Paginated",
        content: "Retrieve paginated list of Nigerian Naira virtual accounts with filtering and sorting options.",
        url: "/collection/bank/list-virtual-accounts-ngn-paginated",
        section: "COLLECTIONS",
        icon: Building2,
        keywords: ["ngn", "virtual account", "list", "paginated", "filter", "search"],
        aliases: ["list-accounts", "ngn-accounts", "list-virtual-accounts-ngn", "/collection/bank/list-virtual-accounts-ngn-paginated"]
    },
    {
        title: "Get Virtual Account",
        content: "Retrieve details of a specific virtual account by ID or account number.",
        url: "/collection/bank/get-virtual-account",
        section: "COLLECTIONS",
        icon: Building2,
        keywords: ["virtual account", "get", "details", "retrieve", "lookup"],
        aliases: ["account-details", "fetch-account", "get-virtual-account", "/collection/bank/get-virtual-account"]
    },
    {
        title: "Collection Report",
        content: "Generate comprehensive reports for collection transactions, settlements, and analytics.",
        url: "/collection/report",
        section: "COLLECTIONS",
        icon: BarChart3,
        keywords: ["report", "collection", "analytics", "transactions", "settlement", "transaction history", "x-channel-id", "x-channel-code", "x-merchant-id"],
        aliases: ["reports", "analytics", "collection-analytics", "collection-report", "/collection/report"],
        tags: ["x-channel-id", "x-channel-code", "x-merchant-id", "transaction-history", "collection type"]
    },
    {
        title: "Wallet Credit Callback Sample",
        content: "Example webhook payload for wallet credit notifications and collection confirmations.",
        url: "/collection/wallet-credit-callback-sample",
        section: "COLLECTIONS",
        icon: Webhook,
        keywords: ["callback", "webhook", "wallet", "credit", "sample", "example", "notification"],
        aliases: ["webhook-sample", "callback-example", "wallet-credit-callback", "/collection/wallet-credit-callback-sample"]
    },

    // Collection - Open Banking
    {
        title: "Request Payment Foreign",
        content: "Request international payments using Open Banking APIs for cross-border transactions.",
        url: "/collection/bank/open-banking/request-payment-foreign",
        section: "COLLECTIONS",
        icon: Globe,
        keywords: ["open banking", "foreign", "international", "payment", "request", "cross-border"],
        aliases: ["international-payment", "cross-border-collection", "request-payment-foreign", "open-banking-foreign", "/collection/bank/open-banking/request-payment-foreign"]
    },
    {
        title: "Get Banks",
        content: "Retrieve list of supported banks for Open Banking integrations with preselect functionality.",
        url: "/collection/bank/open-banking/preselect/get-banks",
        section: "COLLECTIONS",
        icon: Building2,
        keywords: ["banks", "list", "open banking", "supported", "preselect"],
        aliases: ["bank-list", "supported-banks", "preselect-banks", "open-banking-preselect-get-banks", "/collection/bank/open-banking/preselect/get-banks"]
    },
    {
        title: "Get Countries",
        content: "Retrieve list of supported countries for Open Banking collections and international payments.",
        url: "/collection/bank/open-banking/preselect/get-countries",
        section: "COLLECTIONS",
        icon: Globe,
        keywords: ["countries", "list", "supported", "open banking", "international"],
        aliases: ["country-list", "supported-countries", "preselect-countries", "open-banking-preselect-get-countries", "/collection/bank/open-banking/preselect/get-countries"]
    },
    {
        title: "Request Payment Foreign with Bank Preselect",
        content: "Request international payment with pre-selected bank for improved user experience.",
        url: "/collection/bank/open-banking/preselect/request-payment-foreign-with-bank-preselect",
        section: "COLLECTIONS",
        icon: Building2,
        keywords: ["payment", "foreign", "preselect", "bank", "international", "request"],
        aliases: ["preselect-payment", "bank-preselect", "request-payment-foreign-bank-preselect", "open-banking-preselect-foreign", "/collection/bank/open-banking/preselect/request-payment-foreign-with-bank-preselect"]
    },

    // Collection - Mobile Money
    {
        title: "Get MoMo Collection Network",
        content: "Retrieve available mobile money networks and providers for collection operations.",
        url: "/collection/momo/get-network",
        section: "MOBILE MONEY",
        icon: Smartphone,
        keywords: ["momo", "mobile", "money", "network", "provider", "operator", "collection"],
        aliases: ["momo-networks", "mobile-operators", "collection-momo-network", "momo-get-network", "/collection/momo/get-network"]
    },
    {
        title: "Get MoMo Collection Currency",
        content: "Get supported currencies for mobile money collection transactions.",
        url: "/collection/momo/get-currency",
        section: "MOBILE MONEY",
        icon: Smartphone,
        keywords: ["momo", "mobile", "money", "currency", "collection", "supported"],
        aliases: ["momo-currencies", "collection-momo-currency", "momo-get-currency", "/collection/momo/get-currency"]
    },
    {
        title: "MoMo Request to Pay",
        content: "Initiate mobile money payment requests to customer wallets for collections.",
        url: "/collection/momo/request-to-pay",
        section: "MOBILE MONEY",
        icon: Smartphone,
        keywords: ["momo", "mobile", "money", "request", "pay", "collection", "charge", "msisdn", "clientReference", "narration", "transactionCurrency"],
        aliases: ["request-payment", "momo-charge", "momo-request-to-pay", "collection-momo-request", "/collection/momo/request-to-pay"],
        tags: ["msisdn", "clientReference", "narration", "transactionCurrency", "amount", "currency"]
    },

    // Payout - Bank
    {
        title: "Bank Payouts",
        content: "Process secure bank transfers for local and international recipients with various payment methods.",
        url: "/payout/bank",
        section: "PAYOUTS",
        icon: Building2,
        keywords: ["bank", "payout", "transfer", "wire", "ach", "disbursement"],
        aliases: ["bank-payout", "bank-transfer", "payout-bank", "/payout/bank"]
    },
    {
        title: "Local Bank Transfers",
        content: "Process domestic bank transfers with same-day ACH, wire transfers, and instant payments.",
        url: "/payout/bank/local",
        section: "PAYOUTS",
        icon: Building2,
        keywords: ["local", "domestic", "bank", "ach", "wire", "same day", "payout"],
        aliases: ["domestic-transfer", "local-payout", "payout-bank-local", "/payout/bank/local"]
    },
    {
        title: "Foreign Bank Transfers",
        content: "Global payment network supporting international wire transfers, SWIFT, and cross-border payments.",
        url: "/payout/bank/foreign",
        section: "PAYOUTS",
        icon: Globe,
        keywords: ["foreign", "international", "wire", "global", "cross border", "swift", "payout"],
        aliases: ["international-transfer", "cross-border-payout", "payout-bank-foreign", "/payout/bank/foreign"]
    },
    {
        title: "Convert Funds",
        content: "Convert funds between different currencies in your Passpoint wallet with real-time exchange rates.",
        url: "/payout/convert-funds",
        section: "PAYOUTS",
        icon: ArrowLeftRight,
        keywords: ["convert", "currency", "exchange", "rate", "fx", "forex", "swap"],
        aliases: ["currency-conversion", "fx", "exchange", "convert-funds", "payout-convert", "/payout/convert-funds"]
    },
    {
        title: "Payout Rate",
        content: "Get real-time exchange rates and conversion fees for international payouts.",
        url: "/payout/rate",
        section: "PAYOUTS",
        icon: BarChart3,
        keywords: ["rate", "exchange", "forex", "fx", "conversion", "fee", "payout"],
        aliases: ["exchange-rate", "fx-rate", "payout-rate", "/payout/rate"]
    },
    {
        title: "Payout Report",
        content: "Generate detailed reports for payout transactions, settlements, and disbursement analytics.",
        url: "/payout/report",
        section: "PAYOUTS",
        icon: BarChart3,
        keywords: ["report", "payout", "analytics", "transactions", "disbursement", "settlement", "transaction history", "x-channel-id", "x-channel-code", "x-merchant-id"],
        aliases: ["payout-analytics", "disbursement-report", "payout-report", "/payout/report"],
        tags: ["x-channel-id = 3", "x-channel-code = legacy-api-user", "x-merchant-id", "x-channel-id: 3", "x-channel-code: legacy-api-user", "legacy-api-user", "channel-id 3", "transaction-history", "payout type"]
    },
    {
        title: "Fund Transfer Callback Sample",
        content: "Example webhook payload for payout notifications and fund transfer confirmations.",
        url: "/payout/funds-transfer-callback-sample",
        section: "PAYOUTS",
        icon: Webhook,
        keywords: ["callback", "webhook", "payout", "transfer", "sample", "example", "notification"],
        aliases: ["payout-webhook", "transfer-callback", "funds-transfer-callback", "/payout/funds-transfer-callback-sample"]
    },

    // Payout - Local Bank
    {
        title: "Get Local Banks",
        content: "Retrieve list of supported local banks for domestic transfers and payouts.",
        url: "/payout/bank/local/get-banks",
        section: "LOCAL TRANSFERS",
        icon: Building2,
        keywords: ["banks", "local", "list", "supported", "domestic", "bankCode"],
        aliases: ["local-banks", "domestic-banks", "get-banks", "payout-local-banks", "/payout/bank/local/get-banks"],
        tags: ["bankCode", "bankName", "get-banks"]
    },
    {
        title: "Account Enquiry",
        content: "Verify and enquire about local bank account details before initiating transfers.",
        url: "/payout/bank/local/account-enquiry",
        section: "LOCAL TRANSFERS",
        icon: Building2,
        keywords: ["enquiry", "verify", "account", "local", "bank", "validation", "check", "accountNumber", "bankCode"],
        aliases: ["account-verification", "verify-account", "account-enquiry", "payout-local-enquiry", "/payout/bank/local/account-enquiry"],
        tags: ["accountNumber", "bankCode", "accountName", "account-enquiry"]
    },
    {
        title: "Account Transfer - NGN",
        content: "Transfer funds to Nigerian Naira bank accounts domestically with instant settlement.",
        url: "/payout/bank/local/account-transfer-ngn",
        section: "LOCAL TRANSFERS",
        icon: Building2,
        keywords: ["ngn", "naira", "nigeria", "account", "transfer", "payout", "local", "bankCode", "accountNumber", "clientReference", "narration"],
        aliases: ["nigerian-transfer", "ngn-payout", "account-transfer-ngn", "payout-local-ngn", "/payout/bank/local/account-transfer-ngn"],
        tags: ["bankCode", "accountNumber", "clientReference", "narration", "beneficiaryAccountNumber", "amount", "currency"]
    },
    {
        title: "Passpoint Enquiry",
        content: "Verify a passpoint beneficiary wallet before transferring funds.",
        url: "/payout/bank/local/passpoint-enquiry",
        section: "LOCAL TRANSFERS",
        icon: Wallet,
        keywords: ["passpoint", "enquiry", "wallet", "beneficiary", "verify", "check"],
        aliases: ["wallet-verification", "verify-wallet", "passpoint-enquiry", "payout-local-passpoint-enquiry", "/payout/bank/local/passpoint-enquiry"]
    },
    {
        title: "Passpoint Wallet Transfer",
        content: "Transfer funds to another Passpoint wallet instantly with zero fees.",
        url: "/payout/bank/local/passpoint-wallet-transfer",
        section: "LOCAL TRANSFERS",
        icon: Wallet,
        keywords: ["passpoint", "wallet", "transfer", "instant", "p2p", "peer", "clientReference", "narration", "amount"],
        aliases: ["wallet-transfer", "p2p-transfer", "passpoint-wallet-transfer", "payout-local-passpoint-wallet", "/payout/bank/local/passpoint-wallet-transfer"],
        tags: ["clientReference", "narration", "amount", "currency", "beneficiaryAccountNumber"]
    },

    // Payout - Foreign Bank
    {
        title: "Foreign Transfer Summary",
        content: "Overview of all foreign transfer options, capabilities, and supported payment methods.",
        url: "/payout/bank/foreign/summary",
        section: "FOREIGN TRANSFERS",
        icon: Globe,
        keywords: ["summary", "overview", "foreign", "international", "options"],
        aliases: ["foreign-overview", "foreign-summary", "payout-foreign-summary", "/payout/bank/foreign/summary"]
    },
    {
        title: "Get Available Countries",
        content: "Retrieve list of countries supported for international wire transfers and foreign payouts.",
        url: "/payout/bank/foreign/get-available-countries",
        section: "FOREIGN TRANSFERS",
        icon: Globe,
        keywords: ["countries", "supported", "foreign", "international", "list"],
        aliases: ["supported-countries", "country-list", "get-available-countries", "payout-foreign-countries", "/payout/bank/foreign/get-available-countries"]
    },
    {
        title: "Get Payment Methods",
        content: "Retrieve available payment methods for foreign transfers by country and currency.",
        url: "/payout/bank/foreign/get-payment-methods",
        section: "FOREIGN TRANSFERS",
        icon: CreditCard,
        keywords: ["payment", "methods", "foreign", "options", "available"],
        aliases: ["payment-options", "get-payment-methods", "payout-foreign-methods", "/payout/bank/foreign/get-payment-methods"]
    },
    {
        title: "Account Deposit - CNY",
        content: "Deposit funds to Chinese Yuan (CNY) bank accounts with Alipay and WeChat Pay support.",
        url: "/payout/bank/foreign/account-deposit-cny",
        section: "FOREIGN TRANSFERS",
        icon: Building2,
        keywords: ["cny", "china", "yuan", "deposit", "account", "chinese", "renminbi"],
        aliases: ["china-deposit", "yuan-transfer", "account-deposit-cny", "payout-foreign-cny", "/payout/bank/foreign/account-deposit-cny"]
    },
    {
        title: "Account Deposit - EUR",
        content: "Deposit funds to Euro (EUR) bank accounts with SEPA and SWIFT support.",
        url: "/payout/bank/foreign/account-deposit-eur",
        section: "FOREIGN TRANSFERS",
        icon: Building2,
        keywords: ["eur", "euro", "europe", "deposit", "account", "sepa", "european"],
        aliases: ["euro-deposit", "eur-transfer", "account-deposit-eur", "payout-foreign-eur", "/payout/bank/foreign/account-deposit-eur"]
    },
    {
        title: "Account Deposit - GBP",
        content: "Deposit funds to British Pound (GBP) bank accounts with Faster Payments support.",
        url: "/payout/bank/foreign/account-deposit-gbp",
        section: "FOREIGN TRANSFERS",
        icon: Building2,
        keywords: ["gbp", "pound", "uk", "britain", "deposit", "sterling", "british"],
        aliases: ["uk-deposit", "pound-transfer", "account-deposit-gbp", "payout-foreign-gbp", "/payout/bank/foreign/account-deposit-gbp"]
    },
    {
        title: "Account Deposit - USD",
        content: "Deposit funds to US Dollar (USD) bank accounts with ACH, Wire, and FedNow support.",
        url: "/payout/bank/foreign/account-deposit-usd",
        section: "FOREIGN TRANSFERS",
        icon: Building2,
        keywords: ["usd", "dollar", "usa", "america", "deposit", "account", "american", "countryCode", "clientReference", "narration", "transactionCurrency", "baseCurrency"],
        aliases: ["us-deposit", "dollar-transfer", "account-deposit-usd", "payout-foreign-usd", "/payout/bank/foreign/account-deposit-usd"],
        tags: ["countryCode", "clientReference", "narration", "transactionCurrency", "baseCurrency", "paymentInfo", "senderFirstName", "senderLastName", "beneficiaryType"]
    },
    {
        title: "ACH Transfer - USD",
        content: "Process Automated Clearing House (ACH) transfers in US Dollars with same-day settlement options.",
        url: "/payout/bank/foreign/ach-usd",
        section: "FOREIGN TRANSFERS",
        icon: Building2,
        keywords: ["ach", "usd", "dollar", "automated", "clearing", "house", "same day"],
        aliases: ["ach-payment", "us-ach", "ach-usd", "payout-foreign-ach", "/payout/bank/foreign/ach-usd"]
    },
    {
        title: "B2B Transfer - CNY",
        content: "Business-to-business transfers in Chinese Yuan for commercial transactions.",
        url: "/payout/bank/foreign/b2b-transfer-cny",
        section: "FOREIGN TRANSFERS",
        icon: Building2,
        keywords: ["b2b", "business", "cny", "yuan", "china", "commercial", "corporate"],
        aliases: ["business-transfer-cny", "corporate-cny", "b2b-cny", "payout-foreign-b2b-cny", "/payout/bank/foreign/b2b-transfer-cny"]
    },
    {
        title: "B2B Transfer - USD",
        content: "Business-to-business transfers in US Dollars for international commercial transactions.",
        url: "/payout/bank/foreign/b2b-transfer-usd",
        section: "FOREIGN TRANSFERS",
        icon: Building2,
        keywords: ["b2b", "business", "usd", "dollar", "commercial", "corporate"],
        aliases: ["business-transfer-usd", "corporate-usd", "b2b-usd", "payout-foreign-b2b-usd", "/payout/bank/foreign/b2b-transfer-usd"]
    },
    {
        title: "B2C Transfer - CNY",
        content: "Business-to-consumer transfers in Chinese Yuan for customer payouts and disbursements.",
        url: "/payout/bank/foreign/b2c-transfer-cny",
        section: "FOREIGN TRANSFERS",
        icon: Building2,
        keywords: ["b2c", "consumer", "cny", "yuan", "china", "customer", "payout"],
        aliases: ["customer-transfer-cny", "b2c-cny", "payout-foreign-b2c-cny", "/payout/bank/foreign/b2c-transfer-cny"]
    },
    {
        title: "FedNow Transfer - USD",
        content: "Real-time payments using the Federal Reserve's FedNow service for instant USD transfers.",
        url: "/payout/bank/foreign/fednow-usd",
        section: "FOREIGN TRANSFERS",
        icon: Building2,
        keywords: ["fednow", "federal", "reserve", "real time", "usd", "instant", "fed"],
        aliases: ["fednow", "instant-usd", "fednow-usd", "payout-foreign-fednow", "/payout/bank/foreign/fednow-usd"]
    },
    {
        title: "MoMo Deposit - CNY",
        content: "Mobile money deposits in Chinese Yuan via Alipay and WeChat Pay.",
        url: "/payout/bank/foreign/momo-deposit-cny",
        section: "FOREIGN TRANSFERS",
        icon: Smartphone,
        keywords: ["momo", "mobile", "money", "deposit", "cny", "china", "alipay", "wechat"],
        aliases: ["china-momo", "alipay-deposit", "momo-deposit-cny", "payout-foreign-momo-cny", "/payout/bank/foreign/momo-deposit-cny"]
    },
    {
        title: "RTP Transfer - USD",
        content: "Real-time payments using RTP network in US Dollars for instant 24/7 transfers.",
        url: "/payout/bank/foreign/rtp-usd",
        section: "FOREIGN TRANSFERS",
        icon: Building2,
        keywords: ["rtp", "real time", "payment", "usd", "instant", "24/7"],
        aliases: ["real-time-payment", "rtp", "rtp-usd", "payout-foreign-rtp", "/payout/bank/foreign/rtp-usd"]
    },
    {
        title: "Wire Transfer - USD",
        content: "Traditional wire transfers in US Dollars via SWIFT network for international payments.",
        url: "/payout/bank/foreign/wire-usd",
        section: "FOREIGN TRANSFERS",
        icon: Building2,
        keywords: ["wire", "transfer", "usd", "traditional", "swift", "international"],
        aliases: ["swift-transfer", "wire-usd", "payout-foreign-wire", "/payout/bank/foreign/wire-usd"]
    },

    // Payout - Mobile Money
    {
        title: "MoMo Get Network",
        content: "Retrieve available mobile money networks and providers for payout operations.",
        url: "/payout/momo/get-network",
        section: "MOBILE MONEY",
        icon: Smartphone,
        keywords: ["momo", "mobile", "money", "network", "provider", "operator", "payout"],
        aliases: ["momo-networks", "mobile-operators", "payout-momo-network", "momo-get-network", "/payout/momo/get-network"]
    },
    {
        title: "MoMo Get Currency",
        content: "Get supported currencies for mobile money payout transfers.",
        url: "/payout/momo/get-network",
        section: "MOBILE MONEY",
        icon: Smartphone,
        keywords: ["momo", "mobile", "money", "currency", "supported", "payout"],
        aliases: ["momo-currencies", "payout-momo-currency", "get-payout-network", "/payout/momo/get-payout-network"]
    },
    {
        title: "MoMo Transfer",
        content: "Send money to mobile money wallets and accounts across Africa with instant settlement.",
        url: "/payout/momo/transfer",
        section: "MOBILE MONEY",
        icon: Smartphone,
        keywords: ["momo", "mobile", "money", "transfer", "send", "wallet", "payout", "airtel", "mtn", "vodacom"],
        aliases: ["mobile-transfer", "momo-payout", "momo-transfer", "payout-momo-transfer", "/payout/momo/transfer"]
    },
    {
        title: "MoMo Validate MSISDN",
        content: "Validate mobile phone numbers (MSISDN) for mobile money transfers before initiating payouts.",
        url: "/payout/momo/validate-msisdn",
        section: "MOBILE MONEY",
        icon: Smartphone,
        keywords: ["momo", "mobile", "money", "validate", "msisdn", "phone", "number", "verification"],
        aliases: ["validate-phone", "phone-verification", "validate-msisdn", "payout-momo-validate", "/payout/momo/validate-msisdn"]
    },

    // Transfer Root Pages
    {
        title: "List Countries",
        content: "Retrieve comprehensive list of all supported countries for transfer operations.",
        url: "/transfer/list-countries",
        section: "TRANSFERS",
        icon: Globe,
        keywords: ["countries", "list", "transfer", "supported", "available"],
        aliases: ["country-list", "supported-countries", "list-countries", "transfer-list-countries", "/transfer/list-countries"]
    },
    {
        title: "Transfer Status",
        content: "Check real-time status of transfer transactions and get detailed status information.",
        url: "/transfer/transfer-status",
        section: "TRANSFERS",
        icon: BarChart3,
        keywords: ["status", "transfer", "check", "track", "transaction", "lookup"],
        aliases: ["check-status", "track-transfer", "transfer-status", "/transfer/transfer-status"]
    },
    {
        title: "Payment Status Report",
        content: "Generate comprehensive payment status reports with filtering and export capabilities.",
        url: "/transfer/payment-status-report",
        section: "TRANSFERS",
        icon: BarChart3,
        keywords: ["payment", "status", "report", "analytics", "transfer", "transaction"],
        aliases: ["payment-report", "status-report", "payment-status-report", "transfer-payment-report", "/transfer/payment-status-report"]
    },
    {
        title: "Resend Single Webhook",
        content: "Manually resend webhook notification for a specific transaction or event.",
        url: "/transfer/resend-single-webhook",
        section: "TRANSFERS",
        icon: Webhook,
        keywords: ["resend", "webhook", "single", "notification", "retry", "callback"],
        aliases: ["retry-webhook", "resend-notification", "resend-single-webhook", "transfer-resend-single", "/transfer/resend-single-webhook"]
    },
    {
        title: "Resend Bulk Webhook",
        content: "Resend webhook notifications for multiple transactions in bulk.",
        url: "/transfer/resend-bulk-webhook",
        section: "TRANSFERS",
        icon: Webhook,
        keywords: ["resend", "webhook", "bulk", "batch", "notifications", "multiple"],
        aliases: ["bulk-webhook", "batch-resend", "resend-bulk-webhook", "transfer-resend-bulk", "/transfer/resend-bulk-webhook"]
    },
    {
        title: "Confirm MoMo Payment",
        content: "Confirm mobile money payment transactions and verify settlement status.",
        url: "/transfer/confirm-momo-payment",
        section: "TRANSFERS",
        icon: Smartphone,
        keywords: ["confirm", "momo", "mobile", "money", "payment", "verify", "settlement"],
        aliases: ["verify-momo", "momo-confirmation", "confirm-momo-payment", "transfer-confirm-momo", "/transfer/confirm-momo-payment"]
    },

    // Learn More / Administration
    {
        title: "User Roles and Permissions",
        content: "Manage user access levels, permission systems, role-based access control (RBAC), and team management.",
        url: "/user-roles",
        section: "ADMINISTRATION",
        icon: Users,
        keywords: ["user", "roles", "permissions", "access", "admin", "rbac", "team", "management"],
        aliases: ["permissions", "access-control", "rbac", "user-roles", "/user-roles"]
    },
    {
        title: "Status Responses",
        content: "HTTP status codes, error codes, and their meanings in Passpoint API with troubleshooting guides.",
        url: "/status-responses",
        section: "REFERENCE",
        icon: BarChart3,
        keywords: ["status", "response", "http", "code", "error", "2xx", "4xx", "5xx"],
        aliases: ["error-codes", "http-codes", "status-codes", "status-responses", "/status-responses"]
    },
    {
        title: "Sandbox Playground",
        content: "Interactive sandbox environment for testing API calls, exploring endpoints, and prototyping integrations.",
        url: "/sandbox-playground",
        section: "DEVELOPER TOOLS",
        icon: Play,
        keywords: ["sandbox", "playground", "test", "testing", "environment", "interactive", "try"],
        aliases: ["sandbox", "test-environment", "api-playground", "sandbox-playground", "/sandbox-playground"]
    },

    // API Endpoints - Dynamic search for actual API URLs
    {
        title: "Init Credentials",
        content: "Initialize merchant credentials for API access. POST endpoint for setting up authentication.",
        url: "/authentication",
        section: "API ENDPOINTS",
        icon: Key,
        keywords: ["init", "credentials", "merchant", "authentication", "setup", "access", "merchantId", "apiKey"],
        aliases: ["init-credentials", "merchant-app/init-credentials"],
        tags: ["merchantId", "apiKey", "init-credentials"]
    },
    {
        title: "Get Banks",
        content: "Retrieve list of supported banks for local transfers. GET endpoint for bank information.",
        url: "/payout/bank/local/get-banks",
        section: "API ENDPOINTS",
        icon: Building2,
        keywords: ["get", "banks", "list", "local", "transfer", "supported"],
        aliases: ["get-banks", "merchant-app/get-banks"]
    },
    {
        title: "Account Enquiry",
        content: "Verify bank account details before transfer. POST endpoint for account validation.",
        url: "/payout/bank/local/account-enquiry",
        section: "API ENDPOINTS",
        icon: Building2,
        keywords: ["account", "enquiry", "verify", "validation", "transfer", "bank"],
        aliases: ["account-enquiry", "merchant-app/account-enquiry"]
    },
    {
        title: "Transfer Funds",
        content: "Execute bank transfers to Nigerian Naira accounts. POST endpoint for fund transfers.",
        url: "/payout/bank/local/account-transfer-ngn",
        section: "API ENDPOINTS",
        icon: Building2,
        keywords: ["transfer", "funds", "ngn", "naira", "bank", "account", "bankCode", "accountNumber", "clientReference", "narration"],
        aliases: ["account-transfer-ngn", "transfer-ngn", "merchant-app/transfer"],
        tags: ["bankCode", "accountNumber", "clientReference", "narration", "amount", "currency", "beneficiaryAccountNumber"]
    },
    {
        title: "MoMo Transfer",
        content: "Send money via mobile money networks. POST endpoint for MoMo transactions.",
        url: "/payout/momo/transfer",
        section: "API ENDPOINTS",
        icon: Smartphone,
        keywords: ["momo", "transfer", "mobile", "money", "send", "network", "msisdn", "clientReference", "narration"],
        aliases: ["momo-transfer", "mobile-transfer", "merchant-app/momo-transfer"],
        tags: ["msisdn", "clientReference", "narration", "amount", "currency", "networkCode"]
    },
    {
        title: "Validate MSISDN",
        content: "Validate mobile phone numbers for MoMo transfers. POST endpoint for phone validation.",
        url: "/payout/momo/validate-msisdn",
        section: "API ENDPOINTS",
        icon: Smartphone,
        keywords: ["validate", "msisdn", "phone", "mobile", "momo", "number"],
        aliases: ["validate-msisdn", "phone-validation", "merchant-app/validate-msisdn"],
        tags: ["msisdn", "phoneNumber", "networkCode"]
    },
    {
        title: "Get MoMo Network",
        content: "Retrieve available mobile money networks. GET endpoint for network information.",
        url: "/payout/momo/get-network",
        section: "API ENDPOINTS",
        icon: Smartphone,
        keywords: ["momo", "network", "get", "mobile", "money", "available"],
        aliases: ["get-network", "momo-network", "merchant-app/get-network"]
    },
    {
        title: "Collection Request",
        content: "Request payment collection from customers. POST endpoint for payment requests.",
        url: "/collection",
        section: "API ENDPOINTS",
        icon: Download,
        keywords: ["collection", "request", "payment", "customer", "receive"],
        aliases: ["collection-request", "merchant-app/collection"]
    },
    {
        title: "Virtual Account Generation",
        content: "Generate virtual bank accounts for collections. POST endpoint for account creation.",
        url: "/collection/bank",
        section: "API ENDPOINTS",
        icon: Building2,
        keywords: ["virtual", "account", "generate", "collection", "bank"],
        aliases: ["generate-virtual-account", "merchant-app/virtual-account"]
    },
    {
        title: "Webhook Setup",
        content: "Configure webhooks for transaction notifications. POST endpoint for callback setup.",
        url: "/global-callback-setup",
        section: "API ENDPOINTS",
        icon: Webhook,
        keywords: ["webhook", "setup", "callback", "notification", "transaction"],
        aliases: ["callback-setup", "webhook-setup", "merchant-app/webhook"]
    },
    {
        title: "Wallet Operations",
        content: "Manage digital wallet balance and transactions. Various endpoints for wallet management.",
        url: "/wallet",
        section: "API ENDPOINTS",
        icon: Wallet,
        keywords: ["wallet", "balance", "digital", "operations", "manage"],
        aliases: ["wallet-ops", "merchant-app/wallet"]
    },
    {
        title: "Currency Conversion",
        content: "Convert funds between currencies. POST endpoint for FX operations.",
        url: "/payout/convert-funds",
        section: "API ENDPOINTS",
        icon: ArrowLeftRight,
        keywords: ["currency", "conversion", "convert", "fx", "exchange"],
        aliases: ["convert-funds", "fx-conversion", "merchant-app/convert"]
    },
    {
        title: "Transfer Status",
        content: "Check status of transfers and transactions. GET endpoint for status queries.",
        url: "/transfer/transfer-status",
        section: "API ENDPOINTS",
        icon: BarChart3,
        keywords: ["transfer", "status", "check", "transaction", "query"],
        aliases: ["transfer-status", "status-check", "merchant-app/status"]
    },
    {
        title: "Resend Webhook",
        content: "Manually resend webhook notifications. POST endpoint for webhook retries.",
        url: "/transfer/resend-single-webhook",
        section: "API ENDPOINTS",
        icon: Webhook,
        keywords: ["resend", "webhook", "retry", "notification", "manual"],
        aliases: ["resend-webhook", "webhook-resend", "merchant-app/resend"]
    },

    // Card Acquiring
    {
        title: "Initiate Payment - New Customer",
        content: "Initiate card payment for a new customer with billing details, customer info, and payment card data.",
        url: "/card-acquiring/initiate-payment-new-customer",
        section: "CARD ACQUIRING",
        icon: CreditCard,
        keywords: ["card", "payment", "new", "customer", "initiate", "acquiring", "cardNumber", "securityCode", "expirationMonth", "expirationYear", "cardHolderName", "billingDetails", "customerDetails", "redirectUrl", "clientReference"],
        aliases: ["initiate-payment-new", "card-payment-new", "acq-app/initiate-payment"],
        tags: ["cardNumber", "securityCode", "expirationMonth", "expirationYear", "cardHolderName", "billingDetails", "customerDetails", "redirectUrl", "clientReference", "countryCode", "zipCode", "existingCustomer"]
    },
    {
        title: "Initiate Payment - Existing Customer",
        content: "Initiate card payment for a returning customer using their existing customer ID and stored payment details.",
        url: "/card-acquiring/initiate-payment-existing-customer",
        section: "CARD ACQUIRING",
        icon: CreditCard,
        keywords: ["card", "payment", "existing", "customer", "returning", "customerId", "cardNumber", "securityCode", "expirationMonth", "expirationYear", "billingDetails", "redirectUrl", "clientReference"],
        aliases: ["initiate-payment-existing", "card-payment-existing", "returning-customer"],
        tags: ["customerId", "cardNumber", "securityCode", "expirationMonth", "expirationYear", "cardHolderName", "billingDetails", "redirectUrl", "clientReference", "countryCode", "zipCode", "existingCustomer"]
    }
];

// Derive type from section for all items that don't have an explicit type
const GUIDE_SECTIONS = new Set(["GUIDES", "GETTING STARTED"]);
const API_SECTIONS = new Set(["API ENDPOINTS", "COLLECTIONS", "PAYOUTS", "LOCAL TRANSFERS", "FOREIGN TRANSFERS", "MOBILE MONEY", "CORE SERVICES", "TRANSFERS"]);

const enrichedSearchData: SearchItem[] = searchData.map(item => {
    if (item.type) return item;
    if (item.section && GUIDE_SECTIONS.has(item.section)) return {...item, type: "guide" as const};
    if (item.section && API_SECTIONS.has(item.section)) return {...item, type: "api-reference" as const};
    if (item.section === "ADMINISTRATION" || item.section === "REFERENCE" || item.section === "DEVELOPER TOOLS") return {...item, type: "page" as const};
    return {...item, type: "documentation" as const};
});

/**
 * Extract URL path from various URL formats
 * Handles: full URLs, paths with domain, relative paths
 */
const extractPathFromUrl = (input: string): string => {
    const trimmed = input.trim();

    // Check if it's a full URL
    try {
        const url = new URL(trimmed);
        return url.pathname;
    } catch {
        // Not a valid URL, check if it contains a domain
        if (trimmed.includes("://") || trimmed.includes(".com") || trimmed.includes(".dev")) {
            // Extract path after domain
            const match = trimmed.match(/(?:https?:\/\/)?(?:[^/]+)(\/.*)/);
            if (match && match[1]) {
                return match[1];
            }
        }

        // Assume it's already a path
        return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
    }
};

/**
 * Normalise technical query patterns like "x-channel-id = 3" or "x-channel-code: legacy-api-user"
 * into searchable forms. Returns array of normalised query variants to check.
 */
const normaliseTechnicalQuery = (query: string): string[] => {
    const variants: string[] = [query];

    // "key = value" or "key: value" → also try "key value", "key", "value"
    const kvMatch = query.match(/^([\w-]+)\s*[=:]\s*(.+)$/);
    if (kvMatch) {
        const [, key, value] = kvMatch;
        variants.push(key.trim());
        variants.push(value.trim());
        variants.push(`${key.trim()} ${value.trim()}`);
    }

    return [...new Set(variants)];
};

/**
 * Calculate relevance score for search results
 * Higher score = more relevant
 */
const calculateSearchScore = (item: SearchItem, query: string): number => {
    const qLower = query.toLowerCase().trim();
    let score = 0;

    // Check tags first  exact technical value matches get high priority
    if (item.tags && item.tags.length > 0) {
        const tagsLower = item.tags.map(t => t.toLowerCase());

        // Exact tag match
        if (tagsLower.some(t => t === qLower)) {
            score += 800;
        }
        // Tag starts with query
        else if (tagsLower.some(t => t.startsWith(qLower))) {
            score += 500;
        }
        // Tag contains query
        else if (tagsLower.some(t => t.includes(qLower))) {
            score += 300;
        }

        // Handle "key = value" or "key: value" patterns  normalise and re-check tags
        const queryVariants = normaliseTechnicalQuery(qLower);
        if (queryVariants.length > 1) {
            for (const variant of queryVariants) {
                if (tagsLower.some(t => t === variant)) {
                    score += 600;
                    break;
                } else if (tagsLower.some(t => t.includes(variant) || variant.includes(t))) {
                    score += 200;
                    break;
                }
            }
        }
    }

    // Extract path if query looks like a URL
    let searchQuery = qLower;
    let isUrlSearch = false;

    if (qLower.includes("://") || qLower.includes(".com") || qLower.includes(".dev") ||
        (qLower.startsWith("/") && qLower.length > 1)) {
        const extractedPath = extractPathFromUrl(qLower);
        searchQuery = extractedPath.toLowerCase();
        isUrlSearch = true;

        // Exact URL path match gets highest priority
        if (item.url === extractedPath) {
            return 10000; // Massive priority for exact URL matches
        }

        // Case-insensitive exact match
        if (item.url.toLowerCase() === searchQuery) {
            return 9000;
        }

        // Exact alias match for URL
        const exactAliasMatch = item.aliases?.some(a => a.toLowerCase() === searchQuery);
        if (exactAliasMatch) {
            return 8000;
        }

        // URL contains the full search path
        if (item.url.toLowerCase().includes(searchQuery)) {
            score += 5000;
        }

        // Path segment exact matching
        const searchSegments = searchQuery.split("/").filter(Boolean);
        const itemSegments = item.url.toLowerCase().split("/").filter(Boolean);

        // All search segments found in item URL in order
        let allSegmentsMatch = true;
        let lastFoundIndex = -1;
        for (const segment of searchSegments) {
            const foundIndex = itemSegments.indexOf(segment, lastFoundIndex + 1);
            if (foundIndex === -1) {
                allSegmentsMatch = false;
                break;
            }
            lastFoundIndex = foundIndex;
        }

        if (allSegmentsMatch && searchSegments.length > 0) {
            score += 4000 + (searchSegments.length * 200);
        }

        // Partial segment matching
        const matchingSegments = searchSegments.filter(searchSeg =>
            itemSegments.some(itemSeg =>
                itemSeg === searchSeg ||
                itemSeg.includes(searchSeg) ||
                searchSeg.includes(itemSeg)
            )
        );

        if (matchingSegments.length > 0) {
            score += matchingSegments.length * 300;
        }

        // Last segment matching (endpoint name)
        const lastSearchSegment = searchSegments[searchSegments.length - 1];
        const lastItemSegment = itemSegments[itemSegments.length - 1];

        if (lastSearchSegment && lastItemSegment) {
            if (lastItemSegment === lastSearchSegment) {
                score += 2000;
            } else if (lastItemSegment?.includes(lastSearchSegment)) {
                score += 1000;
            }
        }

        // Check if any alias contains URL path segments
        const aliasSegmentMatch = item.aliases?.some(alias => {
            const aliasLower = alias.toLowerCase();
            return searchSegments.some(seg => aliasLower.includes(seg) || seg.includes(aliasLower));
        });

        if (aliasSegmentMatch) {
            score += 500;
        }
    }

    // Exact title match: 1000 points (highest priority for non-URL searches)
    if (item.title.toLowerCase() === searchQuery) {
        score += 1000;
    }

    // Title starts with query: 500 points
    if (item.title.toLowerCase().startsWith(searchQuery)) {
        score += 500;
    }

    // Title contains query: 250 points
    if (item.title.toLowerCase().includes(searchQuery)) {
        score += 250;
    }

    // Exact keyword match: 400 points
    const exactKeyword = item.keywords?.some(k => k.toLowerCase() === searchQuery);
    if (exactKeyword) {
        score += 400;
    }

    // Keyword starts with query: 200 points
    const startsKeyword = item.keywords?.some(k => k.toLowerCase().startsWith(searchQuery));
    if (startsKeyword) {
        score += 200;
    }

    // Keyword contains query: 150 points
    const partialKeyword = item.keywords?.some(k => k.toLowerCase().includes(searchQuery));
    if (partialKeyword && !startsKeyword && !exactKeyword) {
        score += 150;
    }

    // Exact alias match: 350 points
    const exactAlias = item.aliases?.some(a => a.toLowerCase() === searchQuery);
    if (exactAlias && !isUrlSearch) {
        score += 350;
    }

    // Alias contains query: 100 points
    const partialAlias = item.aliases?.some(a => a.toLowerCase().includes(searchQuery));
    if (partialAlias && !exactAlias && !isUrlSearch) {
        score += 100;
    }

    // Section exact match: 300 points
    if (item.section?.toLowerCase() === searchQuery) {
        score += 300;
    }

    // Section contains query: 100 points
    if (item.section?.toLowerCase().includes(searchQuery)) {
        score += 100;
    }

    // Content contains query: 50 points
    if (item.content.toLowerCase().includes(searchQuery)) {
        score += 50;
    }

    // Multi-word query bonus: check if all words match
    const queryWords = searchQuery.split(/[\s/=-]+/).filter(Boolean);
    if (queryWords.length > 1 && !isUrlSearch) {
        const allWordsMatch = queryWords.every(word =>
            item.title.toLowerCase().includes(word) ||
            item.content.toLowerCase().includes(word) ||
            item.keywords?.some(k => k.toLowerCase().includes(word)) ||
            item.tags?.some(t => t.toLowerCase().includes(word)) ||
            item.url.toLowerCase().includes(word)
        );
        if (allWordsMatch) {
            score += 200;
        }

        // Partial word match bonus  majority of words found
        const matchingWords = queryWords.filter(word =>
            item.title.toLowerCase().includes(word) ||
            item.keywords?.some(k => k.toLowerCase().includes(word)) ||
            item.tags?.some(t => t.toLowerCase().includes(word))
        );
        if (matchingWords.length >= Math.ceil(queryWords.length * 0.6) && matchingWords.length < queryWords.length) {
            score += 100;
        }
    }

    return score;
};

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();

    const openModal = useCallback(() => setIsModalOpen(true), []);
    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setSearchTerm("");
        setSearchResults([]);
    }, []);

    // Clear search when route changes
    useEffect(() => {
        setShowSuggestions(false);
        setSearchTerm("");
    }, [location.pathname]);

    // Perform search with debounce
    useEffect(() => {
        const trimmedTerm = searchTerm.trim();

        if (trimmedTerm.length === 0) {
            setSearchResults([]);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);

        // Debounce search for better performance
        const timeoutId = setTimeout(() => {
            try {
                const searchTermLower = trimmedTerm.toLowerCase();

                // Filter and score results
                const scoredResults = enrichedSearchData
                    .map(item => ({
                        item,
                        score: calculateSearchScore(item, searchTermLower)
                    }))
                    .filter(({score}) => score > 0) // Only include items with matches
                    .sort((a, b) => b.score - a.score) // Sort by score descending
                    .map(({item}) => item);

                setSearchResults(scoredResults);
            } catch (error) {
                console.error("[SearchProvider] Search error:", error);
                setSearchResults([]);
            } finally {
                setIsSearching(false);
            }
        }, 300); // 300ms debounce for optimal UX

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    const contextValue = useMemo(
        () => ({
            searchTerm,
            setSearchTerm,
            searchResults,
            isSearching,
            showSuggestions,
            setShowSuggestions,
            isModalOpen,
            openModal,
            closeModal,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [searchTerm, searchResults, isSearching, showSuggestions, isModalOpen]
    );

    return (
        <SearchContext.Provider value={contextValue}>
            {children}
        </SearchContext.Provider>
    );
};
