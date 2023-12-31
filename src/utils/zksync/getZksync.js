import { getBalances, getLite, getTransfers, getTxs } from './getData';

export default async function getZksync(address, ethPrice) {
  try {
    const txs = await getTxs(address, ethPrice);
    const { bridgeTo, bridgeFrom, volume } = await getTransfers(address, ethPrice);
    const { balances, total } = await getBalances(address, ethPrice);
    const lite = await getLite(address, ethPrice);
    return {
      ETH: balances.ETH || 0,
      WETH: balances.WETH || 0,
      USDC: balances.USDC || 0,
      USDT: balances.USDT || 0,
      totalBalance: total,
      txCount: txs.txCount,
      totalFee: txs.totalFee,
      mwd: txs.mwd,
      bridgeFrom,
      bridgeTo,
      volume,
      uniqueContracts: txs.uniqueContracts,
      transactions: txs.transactions,
      witm: txs.witm,
      protocols: txs.protocols,
      lite: { isActive: lite.txs || lite.balance, balance: lite.balance, txCount: lite.txs },
      result: true,
    };
  } catch (e) {
    return {
      balances: { ETH: '-' },
      txCount: '-',
      totalFee: 0,
      totalBalance: 0,
      mwd: '-',
      bridgeFrom: '-',
      bridgeTo: '-',
      volume: 0,
      transactions: [],
      witm: '-',
      protocols: {},
      lite: { isActive: false },
      result: false,
    };
  }
}
