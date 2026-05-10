import React, { Suspense } from "react";
import { createBrowserRouter, ScrollRestoration, Navigate } from "react-router-dom";
import Layout from "@/Layout.tsx";
import ErrorBoundary, { RouterErrorBoundary } from "@/components/ErrorBoundary.tsx";
import AdminLayout from "@/admin/layouts/AdminLayout.tsx";
import ProtectedRoute from "@/components/ProtectedRoute";
import GuestRoute from "@/components/GuestRoute";

// ─── Lazy page imports ────────────────────────────────────────────────────────

const Home = React.lazy(() => import("@/pages/getting-started/Home.tsx"));
const Introduction = React.lazy(() => import("@/pages/getting-started/Introduction.tsx"));
const ApiIntegrations = React.lazy(() => import("@/pages/getting-started/ApiIntegrations.tsx"));
const ApiRateLimits = React.lazy(() => import("@/pages/guides/ApiRateLimits.tsx"));
const QuickGuides = React.lazy(() => import("@/pages/guides/QuickGuides.tsx"));
const TransactionDynamics = React.lazy(() => import("@/pages/guides/TransactionDynamics.tsx"));
const UserRoles = React.lazy(() => import("@/pages/learn-more/UserRoles.tsx"));
const StatusResponses = React.lazy(() => import("@/pages/learn-more/StatusResponses.tsx"));
const SandboxPlayground = React.lazy(() => import("@/pages/learn-more/SandboxPlayground.tsx"));

const Wallet = React.lazy(() => import("@/pages/api-documentation/Wallet.tsx"));
const Transfer = React.lazy(() => import("@/pages/api-documentation/Transfer.tsx"));
const Payout = React.lazy(() => import("@/pages/api-documentation/Payout.tsx"));
const Collection = React.lazy(() => import("@/pages/api-documentation/Collection.tsx"));
const GlobalCallbackSetup = React.lazy(() => import("@/pages/api-documentation/GlobalCallbackSetup.tsx"));
const Authentication = React.lazy(() => import("@/pages/api-documentation/Authentication.tsx"));

// Payout Bank
const PayoutBank = React.lazy(() => import("@/pages/api-documentation/transfer/payout/PayoutBank.tsx"));
const PayoutBankLocal = React.lazy(() => import("@/pages/api-documentation/transfer/payout/PayoutBankLocal.tsx"));
const PayoutBankForeign = React.lazy(() => import("@/pages/api-documentation/transfer/payout/PayoutBankForeign.tsx"));
const PayoutConvertFunds = React.lazy(() => import("@/pages/api-documentation/transfer/payout/PayoutConvertFunds.tsx"));
const Rate = React.lazy(() => import("@/pages/api-documentation/transfer/payout/Rate.tsx"));
const Report = React.lazy(() => import("@/pages/api-documentation/transfer/payout/Report.tsx"));
const PayoutFundTransferCallbackSample = React.lazy(() => import("@/pages/api-documentation/transfer/payout/PayoutFundTransferCallbackSample.tsx"));

// Payout Momo
const PayoutMomoGetNetwork = React.lazy(() => import("@/pages/api-documentation/transfer/payout/momo/PayoutMomoGetNetwork.tsx"));
const PayoutMomoGetCurrency = React.lazy(() => import("@/pages/api-documentation/transfer/payout/momo/PayoutMomoGetCurrency.tsx"));
const PayoutMomoValidateMsisdn = React.lazy(() => import("@/pages/api-documentation/transfer/payout/momo/PayoutMomoValidateMsisdn.tsx"));
const PayoutMomoTransfer = React.lazy(() => import("@/pages/api-documentation/transfer/payout/momo/PayoutMomoTransfer.tsx"));

