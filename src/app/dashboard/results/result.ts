export interface Response {
    numFound: number;
    start: number;
    docs: any[];
}

export interface Result {
    response: Response;
}
