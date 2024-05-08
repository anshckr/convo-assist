'use client';

import { Button, Select, Option, IconButton } from '@/app/material-tailwind';
import {
  Conversation,
  ConversationStatus,
  Sender,
} from '@/app/shared/types/conversations';
import { zodResolver } from '@hookform/resolvers/zod';
import { cloneDeepWith } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef } from 'react';
import { DefaultValues, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ConversationSchema } from './conversationSchema';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
interface Props {
  action: (data: Conversation) => Promise<any>;
  defaultValues?: DefaultValues<Conversation> | null;
  formActionText: string;
}

const BaseForm: React.FC<Props> = ({
  action,
  formActionText,
  defaultValues,
}) => {
  const formOptions = useMemo(() => {
    const baseOptions = {
      resolver: zodResolver(ConversationSchema),
    };

    if (defaultValues) {
      return { ...baseOptions, defaultValues };
    }

    return baseOptions;
  }, [defaultValues]);

  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors, isSubmitting: isPerformingAction },
    watch,
    setValue,
    clearErrors,
    getValues,
    setFocus,
    control,
  } = useForm<Conversation>(formOptions);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'messages',
  });

  const router = useRouter();

  const statusValue = getValues('status');

  const conversationActionOnSubmit = async (data: Conversation) => {
    try {
      const trimmedData = cloneDeepWith(data, (val) =>
        typeof val === 'string' ? val.trim() : undefined,
      );

      const result = await action(trimmedData);

      if (result.error) {
        toast.error(result.message);

        console.error('Error', result.error);

        return;
      }

      toast.success(result.message);

      router.push('/');
    } catch (error) {
      toast.error(`An Error Occured: ${(error as Error).message}`);
    }
  };

  useEffect(() => {
    // set focus on customer field
    setFocus('customer');
  }, [setFocus]);

  return (
    <form
      onSubmit={handleSubmit(conversationActionOnSubmit)}
      className="flex w-full flex-1 flex-col overflow-auto"
    >
      <div className="flex-1 overflow-auto rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 text-sm font-medium">
            Customer Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                {...register('customer')}
                id="customer"
                name="customer"
                type="text"
                placeholder="Enter Customer Name"
                className="peer rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="customer-error"
              />
            </div>
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {errors.customer && (
              <p className="mt-2 text-sm text-red-500">
                {`${errors.customer.message}`}
              </p>
            )}
          </div>
        </div>

        {/* Conversation URI */}
        <div className="mb-4">
          <div className="relative mt-2 rounded-md">
            <div className="relative w-40">
              <Select
                label="Select Status"
                {...register('status')}
                id="status"
                name="status"
                aria-describedby="status-error"
                value={statusValue}
                onChange={(val) =>
                  setValue('status', val as ConversationStatus)
                }
              >
                <Option value="open">Open</Option>
                <Option value="pending">Pending</Option>
                <Option value="closed">Closed</Option>
              </Select>
            </div>
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {errors.status && (
              <p className="mt-2 text-sm text-red-500">
                {`${errors.status.message}`}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col text-sm font-medium">
          <div className="mb-1">
            Messages
            <Button
              color="green"
              size="sm"
              onClick={() =>
                append(
                  {
                    content: '',
                    sentAt: '',
                    sender: Sender.AGENT,
                  },
                  {
                    focusName: `messages.${fields.length}.content`,
                  },
                )
              }
              className="mt-4 flex items-center justify-center"
            >
              <PlusIcon className="mr-1 h-4 w-4" />
              Add Message
            </Button>
          </div>
          <ul id="messages-list">
            {fields.map((item, index) => (
              <li
                key={item.id}
                className="flex w-full items-start gap-2 rounded-md bg-gray-50 p-4"
              >
                <div className="flex flex-1">
                  {/* Content */}
                  <div className="flex w-full flex-col">
                    <div className="relative rounded-md">
                      <input
                        type="text"
                        {...register(`messages.${index}.content`)}
                        id={`messages.${index}.content`}
                        name={`messages.${index}.content`}
                        placeholder="Enter Content"
                        className="peer w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500"
                        aria-describedby="content-error"
                      />
                    </div>

                    <div
                      id="content-error"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {errors.messages?.[`${index}`]?.content && (
                        <p className="mt-2 text-sm text-red-500">
                          {`${errors.messages?.[`${index}`]?.content?.message}`}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-1">
                  {/* sentAt */}
                  <div className="flex w-full flex-col">
                    <div className="relative rounded-md">
                      <input
                        type="text"
                        {...register(`messages.${index}.sentAt`)}
                        id={`messages.${index}.sentAt`}
                        name={`messages.${index}.sentAt`}
                        placeholder="Enter Sent At"
                        className="peer w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500"
                        aria-describedby="sentAt-error"
                      />
                    </div>

                    <div
                      id="sentAt-error"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {errors.messages?.[`${index}`]?.sentAt && (
                        <p className="mt-2 text-sm text-red-500">
                          {`${errors.messages?.[`${index}`]?.sentAt?.message}`}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-1">
                  {/* Sender */}
                  <div className="flex w-full flex-col">
                    <div className="relative rounded-md">
                      <Select
                        label="Select Sender"
                        {...register(`messages.${index}.sender`)}
                        id={`messages.${index}.sender`}
                        name={`messages.${index}.sender`}
                        aria-describedby="sender-error"
                        value={getValues(`messages.${index}.sender`)}
                        onChange={(val) =>
                          setValue(`messages.${index}.sender`, val as Sender)
                        }
                      >
                        <Option value="agent">Agent</Option>
                        <Option value="customer">Customer</Option>
                      </Select>
                    </div>

                    <div
                      id="sender-error"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {errors.messages?.[`${index}`]?.sender && (
                        <p className="mt-2 text-sm text-red-500">
                          {`${errors.messages?.[`${index}`]?.sender?.message}`}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <IconButton
                  variant="text"
                  onClick={() => remove(index)}
                  size="sm"
                  color="red"
                  className="ml-2"
                >
                  <TrashIcon className="w-4" />
                </IconButton>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button
          type="submit"
          disabled={isPerformingAction}
          loading={isPerformingAction}
          size="sm"
          color="blue"
        >
          {formActionText}
        </Button>
      </div>
    </form>
  );
};

export default BaseForm;
