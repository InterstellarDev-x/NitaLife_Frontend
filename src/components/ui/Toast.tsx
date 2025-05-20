import { createContext, useContext, useState, type ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"

const ToastContext = createContext<(msg: string) => void>(() => {})

export const useToast = () => useContext(ToastContext)

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(null), 3000)
  }

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <AnimatePresence>
        {message && (
          <motion.div
            className="fixed top-4 right-4 p-4 bg-red-500 text-white rounded-lg shadow-lg " 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  )
}