// Payout Bank Local
const PayoutBankLocalGetBanks = React.lazy(() => import("@/pages/api-documentation/transfer/payout/bank/local/PayoutBankLocalGetBanks.tsx"));
const PayoutBankLocalAccountEnquiry = React.lazy(() => import("@/pages/api-documentation/transfer/payout/bank/local/PayoutBankLocalAccountEnquiry.tsx"));
const PayoutBankLocalAccountTransferNgn = React.lazy(() => import("@/pages/api-documentation/transfer/payout/bank/local/PayoutBankLocalAccountTransferNgn.tsx"));
const PayoutBankLocalPasspointEnquiry = React.lazy(() => import("@/pages/api-documentation/transfer/payout/bank/local/PayoutBankLocalPasspointEnquiry.tsx"));
const PayoutBankLocalPasspointWalletTransfer = React.lazy(() => import("@/pages/api-documentation/transfer/payout/bank/local/PayoutBankLocalPasspointWalletTransfer.tsx"));

// Payout Bank Foreign
const PayoutBankForeignSummary = React.lazy(() => import("@/pages/api-documentation/transfer/payout/bank/foreign/PayoutBankForeignSummary.tsx"));
const PayoutBankForeignGetAvailableCountries = React.lazy(() => import("@/pages/api-documentation/transfer/payout/bank/foreign/PayoutBankForeignGetAvailableCountries.tsx"));
const PayoutBankForeignGetPaymentMethods = React.lazy(() => import("@/pages/api-documentation/transfer/payout/bank/foreign/PayoutBankForeignGetPaymentMethods.tsx"));
const PayoutBankForeignB2cTransferCny = React.lazy(() => import("@/pages/api-documentation/transfer/payout/bank/foreign/PayoutBankForeignB2cTransferCny.tsx"));
const PayoutBankForeignB2bTransferUsd = React.lazy(() => import("@/pages/api-documentation/transfer/payout/bank/foreign/PayoutBankForeignB2bTransferUsd.tsx"));
const PayoutBankForeignB2bTransferCny = React.lazy(() => import("@/pages/api-documentation/transfer/payout/bank/foreign/PayoutBankForeignB2bTransferCny.tsx"));
const PayoutBankForeignAchUsd = React.lazy(() => import("@/pages/api-documentation/transfer/payout/bank/foreign/PayoutBankForeignAchUsd.tsx"));
const PayoutBankForeignWireUsd = React.lazy(() => import("@/pages/api-documentation/transfer/payout/bank/foreign/PayoutBankForeignWireUsd.tsx"));
const PayoutBankForeignRtpUsd = React.lazy(() => import("@/pages/api-documentation/transfer/payout/bank/foreign/PayoutBankForeignRtpUsd.tsx"));
const PayoutBankForeignFednowUsd = React.lazy(() => import("@/pages/api-documentation/transfer/payout/bank/foreign/PayoutBankForeignFednowUsd.tsx"));
const PayoutBankForeignAccountDepositUsd = React.lazy(() => import("@/pages/api-documentation/transfer/payout/bank/foreign/PayoutBankForeignAccountDepositUsd.tsx"));
const PayoutBankForeignAccountDepositGbp = React.lazy(() => import("@/pages/api-documentation/transfer/payout/bank/foreign/PayoutBankForeignAccountDepositGbp.tsx"));
const PayoutBankForeignAccountDepositEur = React.lazy(() => import("@/pages/api-documentation/transfer/payout/bank/foreign/PayoutBankForeignAccountDepositEur.tsx"));
const PayoutBankForeignAccountDepositCny = React.lazy(() => import("@/pages/api-documentation/transfer/payout/bank/foreign/PayoutBankForeignAccountDepositCny.tsx"));
const PayoutBankForeignMomoDepositCny = React.lazy(() => import("@/pages/api-documentation/transfer/payout/bank/foreign/PayoutBankForeignMomoDepositCny.tsx"));

