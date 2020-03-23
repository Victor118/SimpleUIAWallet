export interface AssetBalance {
    asset_id:string;
    asset_type:string;
    asset_name:string;
    raw_balance:number;
    balance:number;
    owner:string;
    prefix:string;
}