// import Form from "./components/Form";
import Splash from "./pages/Splash";
import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Bio from "./pages/Bio";
import Messages from "./pages/Messages";
import Posts from "./pages/Posts";
import Spaces from "./pages/Spaces";
import Test from "./pages/Test";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./wallets/appKit";

function App() {
  return (
    <div className="mx-auto max-w-xl bg-black pb-20 min-h-screen">
      <Routes>
        <Route path="/main" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="bio" element={<Bio />} />
          <Route path="messages" element={<Messages />} />
          <Route path="posts" element={<Posts />} />
          <Route path="spaces" element={<Spaces />} />
          <Route path="test" element={<Test />} />
        </Route>
        <Route path="/" element={<Splash />} />
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

export default AppWrapper;
