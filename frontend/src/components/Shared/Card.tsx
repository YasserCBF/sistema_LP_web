import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  title?: string;
}

const Card = ({ children, title }: CardProps) => {
  return (
    <div className={styles.card}>
      {title && <h3 className={styles.title}>{title}</h3>}
      {children}
    </div>
  );
};

export default Card;