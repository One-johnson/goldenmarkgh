export const INQUIRY_TYPES = [
  {
    value: "general",
    label: "General inquiry",
    description: "Questions about Goldenmark or how to reach us",
    department: "info",
  },
  {
    value: "trade",
    label: "Trading & sourcing",
    description: "Gold sourcing, aggregation, supply and off-take",
    department: "trade",
  },
  {
    value: "finance",
    label: "Finance & payments",
    description: "Invoices, payments and financial matters",
    department: "finance",
  },
  {
    value: "operations",
    label: "Operations & logistics",
    description: "Handling, documentation and operational coordination",
    department: "operations",
  },
  {
    value: "executive",
    label: "Executive & partnerships",
    description: "Strategic partnerships and senior leadership inquiries",
    department: "ceo",
  },
] as const;

export type InquiryType = (typeof INQUIRY_TYPES)[number]["value"];
export type DepartmentKey = (typeof INQUIRY_TYPES)[number]["department"];

export interface DepartmentEmails {
  info: string;
  trade: string;
  finance: string;
  operations: string;
  ceo: string;
}

export const DEFAULT_DEPARTMENT_EMAILS: DepartmentEmails = {
  info: "info@goldenmarkghana.com",
  trade: "trade@goldenmarkghana.com",
  finance: "finance@goldenmarkghana.com",
  operations: "operations@goldenmarkghana.com",
  ceo: "ceo@goldenmarkghana.com",
};

export function resolveInquiryType(value: string | undefined): InquiryType {
  const match = INQUIRY_TYPES.find((item) => item.value === value);
  return match?.value ?? "general";
}

export function resolveRecipientEmail(
  inquiryType: string | undefined,
  emails: Partial<DepartmentEmails> = {},
): { to: string; department: DepartmentKey; label: string } {
  const resolved = resolveInquiryType(inquiryType);
  const config = INQUIRY_TYPES.find((item) => item.value === resolved)!;
  const merged = { ...DEFAULT_DEPARTMENT_EMAILS, ...emails };

  return {
    to: merged[config.department],
    department: config.department,
    label: config.label,
  };
}
