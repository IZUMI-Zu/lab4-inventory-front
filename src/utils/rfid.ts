export interface Key {
    keyType: 'A' | 'B';
    value: Uint8Array; // 6 bytes
}

export interface Block {
    address: number;
    data?: Uint8Array; // 16 bytes
}

export interface Sector {
    number: number;
    key: Key;
}

export interface Card {
    type: number;
    id: Uint8Array; // 4 bytes
}

export interface CommandResult {
    status: number;
    card?: Card;
    data?: Uint8Array; // 16 bytes
}

export class RfidCommand {
    static COMMAND_HEADER = 0x7F;

    static checkSum(data: Uint8Array, offset: number, length: number): number {
        let temp = 0;
        for (let i = offset; i < length + offset; i++) {
            temp ^= data[i];
        }
        return temp;
    }

    static createCommand(cmd: number, data: Uint8Array): Uint8Array {
        const length = 2 + data.length; // 2 for command length and command itself
        const command = new Uint8Array(length + 3); // 3 for command header, length and checksum
        command[0] = this.COMMAND_HEADER;
        command[1] = length;
        command[2] = cmd;
        command.set(data, 3);
        command[command.length - 1] = this.checkSum(command, 1, length);
        return command;
    }

    static verifyKey(sector: Sector): Uint8Array {
        const data = new Uint8Array(1 + sector.key.value.length);
        data[0] = sector.number;
        data.set(sector.key.value, 1);
        return this.createCommand(sector.key.keyType === 'A' ? 0x05 : 0x06, data);
    }

    static readBlock(block: Block, key: Key): Uint8Array {
        const data = new Uint8Array(1 + key.value.length);
        data[0] = block.address;
        data.set(key.value, 1);
        return this.createCommand(key.keyType === 'A' ? 0x14 : 0x15, data);
    }

    static writeBlock(block: Block, key: Key): Uint8Array {
        if (!block.data) {
            throw new Error('Block data is required for write command.');
        }
        const data = new Uint8Array(1 + key.value.length + block.data.length);
        data[0] = block.address;
        data.set(key.value, 1);
        data.set(block.data, 1 + key.value.length);
        return this.createCommand(0x15, data);
    }

    static store(block: Block): Uint8Array {
        const data = new Uint8Array(1);
        data[0] = block.address;
        return this.createCommand(0x0B, data);
    }

    static readCard(): Uint8Array {
        return this.createCommand(0x01, new Uint8Array(0));
    }

    // Parse the response from the RFID module
    static parseResponse(response: Uint8Array): CommandResult {
        const result: CommandResult = {
            status: response[0],
        };

        if (result.status === 0x00) {
            result.card = {
                type: (response[1] << 8) | response[2],
                id: response.slice(3, 7),
            };
            if (response.length > 7) {
                result.data = response.slice(7);
            }
        }

        return result;
    }
}

