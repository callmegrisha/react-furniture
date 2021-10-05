import styles from './PageTitle.module.scss';

function PageTitle(props) {
  return (
    <div className={styles.pageHeader}>
      <div className="container">
        <h1>{props.title}</h1>
      </div>
    </div>
  );
}

export { PageTitle };
