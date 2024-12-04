import { Outlet } from "react-router-dom"
import { Footer, Header } from "./components"
import { useAuthStore } from "./store/useAuthStore.js"
import { useThemeStore } from "./store/useThemeStore.js"
import { useEffect } from "react"
import { LoaderCircle } from "lucide-react"
import { Toaster } from "react-hot-toast"

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()
  const { theme } = useThemeStore()

  // const { onlineUsers } = useAuthStore()
  // console.log({ onlineUsers })

  useEffect(() => {
    // console.log("checkAuth called")
    checkAuth()
  }, [checkAuth])
  
  // console.log({ authUser });

  if(isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <LoaderCircle className="size-10 animate-spin"/>
    </div>
  )
  
  return (
    <div data-theme={ theme }>
      <Header />
        <Toaster />
        <main>
          <Outlet />
        </main>
      <Footer />
    </div>
    
  )
}

export default App