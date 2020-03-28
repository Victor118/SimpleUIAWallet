export class AssetOption {
    max_supply:string;
    market_fee_percent:number;
    max_market_fee:string;
    issuer_permissions:number;
    flags:number;
}

export class CoreExchangeRate {
    base : {amount:number,asset_id:string};
    quote: {amount:number, asset_id:string};
}

export class Asset {
    id:string;
    symbol:string;
    precision:number;
    issuer:string;
    options: AssetOption;
    core_exchange_rate:CoreExchangeRate;
    whitelist_authorities:[];
    blacklist_authorities:[];
    whitelist_markets:[];
    blacklist_markets:[];
    description:string;
    dynamic_asset_data_id:string;
}