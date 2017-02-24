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
        GroupName: string;
    }
}