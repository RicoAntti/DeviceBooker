module Models {
    export class Device {
        constructor() { }
        Id: number;
        Name: string;
        IsBorrow: boolean;
        BorrowResId: number;
        Description: string;
        DeviceGroupId: number;
        DeviceGroup: Models.DeviceGroup;
    }

    export class DeviceGroup {
        constructor() { }
        Id: number;
        GroupName: string;
    }

    export class Reservation {
        constructor() { }
        Id: number;
        Title: string;
        StartTime: Date;
        EndTime: Date;
        DeviceId: number;
        Device: Models.Device;
    }

    export class ReservationData {
        Reservation: Models.Reservation;
        DeviceName: string;
        DeviceId: number;
        GroupName: string;
        IsBorrow: boolean;
        BorrowResId: number;
    }
}