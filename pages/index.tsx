import type { NextPage } from 'next';
import { useState } from 'react';
import { Cell, ICellItem } from '../components/cell';
import { isFibonacciArray, isFibonacciNumber } from '../lib/fibonacci';
import styles from '../styles/Home.module.css';

const lengthFibonacci = 5;
const lengthMatrix = 50;

const Home: NextPage = () => {
  const objData: ICellItem = { value: 0, isClicked: 0, isFound: 0 };
  const arrData: ICellItem[] = new Array(lengthMatrix * lengthMatrix).fill(objData);
  const [data, setData] = useState(arrData);

  const onClick = (index: number) => {
    // update the value of colums & rows
    const newData = data.map((item, i) => {
      if (
        i === index ||
        (i !== index && i % lengthMatrix === index % lengthMatrix) ||
        (i !== index && Math.floor(i / lengthMatrix) === Math.floor(index / lengthMatrix))
      ) {
        return { ...item, value: item.value + 1, isClicked: 1 };
      }
      return item;
    });
    setData(newData);

    const findSlices = (index: number) => {
      const arrays: ICellItem[][] = [];

      const appendArray = (start: number, end: number, increment: number) => {
        const array = [];
        for (let i = start; i < end; i += increment) {
          const item = newData[i];
          if (!item) continue;
          array.push({ index: i, item: item });
        }

        if (array.length === lengthFibonacci && array.map((x) => x.index).indexOf(index) >= 0) {
          arrays.push(array.map((x) => x.item));
          arrays.push(array.reverse().map((x) => x.item));
        }
      };

      // get the row
      const minRow = Math.floor(index / lengthMatrix) * lengthMatrix;
      const maxRow = minRow + lengthMatrix - 1;
      let currentRow = minRow;
      while (currentRow <= maxRow) {
        appendArray(currentRow, currentRow + lengthFibonacci, 1);
        currentRow++;
      }

      // get the col
      const minCol = Math.floor(index % lengthMatrix);
      const maxCol = Math.pow(lengthMatrix, 2) - lengthMatrix + minCol;
      let currentCol = minCol;

      while (currentCol <= maxCol) {
        appendArray(currentCol, currentCol + lengthMatrix * lengthFibonacci, lengthMatrix);
        currentCol += lengthMatrix;
      }

      return arrays;
    };

    newData.map((item, i) => {
      if (item.isClicked && isFibonacciNumber(item.value)) {
        const slices: ICellItem[][] = findSlices(i);
        slices.map((slice: any) => {
          if (isFibonacciArray(slice.map((x: ICellItem) => x.value))) {
            slice.map((x: ICellItem) => {
              x.value = 0;
              x.isClicked = 0;
              x.isFound = 1;
              return x;
            });
          }
        });
      }
    });

    setData(newData);

    // revert flashing on the clicked or found cells
    setTimeout(() => {
      const unflashData = newData.map((item) => {
        return { ...item, isClicked: 0, isFound: 0 };
      });
      setData(unflashData);
    }, 600);
  };

  return (
    <div className={styles.container}>
      {data.map((item, i) => {
        return <Cell item={item} key={i} onClick={() => onClick(i)}></Cell>;
      })}
    </div>
  );
};

export default Home;
