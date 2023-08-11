export interface CoverageArea {
    type: string
    coordinates: number[][][][]
}

export interface Address {
    type: string
    coordinates: number[]
}

export interface Partner {
    id: number, 
    tradingName: string,
    ownerName: string,
    document: string,
    coverageArea: CoverageArea
    address: Address
}

