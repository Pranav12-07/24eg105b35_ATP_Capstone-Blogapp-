import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/authStore";
import { toast } from "react-hot-toast";
import { API_BASE_URL } from "../api";

import {
  articleCardClass,
  articleTitle,
  articleExcerpt,
  articleMeta,
  ghostBtn,
  deleteBtn,
  loadingClass,
  errorClass,
  emptyStateClass,
  articleStatusActive,
  articleStatusDeleted,
} from "../styles/common";

function AuthorArticles() {
  const navigate = useNavigate();
  const user = useAuth((state) => state.currentUser);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const getAuthorArticles = async () => {
      try {
        setLoading(true);
        //read articles of current author
        let res = await axios.get(`${API_BASE_URL}/author-api/articles`, { withCredentials: true });
        if (res.status === 200) {
          setArticles(res.data.payload);
        }
        //update articles state
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.error || "Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };

    getAuthorArticles();
  }, [user]);

  const openArticle = (article) => {
    navigate(`/article/${article._id}`, {
      state: article,
    });
  };

  const toggleArticleStatus = async (article) => {
    const newStatus = !article.isArticleActive;
    const confirmMsg = newStatus ? "Restore this article?" : "Delete this article?";

    if (!window.confirm(confirmMsg)) return;

    try {
      const res = await axios.patch(
        `${API_BASE_URL}/author-api/articles`,
        { articleId: article._id, isArticleActive: newStatus },
        { withCredentials: true },
      );

      setArticles((prevArticles) =>
        prevArticles.map((item) => (item._id === article._id ? res.data.payload : item)),
      );
      toast.success(newStatus ? "Article restored" : "Article deleted");
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to update article");
    }
  };

  if (loading) return <p className={loadingClass}>Loading articles...</p>;
  if (error) return <p className={errorClass}>{error}</p>;

  if (articles.length === 0) {
    return <div className={emptyStateClass}>You haven't published any articles yet.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {articles.map((article) => (
        <div key={article._id} className={`${articleCardClass} relative flex flex-col`}>
          {/* Status Badge */}
          <span className={article.isArticleActive ? articleStatusActive : articleStatusDeleted}>
            {article.isArticleActive ? "ACTIVE" : "DELETED"}
          </span>

          <div className="flex flex-col gap-2">
            <p className={articleMeta}>{article.category}</p>

            <p className={articleTitle}>{article.title}</p>

            <p className={articleExcerpt}>{article.content.slice(0, 60)}...</p>
          </div>

          <button className={`${ghostBtn} mt-auto pt-4`} onClick={() => openArticle(article)}>
            Read Article
          </button>

          <button className={`${deleteBtn} mt-3 w-fit`} onClick={() => toggleArticleStatus(article)}>
            {article.isArticleActive ? "Delete" : "Restore"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default AuthorArticles;
