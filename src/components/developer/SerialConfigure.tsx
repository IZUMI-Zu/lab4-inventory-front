import { Button, Input } from "@nextui-org/react";
import { useSerial } from "../../utils/SerialProvider";

export const SerialConfigure = () => {
    const { connect, disconnect, portState } = useSerial();

    return (
        <>
            <div className="grid grid-cols-4 min-w-full m-0">
                <Input
                    label="Current Port State"
                    value={portState}
                    isReadOnly
                    className="col-start-1 col-end-3 max-w-x p-6 pt-2 ml-1"
                >
                </Input>
                <Button
                    color="primary"
                    isDisabled={portState !== "closed"}
                    onClick={connect}
                    size="sm"
                    className="col-start-3 max-w-x m-6 p-7 mt-2"
                >
                    Connect
                </Button>
                <Button
                    onClick={disconnect}
                    isDisabled={portState !== "open"}
                    size="sm"
                    color="warning"
                    className=" col-start-4 max-w-x m-6 p-7 mt-2"
                >
                    Disconnect
                </Button>
            </div>
        </>);
}
