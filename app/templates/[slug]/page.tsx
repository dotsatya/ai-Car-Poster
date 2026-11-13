import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TEMPLATES, getTemplateBySlug } from "@/data/templates";
import { TemplateDetailView } from "@/components/templates/TemplateDetailView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TEMPLATES.map((tpl) => ({
    slug: tpl.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);

  if (!template) {
    return { title: "Template Not Found — POSTER GEN" };
  }

  return {
    title: `${template.name} — POSTER GEN Atelier`,
    description: template.description,
  };
}

export default async function TemplateSinglePage({ params }: PageProps) {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);

  if (!template) {
    notFound();
  }

  return <TemplateDetailView template={template} />;
}

