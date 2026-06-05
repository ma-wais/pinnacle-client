export type UserRole = "user" | "admin";
export type VerificationStatus = "unverified" | "verified";
export type AccountType = "individual" | "business";

export type User = {
  _id: string;
  email: string;
  role: UserRole;
  accountId: string;
  verificationStatus: VerificationStatus;
};

export type Profile = {
  accountType?: AccountType;
  firstName?: string;
  lastName?: string;
  fullName: string;
  phone?: string;
  addressLine1?: string;
  city?: string;
  postcode?: string;
  businessName?: string;
  bankName?: string;
  sortCode?: string;
  bankAccountNumber?: string;
};

export type DocumentType = "all" | "id" | "proof_of_address" | "business_doc";
export type DocumentSubtype =
  | "passport"
  | "driving_licence"
  | "utility_bill"
  | "bank_statement";
export type DocumentStatus = "pending" | "approved" | "rejected";

export type Document = {
  _id: string;
  userId: string;
  type: DocumentType;
  subtype?: DocumentSubtype;
  originalName: string;
  storageName: string;
  mimeType: string;
  size: number;
  status: DocumentStatus;
  cloudinaryUrl?: string;
  uploadedAt: string;
};

export type Complaint = {
  _id: string;
  userId: {
    _id: string;
    email: string;
    profile?: Profile;
  };
  subject: string;
  message: string;
  status: "pending" | "resolved";
  createdAt: string;
  updatedAt: string;
};
