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

export interface CommandResult {
    status: number;
    card: Uint8Array;
    data?: Uint8Array; // 16 bytes
}

interface RfidResponse {
    length: Uint8Array; // 1 byte
    command: Uint8Array; // 1 byte
    data: Uint8Array; // n bytes
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


    static processDataArray(input: Uint8Array): Uint8Array {
        const output: number[] = [];

        for (let i = 0; i < input.length; i++) {
            if (input[i] === 0x7F) {
                output.push(0x7F);
            }
            output.push(input[i]);
        }

        return new Uint8Array(output);
    }


    static removeExtra(input: Uint8Array): Uint8Array {
        const output: number[] = [];

        for (let i = 0; i < input.length; i++) {
            output.push(input[i]);
            if (input[i] === 0x7F && input[i + 1] === 0x7F) {
                i++; // skip the next 0x7F
                continue;
            }
        }

        return new Uint8Array(output);
    }

    static hexStringToUint8Array(hexString: string) {
        if (hexString.length % 2 !== 0) {
            console.error('Invalid hexString');
            return new Uint8Array(0);
        }
        const arrayBuffer = new Uint8Array(hexString.length / 2);
    
        for (let i = 0; i < hexString.length; i += 2) {
            arrayBuffer[i / 2] = Number('0x' + hexString.substr(i, 2));
        }
    
        return arrayBuffer;
    }

    static createCommand(cmd: number, data: Uint8Array): Uint8Array {
        const length = 2 + data.length; // 2 for command length and command itself
        const command = new Uint8Array(length + 2); // 2 for command header and checksum
        command[0] = this.COMMAND_HEADER;
        command[1] = length;
        command[2] = cmd;
        if (data.length > 0)
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
        return this.createCommand(0x10, new Uint8Array(0));
    }

    static preProcessResponse(response: Uint8Array): RfidResponse {
        // TODO: deal with 7F
        // remove the command header
        const responseWithoutHeader = response.slice(1);
    
        // remove the checksum
        const finalResponse = responseWithoutHeader.slice(0, responseWithoutHeader.length - 1);
    
        const rifdResponse : RfidResponse = {
            length: finalResponse.slice(0, 1),
            command: finalResponse.slice(1, 2),
            data: finalResponse.slice(2),
        }
    
        return rifdResponse;
    }

    // Parse the response from the RFID module
    static parseResponse(response: RfidResponse): CommandResult {
        const data = response.data;
    
        const result: CommandResult = {
            status: new DataView(data.slice(0, 1).buffer).getUint32(0),
            card: data.slice(3, 8),
            data: data.slice(8),
        };

        return result;
    }
}

