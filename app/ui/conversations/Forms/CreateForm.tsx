import { createConversation } from "@/app/lib/actions/conversations";
import BaseForm from "./BaseForm";

export default function CreateConversationForm() {
  return (
    <BaseForm
      action={createConversation}
      formActionText="Create Conversation"
    />
  );
}
