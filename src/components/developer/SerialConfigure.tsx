import { Select } from "@nextui-org/react";
import { useSerial } from "../../utils/SerialProvider";

export const SerialConfigure = () => {
    const dataBitsOptions = [
        { value: 7, label: 7 },
        { value: 8, label: 8 }
    ];

    const stopBitsOptions = [
        { value: 1, label: 1 },
        { value: 2, label: 2 }
    ];

    const parityOptions = [
        { value: "none", label: "None" },
        { value: "even", label: "Even" },
        { value: "odd", label: "Odd" }
    ];

    const flowControlOptions = [
        { value: "none", label: "None" },
        { value: "hardware", label: "Hardware" }
    ];

    const { connect, disconnect, port } = useSerial();

    const sendData = async (data) => {
        if(!port) {
          return;
        }
      
        await port.write(data);
      }

    return (
        <>
             <button onClick={connect}>Connect</button> 
             <button onClick={disconnect}>Disconnect</button> 
             
        </>);
}
