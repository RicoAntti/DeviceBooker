module Models {
    export class Device {
        constructor() { }
        Id: number;
        Name: string;
        DeviceId: number;
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
}