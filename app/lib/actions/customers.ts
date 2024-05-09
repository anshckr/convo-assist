'use server';

// import * as Sentry from "@sentry/nextjs";
import { Customer } from '@/app/shared/types/customers';
import { getCustomers, writeCustomers } from '@/app/shared/utils/customers';
import { revalidatePath } from 'next/cache';

export async function createCustomer(customer: Customer) {
  try {
    const fileCustomers = await getCustomers();

    fileCustomers.push(customer);

    await writeCustomers(JSON.stringify(fileCustomers, null, 2));

    revalidatePath('/customers');

    return {
      error: '',
      message: 'Successfully created customer',
    };
  } catch (error) {
    console.error(error);

    return {
      error: 'Failed to create customer',
      message: 'Failed to create customer',
    };
  }
}

export async function updateCustomer(id: string, data: Customer) {
  try {
    let fileCustomers = await getCustomers();

    fileCustomers = fileCustomers.map((customer: Customer) => {
      if (customer.id === id) {
        return {
          ...customer,
          name: data.name,
          contacts: data.contacts,
        };
      }

      return customer;
    });

    await writeCustomers(JSON.stringify(fileCustomers, null, 2));

    revalidatePath('/customers');

    return {
      error: '',
      message: 'Successfully updated customer',
    };
  } catch (error) {
    console.error(error);

    return {
      error: 'Failed to update customer',
      message: 'Failed to update customer',
    };
  }
}

export async function deleteCustomer(id: string) {
  try {
    let fileCustomers = await getCustomers();

    fileCustomers = fileCustomers.filter((customer: Customer) => {
      return customer.id !== id;
    });

    await writeCustomers(JSON.stringify(fileCustomers, null, 2));

    revalidatePath('/customers');
  } catch (error) {
    console.error(error);

    return {
      error: 'Failed to delete customer',
      message: 'Failed to delete customer',
    };
  }
}
