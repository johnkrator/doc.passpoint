// Card Introduction API Data - Complete specification
// This file contains ALL API endpoint data for Virtual Card v2

export const issueCardRequestParams = [
    { parameter: "firstName", type: "string", required: "mandatory", description: "cardholder firstname", defaultValue: "" },
    { parameter: "lastName", type: "string", required: "mandatory", description: "cardholder lastname", defaultValue: "" },
    { parameter: "email", type: "string", required: "mandatory", description: "cardholder email", defaultValue: "" },
    { parameter: "phoneNumber", type: "string", required: "optional", description: "cardholder phone number", defaultValue: "" },
    { parameter: "currency", type: "string", required: "mandatory", description: "card currency", defaultValue: "USD" },
    { parameter: "scheme", type: "number", required: "mandatory", description: "card scheme. 1-MC, 2-Visa", defaultValue: "" },
    { parameter: "cardType", type: "number", required: "mandatory", description: "card type. 0 - Virtual, 1 - Physical", defaultValue: "0" },
    { parameter: "orderId", type: "string", required: "mandatory", description: "uniquely generated reference from merchant", defaultValue: "" },
    { parameter: "is3d", type: "string", required: "optional", description: "indicates whether the card will be 3DS or non-3DDS", defaultValue: "no" },
    { parameter: "tokenization", type: "string", required: "optional", description: "indicates if the card will have tokenization", defaultValue: "no" },
    { parameter: "useCardAsChargeBearer", type: "string", required: "optional", description: "indicates whether the card will be bearer charges such as crossborder charge, decline charge etc", defaultValue: "no" },
    { parameter: "amount", type: "number", required: "optional", description: "the amount to be funded on the card after creation", defaultValue: "0" },
    { parameter: "useBillingDetails", type: "string", required: "mandatory", description: "this determines if the default or client billing details will be used to create the card", defaultValue: "default" },
    { parameter: "address", type: "string", required: "conditional", description: "cardholder address. only supplied when useBillingDetails is true", defaultValue: "" },
    { parameter: "city", type: "string", required: "conditional", description: "cardholder city. only supplied when useBillingDetails is true", defaultValue: "" },
    { parameter: "state", type: "string", required: "conditional", description: "cardholder state. only supplied when useBillingDetails is true", defaultValue: "" },
    { parameter: "country", type: "string", required: "conditional", description: "cardholder country in ISO-2 format e.g. US, NE etc. only supplied when useBillingDetails is true", defaultValue: "" },
    { parameter: "zipCode", type: "number", required: "conditional", description: "cardholder zipCode. only supplied when useBillingDetails is true", defaultValue: "" },
    { parameter: "callbackUrl", type: "string", required: "optional", description: "This is the callback url where the status of the request will be sent to. If absent, the system will default to the global callback set for the merchant", defaultValue: "" },
    { parameter: "limit", type: "number", required: "optional", description: "the spend limit to be set on the card. Maximum allowed value is 5000", defaultValue: "3000" }
];

export const basicResponseParams = [
    { parameter: "responseCode", type: "string", description: "the response code of the operation. this indicates that the request was submitted successfully" },
    { parameter: "responseDescription", type: "string", description: "the description of the response code" },
    { parameter: "responseMessage", type: "", description: "" },
    { parameter: "reference", type: "string", description: "the system generated transaction id for that request" }
];

export const fundWithdrawRequestParams = [
    { parameter: "cardId", type: "string", required: "mandatory", description: "the unique id of the card to be funded", defaultValue: "" },
    { parameter: "amount", type: "string", required: "mandatory", description: "the amount to be funded on the card", defaultValue: "" },
    { parameter: "orderId", type: "string", required: "mandatory", description: "uniquely generated reference from merchant", defaultValue: "" },
    { parameter: "callbackUrl", type: "string", required: "optional", description: "This is the callback url where the status of the request will be sent to. If absent, the system will default to the global callback set for the merchant", defaultValue: "" }
];

