import { FC } from "react";
import _ from "lodash";

const someCalculateFunc = (value1: number, value2: number): number => {
  var result = 0;
  // 適当な計算
  for (var i = 0; i < 10000; i++) {
    result += value1 + value2;
  }

  return result;
};

const Home: FC = () => {
  const memo = _.memoize(() => someCalculateFunc(1, 10));
  return <h1>{memo()}</h1>;
};

export default Home;
