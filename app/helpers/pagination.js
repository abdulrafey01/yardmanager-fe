export const calcTotalPage = (dataLength) => {
  let maxData = 10;
  // Total Number of pages
  let totalPage = Math.ceil(dataLength / maxData);

  return { totalPage };
};
