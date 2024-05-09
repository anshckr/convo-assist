import { updateCustomer } from '@/app/lib/actions/customers';
import { Customer } from '@/app/shared/types/customers';
import BaseForm from './BaseForm';

export default function EditCustomerForm({ customer }: { customer: Customer }) {
  const updateCustomerWithId = updateCustomer.bind(null, customer.id);

  return (
    <BaseForm
      action={updateCustomerWithId}
      defaultValues={customer}
      formActionText="Edit Customer"
    />
  );
}
