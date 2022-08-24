import styles from '../styles/Home.module.css';

type ICellProps = {
  item: ICellItem;
  onClick: React.MouseEventHandler<HTMLDivElement>;
};

export type ICellItem = {
  value: number;
  isClicked: number;
  isFound: number;
};

export const Cell: React.FC<ICellProps> = ({ item, onClick }) => {
  let className = '';
  if (item.isFound) className = styles.bgGreen;
  if (item.isClicked) className = styles.bgYellow;

  return (
    <div className={styles.cellContainer}>
      <div className={`${styles.cell} ${className}`} onClick={onClick}>
        {item.value}
      </div>
    </div>
  );
};
