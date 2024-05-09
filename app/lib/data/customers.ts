'use server';

import { Customer } from '@/app/shared/types/customers';
import { getCustomers } from '@/app/shared/utils/customers';
// import * as Sentry from "@sentry/nextjs";
import { unstable_noStore as noStore } from 'next/cache';

const ITEMS_PER_PAGE = 20;
export async function fetchFilteredCustomers(
  query: string,
  currentPage: number,
) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const fileCustomers = await getCustomers();

    const customers = fileCustomers
      .filter((customer: Customer) => {
        if (query) {
          return customer.name.includes(query);
        }

        return true;
      })
      .slice(offset, ITEMS_PER_PAGE);

    return customers as Customer[];
  } catch (error) {
    console.error(error);

    throw new Error('Failed to fetch Customers.');
  }
}

export async function fetchCustomersCount(query: string) {
  noStore();

  try {
    const fileCustomers = await getCustomers();

    const customersCount = fileCustomers.filter((customer: Customer) => {
      if (query) {
        return customer.name.includes(query);
      }

      return true;
    }).length;

    return Math.ceil(customersCount / ITEMS_PER_PAGE);
  } catch (error) {
    console.error(error);

    throw new Error('Failed to fetch Customers.');
  }
}

export async function fetchCustomerById(id: string) {
  noStore();

  try {
    const fileCustomers = await getCustomers();

    const customer = fileCustomers.find((customer: Customer) => {
      return customer.id === id;
    });

    return customer as Customer;
  } catch (error) {
    console.error(error);

    throw new Error('Failed to fetch Customer.');
  }
}
