//DB_HOST=stocks.c7m2aik223yl.us-east-2.rds.amazonaws.com

CREATE DATABASE IF NOT EXISTS stocks;

USE stocks;
DROP TABLE IF EXISTS date_volume;
DROP TABLE IF EXISTS stock_details;
DROP TABLE IF EXISTS stock;


CREATE TABLE IF NOT EXISTS stock (
    symbol VARCHAR(5) PRIMARY KEY,    
    exchange VARCHAR(5) NOT NULL
); 

CREATE UNIQUE INDEX idx_symbol ON stock (symbol);

CREATE TABLE IF NOT EXISTS stock_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    symbol VARCHAR(5),  
    FOREIGN KEY (symbol) REFERENCES stock(symbol),
    details JSON
);

CREATE TABLE IF NOT EXISTS date_volume (
    id INT AUTO_INCREMENT PRIMARY KEY,
    symbol VARCHAR(5),  
    FOREIGN KEY (symbol) REFERENCES stock(symbol),
    volume DECIMAL(10, 2) NOT NULL,
    txn_date DATE NOT NULL,
    UNIQUE KEY (symbol, txn_date)
);


select * from stock 
select * from stock_details
select * from date_volume
 
select sd.details, dv.txn_date, dv.volume from stock_details sd inner join date_volume dv on sd.symbol = dv.symbol where dv.txn_date = "2023-01-09"
