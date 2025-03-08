import { useEffect, useState } from "react";

interface Article {
  id: number;
  title: string;
  content: string;
}

function useArticle() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("/article.json");
      const data = await response.json();
      setArticles(data);
    })();
  }, []);

  return articles;
}

export type { Article };

export default useArticle;