export const cardDetailsResponseParams = [
    { parameter: "responseCode", type: "string", description: "the response code of the operation. this indicates that the request was submitted successfully", example: "" },
    { parameter: "responseDescription", type: "string", description: "the description of the response code", example: "" },
    { parameter: "responseMessage", type: "", description: "", example: "" },
    { parameter: "data", type: "Object", description: "this object contains the details of the card", example: "" },
    { parameter: "data.cardId", type: "string", description: "the card id", example: "" },
    { parameter: "data.merchantId", type: "string", description: "the merchant id owning the card", example: "" },
    { parameter: "data.maskedPan", type: "string", description: "the masked pan of the card", example: "" },
    { parameter: "data.expiryDisplay", type: "string", description: "the card expiry details", example: "" },
    { parameter: "data.cardScheme", type: "string", description: "the card scheme", example: "Mastercard, Visa" },
    { parameter: "data.dateCreated", type: "datetime", description: "the date card was created", example: "" },
    { parameter: "data.currency", type: "string", description: "the card currency", example: "" },
    { parameter: "data.clientOrderId", type: "string", description: "the uniquely generated reference from merchant", example: "" },
    { parameter: "data.displayName", type: "string", description: "the cardholder fullname", example: "" },
    { parameter: "data.firstName", type: "string", description: "the cardholder firstname", example: "" },
    { parameter: "data.lastName", type: "string", description: "the cardholder lastname", example: "" },
    { parameter: "data.address", type: "string", description: "the cardholder address", example: "" },
    { parameter: "data.city", type: "string", description: "the cardholder city", example: "" },
    { parameter: "data.state", type: "string", description: "the cardholder state", example: "" },
    { parameter: "data.zipCode", type: "number", description: "the cardholder zip code", example: "" },
    { parameter: "data.country", type: "string", description: "the cardholder country", example: "" }
];

export const cardProfileStatusResponseParams = [
    { parameter: "responseCode", type: "string", description: "the response code of the operation. this indicates that the request was submitted successfully", supportedValues: "" },
    { parameter: "responseDescription", type: "string", description: "the description of the response code", supportedValues: "" },
    { parameter: "responseMessage", type: "", description: "", supportedValues: "" },
    { parameter: "data", type: "Object", description: "this object contains the details of the card", supportedValues: "" },
    { parameter: "data.cardId", type: "string", description: "the card id", supportedValues: "" },
    { parameter: "data.cardholderName", type: "string", description: "the cardholder name", supportedValues: "" },
    { parameter: "data.active", type: "boolean", description: "this tell us whether the card is active or not", supportedValues: "" },
    { parameter: "data.cardProfileStatus", type: "string", description: "the actual card status", supportedValues: "ACTIVE, INACTIVE, TERMINATED" },
    { parameter: "data.deactivationDate", type: "datetime", description: "the date time a card was terminated", supportedValues: "" }
];

export const cardTransactionResponseParams = [
    { parameter: "responseCode", type: "string", description: "the response code of the operation. this indicates that the request was submitted successfully", example: "" },
    { parameter: "responseDescription", type: "string", description: "the description of the response code", example: "" },
    { parameter: "responseMessage", type: "", description: "", example: "" },
    { parameter: "data", type: "Object", description: "this object contains the details of the card", example: "" },
    { parameter: "data.transactionId", type: "string", description: "the transaction id", example: "" },
    { parameter: "data.cardId", type: "string", description: "the card id", example: "" },
    { parameter: "data.merchantId", type: "string", description: "the merchant id owning the card", example: "" },
    { parameter: "data.narration", type: "string", description: "the transaction narration", example: "" },
    { parameter: "data.amount", type: "decimal", description: "the transaction amount", example: "" },
    { parameter: "data.authorizationStatus", type: "string", description: "the transaction authorization status", example: "SUCCESSFUL, TERMINATED, PENDING, FAILED, NO_RESPONSE, UNKNOWN_RESPONSE" },
    { parameter: "data.authorizationMessage", type: "string", description: "the transaction authorization message", example: "" },
    { parameter: "data.authorizationCode", type: "string", description: "the transaction authorization code", example: "Mastercard, Visa" },
    { parameter: "data.dateCreated", type: "datetime", description: "the date transaction occured", example: "" },
    { parameter: "data.currency", type: "string", description: "the transaction currency", example: "" },
    { parameter: "data.transMode", type: "string", description: "the transaction mode", example: "DEBIT, CREDIT" },
    { parameter: "data.clientOrderId", type: "string", description: "the uniquely generated reference from merchant", example: "" },
    { parameter: "data.cardAcceptorName", type: "string", description: "the card acceptor name", example: "" },
    { parameter: "data.cardAcceptorCity", type: "string", description: "the card acceptor city", example: "" },
    { parameter: "data.cardAcceptorCountry", type: "string", description: "the card acceptor country", example: "" }
];

