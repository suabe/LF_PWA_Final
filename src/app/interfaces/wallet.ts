export interface WalletInterface {
    uid:      string;
    activa:   boolean;
    token:    string;
    creada:   number;
    customer: string;
    card:     Card;
}

export interface Card {
    cvc_check:              string;
    country:                string;
    brand:                  string;
    tokenization_method?:   string;
    dynamic_last4?:         string;
    exp_month:              number;
    address_zip_check?:     string;
    exp_year:               number;
    funding:                string;
    three_d_secure:         string;
    address_line1_check?:   string;
    last4:                  string;
    name?:                  string;
}
