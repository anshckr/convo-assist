'use client';

import { Button, IconButton } from '@/app/material-tailwind';
import { Customer } from '@/app/shared/types/customers';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { cloneDeepWith } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { DefaultValues, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { CustomerSchema, TCustomerSchema } from './customerSchema';
interface Props {
  action: (data: Customer) => Promise<any>;
  defaultValues?: DefaultValues<Customer> | null;
  formActionText: string;
}

const BaseForm: React.FC<Props> = ({
  action,
  formActionText,
  defaultValues,
}) => {
  const formOptions = useMemo(() => {
    const baseOptions = {
      resolver: zodResolver(CustomerSchema),
    };

    if (defaultValues) {
      return {
        ...baseOptions,
        defaultValues: {
          ...defaultValues,
          contacts: defaultValues.contacts!.map((contact) => {
            return { value: contact };
          }),
        },
      };
    }

    return baseOptions;
  }, [defaultValues]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isPerformingAction },
    setFocus,
    control,
  } = useForm<TCustomerSchema>(formOptions);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'contacts',
  });

  const router = useRouter();

  const formActionOnSubmit = async (data: TCustomerSchema) => {
    try {
      const trimmedData = cloneDeepWith(data, (val) =>
        typeof val === 'string' ? val.trim() : undefined,
      );

      if (trimmedData.contacts) {
        trimmedData.contacts = trimmedData.contacts.map(
          (tnObj: { value: string }) => {
            return tnObj.value;
          },
        );
      }

      const result = await action(trimmedData);

      if (result.error) {
        toast.error(result.message);

        console.error('Error', result.error);

        return;
      }

      toast.success(result.message);

      router.push('/customers');
    } catch (error) {
      toast.error(`An Error Occured: ${(error as Error).message}`);
    }
  };

  useEffect(() => {
    // set focus on name field
    setFocus('name');
  }, [setFocus]);

  return (
    <form
      onSubmit={handleSubmit(formActionOnSubmit)}
      className="flex w-full flex-1 flex-col overflow-auto"
    >
      <div className="flex-1 overflow-auto rounded-md bg-gray-50 p-4 md:p-6">
        <input
          {...register('id')}
          id="id"
          name="id"
          type="text"
          hidden
          defaultValue={defaultValues?.id || uuidv4()}
        />
        {/* Customer */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 text-sm font-medium">
            Customer Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                {...register('name')}
                id="name"
                name="name"
                type="text"
                placeholder="Enter Customer Name"
                className="peer rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-error"
              />
            </div>
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {errors.name && (
              <p className="mt-2 text-sm text-red-500">
                {`${errors.name.message}`}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col text-sm font-medium">
          <div className="mb-1">
            Contacts
            <Button
              color="green"
              size="sm"
              onClick={() =>
                append(
                  { value: '' },
                  {
                    focusName: `contacts.${fields.length}.value`,
                  },
                )
              }
              className="mt-4 flex items-center justify-center"
            >
              <PlusIcon className="mr-1 h-4 w-4" />
              Add Contact
            </Button>
          </div>
          <ul>
            {fields.map((item, index) => (
              <li key={item.id} className="mt-3">
                <div className="flex w-3/4 items-center justify-center">
                  <input
                    {...register(`contacts.${index}.value`)}
                    className="first-letter:peer w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
                  />

                  <IconButton
                    variant="text"
                    onClick={() => remove(index)}
                    size="sm"
                    color="red"
                    className="ml-2"
                  >
                    <TrashIcon className="w-4" />
                  </IconButton>
                </div>

                <div
                  id={`contacts.${index}-error`}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {/* @ts-ignore */}
                  {errors.contacts?.[index] && (
                    <p className="mt-2 text-sm text-red-500">
                      {/* @ts-ignore */}
                      {`${errors.contacts?.[index]?.value.message}`}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/customers"
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
