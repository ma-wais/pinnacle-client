export type UserRole = "user" | "admin";
export type VerificationStatus = "unverified" | "verified";

export type User = {
  _id: string;
  email: string;
  role: UserRole;
  accountId: string;
  verificationStatus: VerificationStatus;
};

export type Profile = {
  fullName: string;
  phone?: string;
  addressLine1?: string;
  city?: string;
  postcode?: string;
  businessName?: string;
};

export type DocumentType = "id" | "proof_of_address" | "business_doc" | "other";
export type DocumentStatus = "pending" | "accepted" | "rejected";

export type Document = {
  _id: string;
  userId: string;
  type: DocumentType;
  originalName: string;
  storageName: string;
  mimeType: string;
  size: number;
  status: DocumentStatus;
  uploadedAt: string;
};
