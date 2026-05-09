import Routes from "@/Routes.tsx";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "sonner";

const App = () => {
    return (
        <ThemeProvider defaultTheme="light" storageKey="passpoint-ui-theme">
            <AuthProvider>
                <RouterProvider router={Routes()} />
                <Toaster
                    position="top-right"
                    richColors
                    gap={8}
                    toastOptions={{
                        duration: 4000,
                        classNames: {
                            toast: 'rounded-2xl! border! shadow-2xl! text-sm! font-[Poppins]!',
                            title: 'font-semibold! text-sm!',
                            description: 'text-xs! leading-relaxed!',
                            closeButton: 'rounded-lg!',
                        },
                    }}
                />
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;