export const cardListResponseParams = [
    { parameter: "responseCode", type: "string", description: "the response code of the operation. this indicates that the request was submitted successfully", example: "" },
    { parameter: "responseDescription", type: "string", description: "the description of the response code", example: "" },
    { parameter: "responseMessage", type: "", description: "", example: "" },
    { parameter: "count", type: "number", description: "the number of results returned", example: "" },
    { parameter: "data", type: "Array", description: "this object contains the list of card and their details", example: "" },
    { parameter: "data.cardId", type: "string", description: "the card id", example: "" },
    { parameter: "data.merchantId", type: "string", description: "the merchant id owning the card", example: "" },
    { parameter: "data.maskedPan", type: "string", description: "the masked pan of the card", example: "" },
    { parameter: "data.expiryDisplay", type: "string", description: "the card expiry details", example: "" },
    { parameter: "data.cardScheme", type: "string", description: "the card scheme", example: "Mastercard, Visa" },
    { parameter: "data.dateCreated", type: "datetime", description: "the date card was created", example: "" },
    { parameter: "data.currency", type: "string", description: "the card currency", example: "" },
    { parameter: "data.clientOrderId", type: "string", description: "the uniquely generated reference from merchant", example: "" },
    { parameter: "data.displayName", type: "string", description: "the cardholder fullname", example: "" },
    { parameter: "data.firstName", type: "string", description: "the cardholder firstname", example: "" },
    { parameter: "data.lastName", type: "string", description: "the cardholder lastname", example: "" },
    { parameter: "data.address", type: "string", description: "the cardholder address", example: "" },
    { parameter: "data.city", type: "string", description: "the cardholder city", example: "" },
    { parameter: "data.state", type: "string", description: "the cardholder state", example: "" },
    { parameter: "data.zipCode", type: "number", description: "the cardholder zip code", example: "" },
    { parameter: "data.country", type: "string", description: "the cardholder country", example: "" }
];

