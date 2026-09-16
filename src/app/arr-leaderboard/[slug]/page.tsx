import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrProfilePage } from "@/components/arr/ArrProfilePage";
import { getArrProfile, getArrProfileSlugs } from "@/lib/arr/profiles";

export async function generateStaticParams() {
  return getArrProfileSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const profile = getArrProfile(slug);
  if (!profile) {
    return {
      title: "Company Not Found — ARR Leaderboard",
      robots: { index: false },
    };
  }
  return {
    title: profile.metaTitle,
    description: profile.metaDescription,
    alternates: { canonical: profile.canonical },
    openGraph: {
      type: "article",
      title: profile.metaTitle,
      description: profile.ogDescription,
      url: profile.canonical,
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function ArrSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = getArrProfile(slug);
  if (!profile) notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: profile.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const datasetJsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `${profile.name} ARR milestone timeline`,
    description: `Publicly reported annual recurring revenue milestones for ${profile.name}.`,
    creator: { "@type": "Organization", name: "Clink" },
    url: profile.canonical,
  };

  return (
    <>
      <ArrProfilePage profile={profile} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd) }}
      />
    </>
  );
}
