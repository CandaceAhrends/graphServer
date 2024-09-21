export const dayVolumeQuery = `
    select sd.details, dv.txn_date, dv.volume from stock_details sd inner join date_volume dv on sd.symbol = dv.symbol where dv.txn_date = ?
    `;

export const insertDayVolumeQuery = `
      INSERT INTO date_volume (symbol, volume, txn_date)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE volume = VALUES(volume); -- Handle unique key constraint
    `;
export const insertDetailsQuery = `
    INSERT INTO stock_details (symbol, details)
    VALUES (?, ?)
  `;

export const allDayVolumeQuery = "select * from date_volume";
