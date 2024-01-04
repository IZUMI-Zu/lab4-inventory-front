import { Button, Input, Textarea } from "@nextui-org/react";
import { SetStateAction, useEffect, useState } from "react";
import { useSerial } from "../../utils/SerialProvider";


export const SerialDebug = () => {
    const { subscribe, send } = useSerial();

    const [dataToSend, setSerialData] = useState<string>("");

    const [receivedData, setReceivedData] = useState<string>("");

    const clearData = () => {
        setReceivedData("");
        setSerialData("");
    }

    const sendData = () => {
        function stringToUint8Array(str: string): Uint8Array {
            const arr = str.split(' ').map(s => parseInt(s, 16));
            return new Uint8Array(arr);
        }
        send(stringToUint8Array(dataToSend));
    }

    useEffect(() => {
        const unsubscribe = subscribe((message) => {
            console.debug(message)
            const time = new Date(message.timestamp).toLocaleString();
    
            // Convert ArrayBuffer to hex array
            const hexArray = Array.from(new Uint8Array(message.value), byte => ('0' + byte.toString(16)).slice(-2));
    
            // Convert hex array to upper case
            const upperCaseHexArray = hexArray.join(' ').toUpperCase();
    
            setReceivedData("Time: " + time + "\n" + "Message: " + upperCaseHexArray);
        });
        return unsubscribe;
    }, [subscribe]);

    return (
        <>
            <div className="grid grid-cols-4 min-w-full m-0 ">
                <Textarea
                    label="Received Data"
                    value={receivedData}
                    isReadOnly
                    minRows={2}
                    className="col-start-1 col-end-3 max-w-x p-6 pt-2 ml-1"
                >
                </Textarea>
                <Input
                    label="Sent Data"
                    value={dataToSend}
                    onChange={(e: { target: { value: SetStateAction<string>; }; }) => setSerialData(e.target.value)}
                    className="col-start-1 col-end-3 max-w-x p-6 pt-2 ml-1"
                >
                </Input>
                <Button
                    color="primary"
                    onClick={sendData}
                    size="sm"
                    className="col-start-3 max-w-x m-6 p-7 mt-2"
                >
                    Sent
                </Button>
                <Button
                    color="default"
                    onClick={clearData}
                    size="sm"
                    className="col-start-4 max-w-x m-6 p-7 mt-2"
                >
                    Clear
                </Button>
            </div>
        </>);
}
