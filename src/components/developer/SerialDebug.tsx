import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { useSerial } from "../../utils/SerialProvider";


export const SerialDebug = () => {
    const { subscribe, send } = useSerial();

    const [dataToSend, setSerialData] = useState<string>("");

    const [receivedData, setReceivedData] = useState<string>("");

    const sendData = () => {
        send(dataToSend);
    }

    subscribe((message) => {
        setReceivedData(message.timestamp + " " + message.value);
    });

    return (
        <>
            <div className="grid grid-cols-4 min-w-full m-0 ">
                <Input
                    label="Received Data"
                    value={receivedData}
                    isReadOnly
                    className="col-start-1 col-end-3 max-w-x p-6 pt-2 ml-1"
                >
                </Input>
                <Input
                    label="Sent Data"
                    value={dataToSend}
                    onChange={(e) => setSerialData(e.target.value)}
                    isReadOnly
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
            </div>
        </>);
}
