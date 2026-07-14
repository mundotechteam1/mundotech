import { useState } from "react";
import MOCK_ARTICLES from "../../mockArticles";
import ArticleList from "../../components/articleList/ArticleList";

function Home() {
  const [articles] = useState(MOCK_ARTICLES);

  return (
    <ArticleList articles={articles} hasMore={true} onLoadMore={() => {}} />
  );
}

export default Home;
