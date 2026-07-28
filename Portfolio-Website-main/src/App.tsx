import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const AllProjects = lazy(() => import("./components/AllProjects"));
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  return (
    <>
      <LoadingProvider>
        <Suspense>
          <Routes>
            <Route
              path="/"
              element={
                <MainContainer>
                  <Suspense>
                    <CharacterModel />
                  </Suspense>
                </MainContainer>
              }
            />
            <Route path="/projects" element={<AllProjects />} />
          </Routes>
        </Suspense>
      </LoadingProvider>
    </>
  );
};

export default App;
