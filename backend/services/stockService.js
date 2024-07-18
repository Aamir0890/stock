const supportedStocks = ['GOOG', 'TSLA', 'AMZN', 'META', 'NVDA'];

const getStockPrice = (ticker) => {
  return { ticker, price: (Math.random() * 1000).toFixed(2) };
};

const startStockUpdates = (io) => {
  setInterval(() => {
    supportedStocks.forEach(ticker => {
      const stockData = getStockPrice(ticker);
      io.to(ticker).emit('stockUpdate', stockData);
    });
  }, 2000);
};

module.exports = { supportedStocks, getStockPrice, startStockUpdates };