// Collection
const CollectionBank = React.lazy(() => import("@/pages/api-documentation/transfer/collection/CollectionBank.tsx"));
const CollectionBankOpenBanking = React.lazy(() => import("@/pages/api-documentation/transfer/collection/CollectionBankOpenBanking.tsx"));
const CollectionReport = React.lazy(() => import("@/pages/api-documentation/transfer/collection/CollectionReport.tsx"));
const CollectionWalletCreditCallbackSample = React.lazy(() => import("@/pages/api-documentation/transfer/collection/CollectionWalletCreditCallbackSample.tsx"));
const GetMomoCollectionNetwork = React.lazy(() => import("@/pages/api-documentation/transfer/collection/momo/GetMomoCollectionNetwork.tsx"));
const GetMomoCollectionCurrency = React.lazy(() => import("@/pages/api-documentation/transfer/collection/momo/GetMomoCollectionCurrency.tsx"));
const CollectionMomoRequestToPay = React.lazy(() => import("@/pages/api-documentation/transfer/collection/momo/CollectionMomoRequestToPay.tsx"));
const GetCollectionCurrency = React.lazy(() => import("@/pages/api-documentation/transfer/collection/bank/GetCollectionCurrency.tsx"));
const CollectionGenerateNGNStaticVirtualAccount = React.lazy(() => import("@/pages/api-documentation/transfer/collection/bank/CollectionGenerateNGNStaticVirtualAccount.tsx"));
const CollectionGenerateNGNDynamicVirtualAccount = React.lazy(() => import("@/pages/api-documentation/transfer/collection/bank/CollectionGenerateNGNDynamicVirtualAccount.tsx"));
const CollectionGenerateNgnDynamicVirtualAccountWithOtherInfo = React.lazy(() => import("@/pages/api-documentation/transfer/collection/bank/CollectionGenerateNgnDynamicVirtualAccountWithOtherInfo.tsx"));
const CollectionGenerateUSDVirtualAccountIndividual = React.lazy(() => import("@/pages/api-documentation/transfer/collection/bank/CollectionGenerateUSDVirtualAccountIndividual.tsx"));
const CollectionGenerateUSDVirtualAccountBusiness = React.lazy(() => import("@/pages/api-documentation/transfer/collection/bank/CollectionGenerateUSDVirtualAccountBusiness.tsx"));
const CollectionListVirtualAccountsNgnPaginated = React.lazy(() => import("@/pages/api-documentation/transfer/collection/bank/CollectionListVirtualAccountsNgnPaginated.tsx"));
const CollectionGetVirtualAccount = React.lazy(() => import("@/pages/api-documentation/transfer/collection/bank/CollectionGetVirtualAccount.tsx"));
const CollectionRequestPaymentForeign = React.lazy(() => import("@/pages/api-documentation/transfer/collection/bank/open-banking/CollectionRequestPaymentForeign.tsx"));
const CollectionGetBanks = React.lazy(() => import("@/pages/api-documentation/transfer/collection/bank/open-banking/preselect/CollectionGetBanks.tsx"));
const CollectionGetCountries = React.lazy(() => import("@/pages/api-documentation/transfer/collection/bank/open-banking/preselect/CollectionGetCountries.tsx"));
const CollectionRequestPaymentForeignWithBankPreselect = React.lazy(() => import("@/pages/api-documentation/transfer/collection/bank/open-banking/preselect/CollectionRequestPaymentForeignWithBankPreselect.tsx"));

// Transfer Root
const TransferIntroduction = React.lazy(() => import("@/pages/api-documentation/transfer/TransferIntroduction.tsx"));
const TransferListCountries = React.lazy(() => import("@/pages/api-documentation/transfer/TransferListCountries.tsx"));
const TransferStatus = React.lazy(() => import("@/pages/api-documentation/transfer/TransferStatus.tsx"));
const TransferPaymentStatusReport = React.lazy(() => import("@/pages/api-documentation/transfer/TransferPaymentStatusReport.tsx"));
const TransferResendSingleWebhook = React.lazy(() => import("@/pages/api-documentation/transfer/TransferResendSingleWebhook.tsx"));
const TransferResendBulkWebhook = React.lazy(() => import("@/pages/api-documentation/transfer/TransferResendBulkWebhook.tsx"));
const TransferConfirmMomoPayment = React.lazy(() => import("@/pages/api-documentation/transfer/TransferConfirmMomoPayment.tsx"));

