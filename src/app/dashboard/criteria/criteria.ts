export interface Response {
    numFound: number;
    start: number;
    docs: any[];
}

export interface FacetCounts {
    facet_fields: any;
}

export interface Criteria {
    response: Response;
    facet_counts: FacetCounts;
}
