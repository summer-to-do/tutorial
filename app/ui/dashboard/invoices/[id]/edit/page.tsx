import Form from '@/app/ui/dashboard/invoices/edit-form';
import Breadcrumbs from '@/app/ui/dashboard/invoices/breadcrumbs';
import { fetchCustomers,fetchInvoiceById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `编辑发票 ${id}`,
  };
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);
  if (!invoice) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/ui/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/ui/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}