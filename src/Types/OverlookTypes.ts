export interface ICustomerData {
    id: number;
    name: string
}

export interface IBookingData {
    id: string;
    userID: number;
    date: string;
    roomNumber: number
}

export interface IRoomData {
    number: number;
    roomType: string;
    bidet: boolean;
    bedSize: string;
    numBeds: number;
    costPerNight: number
}