// Virtual Card v2
const VirtualCardV2 = React.lazy(() => import("@/pages/virtual-card-v2/VirtualCardV2.tsx"));
const CardIntroduction = React.lazy(() => import("@/pages/virtual-card-v2/CardIntroduction.tsx"));
const IssueCardDefaultBilling = React.lazy(() => import("@/pages/virtual-card-v2/IssueCardDefaultBilling.tsx"));
const IssueCardClientBilling = React.lazy(() => import("@/pages/virtual-card-v2/IssueCardClientBilling.tsx"));
const IssueAndFundCardClientBilling = React.lazy(() => import("@/pages/virtual-card-v2/IssueAndFundCardClientBilling.tsx"));
const CardDetails = React.lazy(() => import("@/pages/virtual-card-v2/CardDetails.tsx"));
const CardFullPan = React.lazy(() => import("@/pages/virtual-card-v2/CardFullPan.tsx"));
const CardBalance = React.lazy(() => import("@/pages/virtual-card-v2/CardBalance.tsx"));
const CardProfileStatus = React.lazy(() => import("@/pages/virtual-card-v2/CardProfileStatus.tsx"));
const FreezeCard = React.lazy(() => import("@/pages/virtual-card-v2/FreezeCard.tsx"));
const UnfreezeCard = React.lazy(() => import("@/pages/virtual-card-v2/UnfreezeCard.tsx"));
const FundCard = React.lazy(() => import("@/pages/virtual-card-v2/FundCard.tsx"));
const WithdrawFromCard = React.lazy(() => import("@/pages/virtual-card-v2/WithdrawFromCard.tsx"));
const CardTransaction = React.lazy(() => import("@/pages/virtual-card-v2/CardTransaction.tsx"));
const CardTransactionsList = React.lazy(() => import("@/pages/virtual-card-v2/CardTransactionsList.tsx"));
const TerminateCard = React.lazy(() => import("@/pages/virtual-card-v2/TerminateCard.tsx"));
const UpdateCardCallbackDetails = React.lazy(() => import("@/pages/virtual-card-v2/UpdateCardCallbackDetails.tsx"));
const CardStatement = React.lazy(() => import("@/pages/virtual-card-v2/CardStatement.tsx"));
const CardStatementByTransactionId = React.lazy(() => import("@/pages/virtual-card-v2/CardStatementByTransactionId.tsx"));
const RealtimeAuthorizationDecisionMaker = React.lazy(() => import("@/pages/virtual-card-v2/RealtimeAuthorizationDecisionMaker.tsx"));

// Admin pages
const Dashboard = React.lazy(() => import("@/admin/pages/Dashboard.tsx"));
const Sections = React.lazy(() => import("@/admin/pages/Sections.tsx"));
const Pages = React.lazy(() => import("@/admin/pages/Pages.tsx"));
const Endpoints = React.lazy(() => import("@/admin/pages/Endpoints.tsx"));
const Users = React.lazy(() => import("@/admin/pages/Users.tsx"));
const FeedbackPage = React.lazy(() => import("@/admin/pages/Feedback.tsx"));
const Settings = React.lazy(() => import("@/admin/pages/Settings.tsx"));
const Login = React.lazy(() => import("@/admin/pages/Login.tsx"));
const ForgotPassword = React.lazy(() => import("@/admin/pages/ForgotPassword.tsx"));

// ─── Suspense fallback ────────────────────────────────────────────────────────

const PageFallback = (): React.ReactElement => (
    <div className="flex items-center justify-center min-h-[40vh]">
        <div className="h-8 w-8 rounded-full border-2 border-brand border-t-transparent animate-spin" aria-label="Loading page" />
    </div>
);