export const cardEventCallbackParams = [
    { parameter: "eventType", type: "string", required: "mandatory", description: "this states the type of event", example: "VIRTUAL_CARD_FUNDING, VIRTUAL_CARD_WITHDRAWAL, VIRTUAL_CARD_CREATION, VIRTUAL_CARD_AUTHORIZATION, VIRTUAL_CARD_REVERSAL, VIRTUAL_CARD_REFUND, VIRTUAL_CARD_DECLINE, VIRTUAL_CARD_TERMINATION" },
    { parameter: "eventId", type: "string", required: "mandatory", description: "a unique id to identify the callback", example: "" },
    { parameter: "amount", type: "decimal", required: "mandatory", description: "the transaction amount", example: "" },
    { parameter: "merchantCity", type: "string", required: "mandatory", description: "the card acceptor city", example: "" },
    { parameter: "merchantName", type: "string", required: "mandatory", description: "the card acceptor name", example: "" },
    { parameter: "merchantCountry", type: "string", required: "mandatory", description: "the card acceptor country", example: "" },
    { parameter: "merchantState", type: "string", required: "mandatory", description: "the card acceptor state", example: "" },
    { parameter: "cardId", type: "string", required: "mandatory", description: "the card id", example: "" },
    { parameter: "transactionId", type: "string", required: "mandatory", description: "the unique id of the transaction", example: "" },
    { parameter: "transactionMode", type: "string", required: "conditional", description: "this indicates whether it is a debit or credit transaction. only available for all except card creation", example: "debit, credit" },
    { parameter: "mcc", type: "string", required: "conditional", description: "the merchant category code. only available for all except card creation", example: "" },
    { parameter: "transactionType", type: "string", required: "mandatory", description: "the transaction type", example: "card_creation, funding, withdrawal, authorization, reversal, refund, decline" },
    { parameter: "cardScheme", type: "string", required: "", description: "the card scheme", example: "Mastercard, Visa" },
    { parameter: "currency", type: "string", required: "mandatory", description: "the card currency", example: "USD" },
    { parameter: "orderId", type: "string", required: "mandatory", description: "the uniquely generated reference from merchant", example: "" },
    { parameter: "cardCreationStatus", type: "string", required: "conditional", description: "the status of card creation process. available only for card_creation transaction type", example: "approved, declined" },
    { parameter: "cardFundStatus", type: "string", required: "conditional", description: "the status of the card funding process. available only for funding transaction type", example: "approved, declined" },
    { parameter: "cardWithdrawalStatus", type: "string", required: "conditional", description: "the status of the card withdrawal process. available only for withdrawal transaction type", example: "approved, declined" },
    { parameter: "cardAuthorizationStatus", type: "string", required: "conditional", description: "the status of the card authorization purchase. available only for authorization transaction type", example: "approved, declined" },
    { parameter: "cardReversalStatus", type: "string", required: "conditional", description: "the status of the card authorization purchase. available only for reversal transaction type", example: "reversed, declined" },
    { parameter: "cardRefundStatus", type: "string", required: "conditional", description: "the status of the card authorization purchase. available only for refund transaction type", example: "refunded, declined" },
    { parameter: "cardDeclineStatus", type: "string", required: "conditional", description: "the status of the card authorization purchase. available only for decline transaction type", example: "declined" },
    { parameter: "responseMessage", type: "string", required: "mandatory", description: "the response message", example: "" }
];

export const webhookParameterDescription = [
    { parameter: "transactionId", type: "string", required: "mandatory", description: "The transaction id" },
    { parameter: "eventId", type: "string", required: "mandatory", description: "The id of the webhook event" },
    { parameter: "eventType", type: "string", required: "mandatory", description: "the type of webhook event" },
    { parameter: "currency", type: "string", required: "mandatory", description: "the transaction currency" },
    { parameter: "transactionType", type: "string", required: "conditional", description: "the transaction type e.g. card_creation, funding, withdrawal, authorization, refund, reveresal, decline. Not available for card termination" },
    { parameter: "cardId", type: "string", required: "mandatory", description: "The card performing the event" },
    { parameter: "orderId", type: "string", required: "mandatory", description: "uniquely generated reference from merchant" },
    { parameter: "amount", type: "decimal", required: "mandatory", description: "the amount" },
    { parameter: "cardScheme", type: "string", required: "conditional", description: "the card scheme" },
    { parameter: "responseMessage", type: "string", required: "conditional", description: "the response message of the transaction" },
    { parameter: "merchantCountry", type: "string", required: "conditional", description: "the merchant country. Not available for card termination" },
    { parameter: "merchantCity", type: "string", required: "optional", description: "the merchant city" },
    { parameter: "mcc", type: "string", required: "conditional", description: "the merchant category code. Not available for card_creation, funding, withdrawal" },
    { parameter: "isPassthrough", type: "boolean", required: "conditional", description: "this indicataes that a decline fee was charged. only available for card declines" },
    { parameter: "isCrossborder", type: "boolean", required: "conditional", description: "this indicataes whetehr the transaction is a crossborder transaction. Available for authorization and reversal events" }
];