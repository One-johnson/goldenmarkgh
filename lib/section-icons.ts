import type { LucideIcon } from "lucide-react";
import {
  Award,
  BadgeCheck,
  CircleDollarSign,
  FileCheck,
  FileText,
  Handshake,
  Layers,
  Leaf,
  Lightbulb,
  Scale,
  Shield,
  TrendingUp,
  Truck,
  UserCheck,
  Wallet,
} from "lucide-react";

type IconMatcher = {
  test: (title: string) => boolean;
  icon: LucideIcon;
};

function resolveIcon(
  title: string,
  matchers: IconMatcher[],
  fallbacks: LucideIcon[],
  index: number,
): LucideIcon {
  const normalized = title.toLowerCase();

  for (const matcher of matchers) {
    if (matcher.test(normalized)) {
      return matcher.icon;
    }
  }

  return fallbacks[index % fallbacks.length];
}

const PROCESS_MATCHERS: IconMatcher[] = [
  { test: (t) => t.includes("verification") || t.includes("supplier"), icon: UserCheck },
  { test: (t) => t.includes("documentation") || t.includes("presentation"), icon: FileText },
  { test: (t) => t.includes("weigh") || t.includes("assay"), icon: Scale },
  { test: (t) => t.includes("pricing"), icon: CircleDollarSign },
  { test: (t) => t.includes("payment") || t.includes("purchase"), icon: Wallet },
  { test: (t) => t.includes("transaction"), icon: FileCheck },
  { test: (t) => t.includes("transport") || t.includes("handling"), icon: Truck },
  { test: (t) => t.includes("aggregat") || t.includes("supply"), icon: Layers },
];

const PROCESS_FALLBACKS: LucideIcon[] = [
  UserCheck,
  FileText,
  Scale,
  CircleDollarSign,
  Wallet,
  FileCheck,
  Truck,
  Layers,
];

const VALUE_MATCHERS: IconMatcher[] = [
  { test: (t) => t.includes("integrity"), icon: Shield },
  { test: (t) => t.includes("excellence"), icon: Award },
  { test: (t) => t.includes("trust"), icon: Handshake },
  { test: (t) => t.includes("responsible") || t.includes("sourcing"), icon: Leaf },
  { test: (t) => t.includes("compliance"), icon: BadgeCheck },
  { test: (t) => t.includes("innovation"), icon: Lightbulb },
  {
    test: (t) => t.includes("sustainable") || t.includes("growth"),
    icon: TrendingUp,
  },
];

const VALUE_FALLBACKS: LucideIcon[] = [
  Shield,
  Award,
  Handshake,
  Leaf,
  BadgeCheck,
  Lightbulb,
  TrendingUp,
];

export function resolveProcessIcon(title: string, index: number): LucideIcon {
  return resolveIcon(title, PROCESS_MATCHERS, PROCESS_FALLBACKS, index);
}

export function resolveValueIcon(title: string, index: number): LucideIcon {
  return resolveIcon(title, VALUE_MATCHERS, VALUE_FALLBACKS, index);
}
