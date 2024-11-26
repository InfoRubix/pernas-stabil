"use client";

import { ReviewHistoryTable } from "@/components/solicitor/review-history-table";

export default function ReviewHistoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Review History</h1>
      </div>
      <ReviewHistoryTable />
    </div>
  );
}