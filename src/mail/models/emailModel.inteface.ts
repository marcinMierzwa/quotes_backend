export interface EmailModel {
    to: string;
    subject: string;
    html: string;
    from? : string;
}