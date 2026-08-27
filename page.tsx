

import type { Metadata } from 'next';
import { SettingsPageContent } from '@/components/content/settings-page-content';

const pageTitle = 'My Account | MirbInvestments';
const pageDescription = 'Manage your profile, funds, and security settings. Deposit or withdraw funds, change your password, and view your account details.';
const canonicalUrl = '/settings';

export const metadata: Metadata = {
      title: pageTitle,
      description: pageDescription,
      robots: {
        index: false,
        follow: false,
      },
      alternates: { canonical: canonicalUrl },
      openGraph: { title: pageTitle, description: pageDescription, url: canonicalUrl },
      twitter: { title: pageTitle, description: pageDescription },
};

// Default export is the page, which now renders the client content
export default function SettingsPage() {
  return <SettingsPageContent />;
}
