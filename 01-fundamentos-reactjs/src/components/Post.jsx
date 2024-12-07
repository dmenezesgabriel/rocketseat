import { Comment } from "./Comment";
import styles from "./Post.module.css";

export function Post() {
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <img
            className={styles.avatar}
            src="https://github.com/dmenezesgabriel.png"
            alt=""
          />
          <div className={styles.authorInfo}>
            <strong>Gabriel Menezes</strong>
            <span>Web Developer</span>
          </div>
        </div>

        <time title="11 de Maio as 08:13h" dateTime="2022-05-11 08:12:00">
          Publicado ha 1h
        </time>
      </header>

      <div className={styles.content}>
        <p>Fala Galera 👋</p>
        <p>
          Acabei de subir mais um projeto no meu portfolio. E um projeto que fiz
          no NLW Return, evento da Rocketseat.
        </p>
        <p>
          <a href="#">site.com/projeto</a>
        </p>
        <p>
          <a href="">#novoprojeto</a>
          <a href="">#nlw</a>
          <a href="">#rocketseat</a>
        </p>
      </div>

      <form className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea placeholder="Deixe um comentário" />
        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>
      <div className={styles.commentList}>
        <Comment />
        <Comment />
        <Comment />
      </div>
    </article>
  );
}
