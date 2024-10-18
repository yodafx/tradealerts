import { Trade } from '../types/Trade';

export function parseMT4HTML(content: string): Trade[] {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const rows = doc.querySelectorAll('tr');
    const trades: Trade[] = [];

    rows.forEach((row) => {
      const cells = row.querySelectorAll('td');
      if (cells.length >= 14) {
        const trade: Trade = {
          key: cells[0].textContent?.trim() || Date.now().toString(),
          date: cells[1].textContent?.trim() || '',
          symbol: cells[4].textContent?.trim() || '',
          direction: (cells[2].textContent?.trim()?.toLowerCase() || '') as 'buy' | 'sell',
          positionSize: parseFloat(cells[3].textContent?.trim() || '0'),
          entryPrice: parseFloat(cells[5].textContent?.trim() || '0'),
          exitPrice: parseFloat(cells[9].textContent?.trim() || '0'),
          stopLoss: parseFloat(cells[6].textContent?.trim() || '0'),
          takeProfit: parseFloat(cells[7].textContent?.trim() || '0'),
          profit: parseFloat(cells[13].textContent?.trim() || '0'),
          commission: parseFloat(cells[10].textContent?.trim() || '0'),
          swap: parseFloat(cells[12].textContent?.trim() || '0'),
          netProfit: 0, // Will be calculated later
          status: 'Unknown' // Will be set later
        };

        trade.netProfit = trade.profit - trade.commission - trade.swap;
        trade.status = trade.netProfit >= 0 ? 'Win' : 'Loss';

        if (trade.direction === 'buy' || trade.direction === 'sell') {
          trades.push(trade);
        }
      }
    });

    if (trades.length === 0) {
      throw new Error('No valid trades found in the HTML file');
    }

    return trades;
  } catch (error) {
    console.error('Error parsing MT4 HTML:', error);
    throw new Error('Failed to parse MT4 HTML file: ' + (error instanceof Error ? error.message : 'Unknown error'));
  }
}