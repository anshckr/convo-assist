import { useSearchParams } from "next/navigation";

const useActiveConversationId = (): string | undefined => {
  const searchParams = useSearchParams();
  const activeConversationId = searchParams.get("id") as string;

  return activeConversationId;
};

export default useActiveConversationId;
