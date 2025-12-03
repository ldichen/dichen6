/*
 * @Author: DiChen
 * @Date: 2025-12-02 03:31:20
 * @LastEditors: DiChen
 * @LastEditTime: 2025-12-02 10:57:53
 */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { I18nProvider } from "./contexts/I18nContext";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Blogs } from "./pages/Blogs";
import { Projects } from "./pages/Projects";
import { Category } from "./pages/Category";
import { CategoryDetail } from "./pages/CategoryDetail";
import { PostDetail } from "./pages/PostDetail";

function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/category" element={<Category />} />
              <Route
                path="/category/:categoryId"
                element={<CategoryDetail />}
              />
              <Route path="/post/*" element={<PostDetail />} />
            </Routes>
          </Layout>
        </Router>
      </I18nProvider>
    </ThemeProvider>
  );
}

export default App;
