import Loading from "@/components/Loading"
import { Suspense } from "react"

export const NoticeLayout = ({
  children,
  list,
}: {
  children: React.ReactNode,
  list: React.ReactNode,
}
) => {
  return (
    <div className="flex flex-col container mx-auto max-w-5xl items-center gap-4 p-2">
      <div className="flex flex-col md:flex-row md:justify-between items-end gap-4 w-full">
        {children}
      </div>
      <div className="w-full bg-gray-50 p-4 rounded-lg">
        <Suspense fallback={<Loading />}>
          {list}
        </Suspense>
      </div>
    </div>
  )
}
export default NoticeLayout