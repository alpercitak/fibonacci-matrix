import type { NextPage } from 'next';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

const lengthMatrix = 50;

type ICellItem = {
  value: number,
  isClicked: number
}
type ICellProps = {
  item: ICellItem,
  onClick: React.MouseEventHandler<HTMLDivElement>,
};

const Cell: React.FC<ICellProps> = ({item, onClick}) => {

  return (
    <div className={styles.cellContainer}>
      <div className={`${styles.cell}${item.isClicked ? ' ' + styles.bgYellow : ''}`} onClick={onClick}>
        {item.value} 
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  const arrData: ICellItem[] = new Array(lengthMatrix * lengthMatrix).fill({value: 0, isClicked: 0});
  const [data, setData] = useState(arrData);

  const onClick = (index: number) => {
    // update the value of colums & rows
    const newData = data.map((item, i) => {
      if (
          (i === index) || 
          (i !== index && i % lengthMatrix === index % lengthMatrix) ||
          (i !== index && Math.floor(i / lengthMatrix) === Math.floor(index / lengthMatrix))
      ) {
        return {...item, value: item.value + 1, isClicked: 1}
      }
      return item;
    });
    setData(newData);

    // revert flashing on the clicked columns & rows
    setTimeout(() => {
      const unflashData = newData.map(item => {
        return {...item, isClicked: 0};
      })
      setData(unflashData);
    }, 600);    
  };

  return (
    <div className={styles.container}>
      {data.map((item, i) => {
        return (
          <Cell item={item} key={i} onClick={() => onClick(i)}></Cell>
        )
      })}
    </div>
  );
};

export default Home;
