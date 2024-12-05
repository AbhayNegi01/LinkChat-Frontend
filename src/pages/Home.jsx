import { useChatStore } from "../store/useChatStore.js";
import { ChatContainer, NoChatSelected, Sidebar } from "../components"
import { useAuthStore } from "../store/useAuthStore.js";

const Home = () => {
  const { selectedUser } = useChatStore()
  const { authUser } = useAuthStore()

  return authUser ? (
    <div className="h-screen bg-base-200 mt-7">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-sm w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default Home