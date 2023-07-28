export interface User {
    email?: string;
    code?: string;
    name?: string;
    lastName?: string;
    gender?: string;
    birthDate?: string;
    bio?: string;
    phone?: string;
    emailVerified?: boolean;
    role?: string;
    spei?: string;
    mtoken?: string;
    horario?: string;
    horario2?: string;
    idioma?: string;
    LFId?: string;
    foto?: string;
    country?: string;
    status?: string;
    csai?: string;
    creado?: number;
    timezone?: Timezone;
    lastCall?: string;
 }

 export interface Timezone {
    abbr?: string,
    group?: string,
    name?: string,
    nameValue?: string,
    timeValue?: string
 }