import { useState } from "react";

const useSetGet = () => {
  const [data, setData] = useState(null);
  const [payment, setPayment] = useState(null);
  return { data, setData, payment, setPayment };
};

export default useSetGet;
