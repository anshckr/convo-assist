import { createCustomer } from '@/app/lib/actions/customers';
import BaseForm from './BaseForm';

export default function CreateCustomerForm() {
  return <BaseForm action={createCustomer} formActionText="Create Customer" />;
}
