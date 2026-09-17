import type { RouteRecord } from "vite-react-ssg";
import RootLayout from "./RootLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import StyleGuide from "./pages/StyleGuide";
import FontPreview from "./pages/FontPreview";
import StartProject from "./pages/StartProject";
import CasePage from "./pages/CasePage";

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Index />, entry: "src/pages/Index.tsx" },
      { path: "start-a-project", element: <StartProject />, entry: "src/pages/StartProject.tsx" },
      { path: "work/dennis-gerrits", element: <CasePage slug="dennis-gerrits" />, entry: "src/pages/CasePage.tsx" },
      { path: "work/studio-ingrid-de-reuver", element: <CasePage slug="studio-ingrid-de-reuver" />, entry: "src/pages/CasePage.tsx" },
      { path: "work/hap", element: <CasePage slug="hap" />, entry: "src/pages/CasePage.tsx" },
      { path: "work/rainforest-alliance", element: <CasePage slug="rainforest-alliance" />, entry: "src/pages/CasePage.tsx" },
      { path: "privacy", element: <PrivacyPolicy />, entry: "src/pages/PrivacyPolicy.tsx" },
      { path: "styleguide", element: <StyleGuide />, entry: "src/pages/StyleGuide.tsx" },
      // ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE
      { path: "*", element: <NotFound />, entry: "src/pages/NotFound.tsx" },
    ],
  },
];


export default routes;
