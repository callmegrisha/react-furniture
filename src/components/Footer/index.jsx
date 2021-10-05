import styles from './Footer.module.scss';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <span>© Hryhorii Petrov - All Rights Reserved</span>
      </div>
    </footer>
  );
}

export { Footer };
