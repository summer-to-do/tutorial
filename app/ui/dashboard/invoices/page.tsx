import Pagination from '@/app/ui/dashboard/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/dashboard/invoices/table';
import { CreateInvoice } from '@/app/ui/dashboard/invoices/buttons';
import { lusitana } from '@/app/ui/font';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/data';

export default async function Page(props: {
  // searchParams 是一个可选的 Promise 对象，用于异步获取搜索参数
  searchParams?: Promise<{
    // query 是搜索查询字符串
    query?: string;
    // page 是当前页数
    page?: string;
  }>;
}) {
  // 等待 searchParams 的 Promise 对象 resolve
  const searchParams = await props.searchParams;
  // 如果 searchParams 中有 query，则使用它，否则默认为空字符串
  const query = searchParams?.query || '';
  // 如果 searchParams 中有 page，则将其转换为数字，否则默认为 1
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
       <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}