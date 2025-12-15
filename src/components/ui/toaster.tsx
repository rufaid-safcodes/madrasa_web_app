'use client'

import { Toast } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <div className="fixed top-0 z-[100] flex flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col">
      <>
      {toasts.map(({ id, title, description, action, ...props }) => {
        return (
          <Toast
            key={id}
            className="mb-2"
            {...props}
          >
            <div className="grid gap-1">
              {title && <div className="font-semibold">{title}</div>}
              {description && (
                <div className="text-sm opacity-90">{description}</div>
              )}
            </div>
            {action}
          </Toast>
        )
      })}
      </>
    </div>
  )
}
