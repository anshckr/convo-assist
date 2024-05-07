import { updateConversation } from "@/app/lib/actions/conversations";
import { Conversation } from "@/app/shared/types/conversations";
import BaseForm from "./BaseForm";

export default function EditConversationForm({
  conversation,
}: {
  conversation: Conversation;
}) {
  const updateConversationWithId = updateConversation.bind(
    null,
    conversation.id
  );

  return (
    <BaseForm
      action={updateConversationWithId}
      defaultValues={conversation}
      formActionText="Edit Conversation"
    />
  );
}
