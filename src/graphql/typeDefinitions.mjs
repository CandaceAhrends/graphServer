export const typeDefs = `#graphql
  
  type Detail {
    cik: String
    name: String
    type: String
    market: String
    ticker: String
    active: Boolean
    description: String
    locale: String
    stuff: [MoreStuff]
    address: Address
    branding: Branding
    primary_exchange: String
  } 
  type MoreStuff{
    item: String!
  }
  type Address{
    city: String
    state: String
    address1: String
  }
  type Branding{
    icon_url: String
    logo_Url: String
  }
  type Stock{
    ticker: String
  }
  type Date{
    date: String
  }

  type DayVolume{
    volume: String
    date: String
    ticker: String
  }
   
  type Query {
    details: [Detail]
    detailsByTicker(ticker: String): [Detail]
    availableStocks: [Stock]
    availableDates: [Date]
    volumeByDate(date: String): [DayVolume]
  }
`;
