import { Header } from "./components/Header";
import "./global.css";
import { Post, PostType } from "./components/Post";

import styles from "./App.module.css";
import { Sidebar } from "./components/Sidebar";

const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/dmenezesgabriel.png",
      name: "Gabriel Menezes",
      role: "Developer @Company",
    },
    content: [
      { type: "paragraph", content: "Fala Galera 👋" },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portfolio. E um projeto que fiz no NLW Return, evento da Rocketseat.",
      },
      { type: "link", content: "site.com/projeto" },
    ],
    publishedAt: new Date("2024-12-05 20:00:00"),
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/dmenezesgabriel.png",
      name: "Gabriel Menezes",
      role: "Developer @Company",
    },
    content: [
      { type: "paragraph", content: "Fala Galera 👋" },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portfolio. E um projeto que fiz no NLW Return, evento da Rocketseat.",
      },
      { type: "link", content: "site.com/projeto" },
    ],
    publishedAt: new Date("2024-12-07 20:00:00"),
  },
];

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </main>
      </div>
    </div>
  );
}
