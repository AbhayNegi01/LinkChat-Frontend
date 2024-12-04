import { create } from "zustand"
import { axiosInstance } from "../utils/axios.js"
import toast from "react-hot-toast";
import { io } from "socket.io-client"

const base_url = import.meta.env.VITE_BACKEND_URL;

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async() => {
        // set({isCheckingAuth: true});
        try {
            const res = await axiosInstance.get("/api/v1/user/current-user");
            // console.log("check Response",res.data)
            set({authUser: res.data});
            if(res.data) {
                get().connectSocket();
            }
        } catch (error) {
            console.log("Error in checkAuth: ", error);
            set({authUser: null});
        } finally {
            set({isCheckingAuth: false});
        }
    },

    signup: async(data) => {
        set({ isSigningUp: true });
        try {
            await axiosInstance.post("/api/v1/user/signup", data);
            toast.success("Account created successfully.");
        } catch (error) {
            console.log("Error: ", error.response)
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false })
        }
    },

    login: async(data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/api/v1/user/login", data);
            // console.log("Response",res.data)
            set({ authUser: res.data });
            toast.success("Logged in Successfully.");

            if(res.data) {
                get().connectSocket();
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async() => {
        try {
            await axiosInstance.post("/api/v1/user/logout");
            set({ authUser: null });
            toast.success("Logged out successfully.")

            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async(data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.patch("/api/v1/user/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("error in update profile: ", error);
            toast.error(error.response.data.message);
        } finally {
            set({ isUpdatingProfile: false })
        }
    },

    connectSocket: async () => {
        const { authUser, socket } = get();
        if(!authUser || socket?.connected) return;

        // console.log("Auth User Id: ",authUser?.data?._id)
        const newSocket = io(base_url, {
            query: {
                userId: authUser?.data?._id,
            },
        });
        newSocket.connect();
        set({ socket: newSocket });

        newSocket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        })
    },

    disconnectSocket: async () => {
        if(get().socket?.connected) get().socket.disconnect();
    },
}))