// ─── Router  created once at module level (not inside a component) ───────────

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <ScrollRestoration />
                <ErrorBoundary>
                    <Layout />
                </ErrorBoundary>
            </>
        ),
        errorElement: <RouterErrorBoundary />,
        children: [
            { path: "", element: <Suspense fallback={<PageFallback />}><Home /></Suspense> },
            { path: "api-rate-limits", element: <Suspense fallback={<PageFallback />}><ApiRateLimits /></Suspense> },
            { path: "quick-guides", element: <Suspense fallback={<PageFallback />}><QuickGuides /></Suspense> },
            { path: "transaction-dynamics", element: <Suspense fallback={<PageFallback />}><TransactionDynamics /></Suspense> },
            { path: "introduction", element: <Suspense fallback={<PageFallback />}><Introduction /></Suspense> },
            { path: "api-integrations", element: <Suspense fallback={<PageFallback />}><ApiIntegrations /></Suspense> },
            { path: "wallet", element: <Suspense fallback={<PageFallback />}><Wallet /></Suspense> },
            { path: "transfer", element: <Suspense fallback={<PageFallback />}><Transfer /></Suspense> },

            // Payout Routes
            { path: "payout", element: <Suspense fallback={<PageFallback />}><Payout /></Suspense> },
            { path: "payout/momo/get-network", element: <Suspense fallback={<PageFallback />}><PayoutMomoGetNetwork /></Suspense> },
            { path: "payout/momo/get-payout-network", element: <Suspense fallback={<PageFallback />}><PayoutMomoGetCurrency /></Suspense> },
            { path: "payout/momo/validate-msisdn", element: <Suspense fallback={<PageFallback />}><PayoutMomoValidateMsisdn /></Suspense> },
            { path: "payout/momo/transfer", element: <Suspense fallback={<PageFallback />}><PayoutMomoTransfer /></Suspense> },
            { path: "payout/bank", element: <Suspense fallback={<PageFallback />}><PayoutBank /></Suspense> },
            { path: "payout/bank/local", element: <Suspense fallback={<PageFallback />}><PayoutBankLocal /></Suspense> },
            { path: "payout/bank/local/get-banks", element: <Suspense fallback={<PageFallback />}><PayoutBankLocalGetBanks /></Suspense> },
            { path: "payout/bank/local/account-enquiry", element: <Suspense fallback={<PageFallback />}><PayoutBankLocalAccountEnquiry /></Suspense> },
            { path: "payout/bank/local/account-transfer-ngn", element: <Suspense fallback={<PageFallback />}><PayoutBankLocalAccountTransferNgn /></Suspense> },
            { path: "payout/bank/local/passpoint-enquiry", element: <Suspense fallback={<PageFallback />}><PayoutBankLocalPasspointEnquiry /></Suspense> },
            { path: "payout/bank/local/passpoint-wallet-transfer", element: <Suspense fallback={<PageFallback />}><PayoutBankLocalPasspointWalletTransfer /></Suspense> },
            { path: "payout/bank/foreign", element: <Suspense fallback={<PageFallback />}><PayoutBankForeign /></Suspense> },
            { path: "payout/bank/foreign/summary", element: <Suspense fallback={<PageFallback />}><PayoutBankForeignSummary /></Suspense> },
            { path: "payout/bank/foreign/get-available-countries", element: <Suspense fallback={<PageFallback />}><PayoutBankForeignGetAvailableCountries /></Suspense> },
            { path: "payout/bank/foreign/get-payment-methods", element: <Suspense fallback={<PageFallback />}><PayoutBankForeignGetPaymentMethods /></Suspense> },
            { path: "payout/bank/foreign/ach-usd", element: <Suspense fallback={<PageFallback />}><PayoutBankForeignAchUsd /></Suspense> },
            { path: "payout/bank/foreign/wire-usd", element: <Suspense fallback={<PageFallback />}><PayoutBankForeignWireUsd /></Suspense> },
            { path: "payout/bank/foreign/rtp-usd", element: <Suspense fallback={<PageFallback />}><PayoutBankForeignRtpUsd /></Suspense> },
            { path: "payout/bank/foreign/fednow-usd", element: <Suspense fallback={<PageFallback />}><PayoutBankForeignFednowUsd /></Suspense> },
            { path: "payout/bank/foreign/account-deposit-usd", element: <Suspense fallback={<PageFallback />}><PayoutBankForeignAccountDepositUsd /></Suspense> },
            { path: "payout/bank/foreign/account-deposit-gbp", element: <Suspense fallback={<PageFallback />}><PayoutBankForeignAccountDepositGbp /></Suspense> },
            { path: "payout/bank/foreign/account-deposit-eur", element: <Suspense fallback={<PageFallback />}><PayoutBankForeignAccountDepositEur /></Suspense> },
            { path: "payout/bank/foreign/account-deposit-cny", element: <Suspense fallback={<PageFallback />}><PayoutBankForeignAccountDepositCny /></Suspense> },
            { path: "payout/bank/foreign/momo-deposit-cny", element: <Suspense fallback={<PageFallback />}><PayoutBankForeignMomoDepositCny /></Suspense> },
            { path: "payout/bank/foreign/b2b-transfer-cny", element: <Suspense fallback={<PageFallback />}><PayoutBankForeignB2bTransferCny /></Suspense> },
            { path: "payout/bank/foreign/b2c-transfer-cny", element: <Suspense fallback={<PageFallback />}><PayoutBankForeignB2cTransferCny /></Suspense> },
            { path: "payout/bank/foreign/b2b-transfer-usd", element: <Suspense fallback={<PageFallback />}><PayoutBankForeignB2bTransferUsd /></Suspense> },
            { path: "payout/rate", element: <Suspense fallback={<PageFallback />}><Rate /></Suspense> },
            { path: "payout/report", element: <Suspense fallback={<PageFallback />}><Report /></Suspense> },
            { path: "payout/convert-funds", element: <Suspense fallback={<PageFallback />}><PayoutConvertFunds /></Suspense> },
            { path: "payout/funds-transfer-callback-sample", element: <Suspense fallback={<PageFallback />}><PayoutFundTransferCallbackSample /></Suspense> },

            // Collection Routes
            { path: "collection", element: <Suspense fallback={<PageFallback />}><Collection /></Suspense> },
            { path: "collection/momo/get-currency", element: <Suspense fallback={<PageFallback />}><GetMomoCollectionCurrency /></Suspense> },
            { path: "collection/momo/get-network", element: <Suspense fallback={<PageFallback />}><GetMomoCollectionNetwork /></Suspense> },
            { path: "collection/momo/request-to-pay", element: <Suspense fallback={<PageFallback />}><CollectionMomoRequestToPay /></Suspense> },
            { path: "collection/bank", element: <Suspense fallback={<PageFallback />}><CollectionBank /></Suspense> },
            { path: "collection/bank/get-collection-currency", element: <Suspense fallback={<PageFallback />}><GetCollectionCurrency /></Suspense> },
            { path: "collection/bank/generate-ngn-static-virtual-account", element: <Suspense fallback={<PageFallback />}><CollectionGenerateNGNStaticVirtualAccount /></Suspense> },
            { path: "collection/bank/generate-ngn-dynamic-virtual-account", element: <Suspense fallback={<PageFallback />}><CollectionGenerateNGNDynamicVirtualAccount /></Suspense> },
            { path: "collection/bank/generate-ngn-dynamic-virtual-account-with-other-info", element: <Suspense fallback={<PageFallback />}><CollectionGenerateNgnDynamicVirtualAccountWithOtherInfo /></Suspense> },
            { path: "collection/bank/generate-usd-virtual-account-individual", element: <Suspense fallback={<PageFallback />}><CollectionGenerateUSDVirtualAccountIndividual /></Suspense> },
            { path: "collection/bank/generate-usd-virtual-account-business", element: <Suspense fallback={<PageFallback />}><CollectionGenerateUSDVirtualAccountBusiness /></Suspense> },
            { path: "collection/bank/list-virtual-accounts-ngn-paginated", element: <Suspense fallback={<PageFallback />}><CollectionListVirtualAccountsNgnPaginated /></Suspense> },
            { path: "collection/bank/get-virtual-account", element: <Suspense fallback={<PageFallback />}><CollectionGetVirtualAccount /></Suspense> },
            { path: "collection/bank/open-banking", element: <Suspense fallback={<PageFallback />}><CollectionBankOpenBanking /></Suspense> },
            { path: "collection/bank/open-banking/request-payment-foreign", element: <Suspense fallback={<PageFallback />}><CollectionRequestPaymentForeign /></Suspense> },
            { path: "collection/bank/open-banking/preselect/get-banks", element: <Suspense fallback={<PageFallback />}><CollectionGetBanks /></Suspense> },
            { path: "collection/bank/open-banking/preselect/get-countries", element: <Suspense fallback={<PageFallback />}><CollectionGetCountries /></Suspense> },
            { path: "collection/bank/open-banking/preselect/request-payment-foreign-with-bank-preselect", element: <Suspense fallback={<PageFallback />}><CollectionRequestPaymentForeignWithBankPreselect /></Suspense> },
            { path: "collection/report", element: <Suspense fallback={<PageFallback />}><CollectionReport /></Suspense> },
            { path: "collection/wallet-credit-callback-sample", element: <Suspense fallback={<PageFallback />}><CollectionWalletCreditCallbackSample /></Suspense> },

            // Transfer Root Routes
            { path: "transfer/transfer-introduction", element: <Suspense fallback={<PageFallback />}><TransferIntroduction /></Suspense> },
            { path: "transfer/list-countries", element: <Suspense fallback={<PageFallback />}><TransferListCountries /></Suspense> },
            { path: "transfer/transfer-status", element: <Suspense fallback={<PageFallback />}><TransferStatus /></Suspense> },
            { path: "transfer/payment-status-report", element: <Suspense fallback={<PageFallback />}><TransferPaymentStatusReport /></Suspense> },
            { path: "transfer/resend-single-webhook", element: <Suspense fallback={<PageFallback />}><TransferResendSingleWebhook /></Suspense> },
            { path: "transfer/resend-bulk-webhook", element: <Suspense fallback={<PageFallback />}><TransferResendBulkWebhook /></Suspense> },
            { path: "transfer/confirm-momo-payment", element: <Suspense fallback={<PageFallback />}><TransferConfirmMomoPayment /></Suspense> },

            // Legacy compatibility
            { path: "transfer/payout", element: <Suspense fallback={<PageFallback />}><Payout /></Suspense> },
            { path: "transfer/collection", element: <Suspense fallback={<PageFallback />}><Collection /></Suspense> },

            { path: "global-callback-setup", element: <Suspense fallback={<PageFallback />}><GlobalCallbackSetup /></Suspense> },
            { path: "authentication", element: <Suspense fallback={<PageFallback />}><Authentication /></Suspense> },

            // Virtual Card v2 Routes
            { path: "virtual-card-v2", element: <Suspense fallback={<PageFallback />}><VirtualCardV2 /></Suspense> },
            { path: "virtual-card-v2/card-introduction", element: <Suspense fallback={<PageFallback />}><CardIntroduction /></Suspense> },
            { path: "virtual-card-v2/issue-card-default-billing", element: <Suspense fallback={<PageFallback />}><IssueCardDefaultBilling /></Suspense> },
            { path: "virtual-card-v2/issue-card-client-billing", element: <Suspense fallback={<PageFallback />}><IssueCardClientBilling /></Suspense> },
            { path: "virtual-card-v2/issue-and-fund-card-client-billing", element: <Suspense fallback={<PageFallback />}><IssueAndFundCardClientBilling /></Suspense> },
            { path: "virtual-card-v2/card-details", element: <Suspense fallback={<PageFallback />}><CardDetails /></Suspense> },
            { path: "virtual-card-v2/card-full-pan", element: <Suspense fallback={<PageFallback />}><CardFullPan /></Suspense> },
            { path: "virtual-card-v2/card-balance", element: <Suspense fallback={<PageFallback />}><CardBalance /></Suspense> },
            { path: "virtual-card-v2/card-profile-status", element: <Suspense fallback={<PageFallback />}><CardProfileStatus /></Suspense> },
            { path: "virtual-card-v2/freeze-card", element: <Suspense fallback={<PageFallback />}><FreezeCard /></Suspense> },
            { path: "virtual-card-v2/unfreeze-card", element: <Suspense fallback={<PageFallback />}><UnfreezeCard /></Suspense> },
            { path: "virtual-card-v2/fund-card", element: <Suspense fallback={<PageFallback />}><FundCard /></Suspense> },
            { path: "virtual-card-v2/withdraw-from-card", element: <Suspense fallback={<PageFallback />}><WithdrawFromCard /></Suspense> },
            { path: "virtual-card-v2/card-transaction", element: <Suspense fallback={<PageFallback />}><CardTransaction /></Suspense> },
            { path: "virtual-card-v2/card-transactions-list", element: <Suspense fallback={<PageFallback />}><CardTransactionsList /></Suspense> },
            { path: "virtual-card-v2/terminate-card", element: <Suspense fallback={<PageFallback />}><TerminateCard /></Suspense> },
            { path: "virtual-card-v2/update-card-callback-details", element: <Suspense fallback={<PageFallback />}><UpdateCardCallbackDetails /></Suspense> },
            { path: "virtual-card-v2/card-statement", element: <Suspense fallback={<PageFallback />}><CardStatement /></Suspense> },
            { path: "virtual-card-v2/card-statement-by-transaction-id", element: <Suspense fallback={<PageFallback />}><CardStatementByTransactionId /></Suspense> },
            { path: "virtual-card-v2/realtime-authorization-decision-maker", element: <Suspense fallback={<PageFallback />}><RealtimeAuthorizationDecisionMaker /></Suspense> },

            { path: "user-roles", element: <Suspense fallback={<PageFallback />}><UserRoles /></Suspense> },
            { path: "status-responses", element: <Suspense fallback={<PageFallback />}><StatusResponses /></Suspense> },
            { path: "sandbox-playground", element: <Suspense fallback={<PageFallback />}><SandboxPlayground /></Suspense> },

            { path: "*", element: <Navigate to="/" replace /> },
        ],
    },
    {
        path: "/admin",
        element: (
            <ProtectedRoute>
                <AdminLayout />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <Suspense fallback={<PageFallback />}><Dashboard /></Suspense> },
            { path: "sections", element: <Suspense fallback={<PageFallback />}><Sections /></Suspense> },
            { path: "pages", element: <Suspense fallback={<PageFallback />}><Pages /></Suspense> },
            { path: "endpoints", element: <Suspense fallback={<PageFallback />}><Endpoints /></Suspense> },
            { path: "users", element: <Suspense fallback={<PageFallback />}><Users /></Suspense> },
            { path: "feedback", element: <Suspense fallback={<PageFallback />}><FeedbackPage /></Suspense> },
            { path: "settings", element: <Suspense fallback={<PageFallback />}><Settings /></Suspense> },
        ],
    },
    {
        path: "/admin/login",
        element: (
            <GuestRoute>
                <Suspense fallback={<PageFallback />}><Login /></Suspense>
            </GuestRoute>
        ),
    },
    {
        path: "/admin/forgot-password",
        element: (
            <GuestRoute>
                <Suspense fallback={<PageFallback />}><ForgotPassword /></Suspense>
            </GuestRoute>
        ),
    },
]);

const Routes = (): typeof router => router;

export default Routes;
