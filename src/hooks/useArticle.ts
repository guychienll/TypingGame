import { useEffect, useState } from 'react';

interface Article {
  id: number;
  title: string;
  content: string;
}

function useArticle(difficulty: 'easy' | 'hard') {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/${difficulty}-article.json`);
      const data = await response.json();
      setArticles(data);
    })();
  }, [difficulty]);

  return articles;
}

export type { Article };

export default useArticle;
