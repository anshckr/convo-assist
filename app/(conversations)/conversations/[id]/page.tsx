import {
  fetchConversationById,
} from "@/app/lib/data/conversations";
import ConversationDetails from "@/app/ui/conversations";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

type MetaProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
}: MetaProps): Promise<Metadata> {
  const conversation = await fetchConversationById(params.id);

  if (!conversation) {
    notFound();
  }

  return {
    title: `Conversation - ${conversation.id}`,
  };
}

type Props = {
  children: ReactNode;
} & {
  params: { id: string };
};

async function ConversationPage({ params }: Props) {
  const conversation = await fetchConversationById(params.id);

  if (!conversation) {
    notFound();
  }

  return <ConversationDetails conversation={conversation} />;
}

export default ConversationPage;
