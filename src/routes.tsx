import type { RouteRecord } from "vite-react-ssg";
import RootLayout from "./RootLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import StyleGuide from "./pages/StyleGuide";
import HowIHelpDirections from "./pages/HowIHelpDirections";

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Index />, entry: "src/pages/Index.tsx" },
      { path: "privacy", element: <PrivacyPolicy />, entry: "src/pages/PrivacyPolicy.tsx" },
      { path: "styleguide", element: <StyleGuide />, entry: "src/pages/StyleGuide.tsx" },
      {
        path: "how-i-help-directions",
        element: <HowIHelpDirections />,
        entry: "src/pages/HowIHelpDirections.tsx",
      },
      // ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE
      { path: "*", element: <NotFound />, entry: "src/pages/NotFound.tsx" },
    ],
  },
];

export default routes;
