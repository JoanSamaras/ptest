type OboXref = {
    database: string
    id: string
    description: string | null
    url: string | null
};

type OboSynonym = {
    name: string
    scope: string
    type: string
    xrefs: OboXref[]
};

type LinkAttributes = {
    href: string
};

export type Dictionary<T> = {
    [ key: string ]: T
};

export type TermDefinition = {
    iri: string
    label: string
    description: string[]
    annotation: {
        databaseCrossReference: string[]
        exactMatch: string[]
        id: string[]
        termEditor: string[]
    }
    synonyms: string[]
    ontologyName: string
    ontologyPrefix: string
    ontologyIri: string
    isObsolete: boolean
    termReplacedBy: string | null
    isDefiningOntology: boolean
    hasChildren: boolean
    isRoot: boolean
    shortForm: string
    oboId: string
    inSubset: string[] | null
    oboDefinitionCitation: {
        definition: string
        oboXrefs: OboXref[]
    }[]
    oboXref: OboXref[]
    oboSynonym: OboSynonym[]
    isPreferredRoot: boolean
    links: Dictionary<LinkAttributes>
};

export type OntologiesRES = {
    embedded: {
        terms: TermDefinition[]
    }
    links: Dictionary<LinkAttributes>
    page: {
        number: number
        size: number
        totalElements: number
        totalPages: number
    }
};
