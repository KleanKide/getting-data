interface SEO {
    seo_title: string;
    seo_description: string;
    seo_keywords: string[];
}
export default interface Product {
    name: string;
    id?:string;
    type: string;
    description_short: string;
    description_long: string;
    code: string;
    unit: number;
    category: number;
    cashback_type: string;
    seo: SEO;
    global_category_id: number;
    marketplace_price: number;
    chatting_percent: number;
    address: string;
    latitude: number;
    longitude: number;
}