import React, { useState, useMemo, useEffect } from "react";
import { Input, Card, Button, Select, SelectItem } from "@nextui-org/react";
import EyeFilledIcon from "./EyeFilledIcon";
import EyeSlashFilledIcon from "./EyeSlashFilledIcon";
import { RfidCommand } from "../../utils/rfid";
import { SerialContext } from "../../utils/SerialProvider";

interface FormValues {
  itemNumber: string;
  itemName: string;
  warehouseNumber: string;
  shelfNumber: string;
  storageTime: string;
  isInStock: boolean;
}

export const Content = () => {

  const { send, subscribe } = React.useContext(SerialContext);

  const [toReceive, setToReceive] = useState<boolean>(false);

  const [formValues, setFormValues] = useState<FormValues>({
    itemNumber: "",
    itemName: "",
    warehouseNumber: "",
    shelfNumber: "",
    storageTime: "",
    isInStock: true,
  });

  const [keyPassword, setKeyPassword] = useState<string>("");

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const [isReadOnly, setIsReadOnly] = useState<boolean>(true);

  const [cardId, setCardId] = useState<string>("");

  const onSubmit = async () => {
    setIsReadOnly(true);
    setCardId("");
    setFormValues({
      itemNumber: "",
      itemName: "",
      warehouseNumber: "",
      shelfNumber: "",
      storageTime: "",
      isInStock: false,
    });
  };

  const isInvalid = useMemo(() => {
    if (formValues.storageTime === "") return false;
    // YYYY-MM-DD
    const pattern = /^\d{4}-\d{2}-\d{2}$/;
    return pattern.test(formValues.storageTime) ? false : true;
  }, [formValues.storageTime]);

  const stockOptions = [
    { value: "true", label: "In Stock" },
    { value: "false", label: "Out of Stock" },
  ];

  useEffect(() => {
    // todo
    const unsubscribe = subscribe((message) => {
      if (toReceive) {
        // convert message to buffer
        const res = message.value;
        const buffer = new Uint8Array(res.length);
        for (let i = 0; i < res.length; i++) {
          // buffer[i] = res.charCodeAt(i);
        }
        const view = new DataView(buffer.buffer);
        
        const state = view.getUint8(0); // 获取状态
        const cardType = view.getUint8(1); // 获取卡类型
        const cardNumber = view.getUint32(2); // 获取卡号，假设卡号是32位的
        console.log(state, cardType, cardNumber);

        setCardId(cardNumber.toString());

        // 获取数据，假设数据是从第6个字节开始，长度为16个字节的字符串
        const dataBuffer = buffer.slice(6, 22); // 提取数据部分
        const decoder = new TextDecoder('utf-8');
        const data = decoder.decode(dataBuffer); // 解码字符串
        const fields = data.split(';');
        setFormValues({
          itemNumber: fields[0],
          itemName: fields[1],
          warehouseNumber: fields[2],
          shelfNumber: fields[3],
          storageTime: "2023-01-01",
          isInStock: true,
        });
      }
    });
    return unsubscribe;
  }, [subscribe, toReceive]);

  const useOnReadCard = () => {
    setIsReadOnly(false);
    send(RfidCommand.readCard())
    setToReceive(true);
  }

  return (
    <div className="h-full p-12 pt-3 w-full">
      <div className="flex flex-col justify-center w-full py-5 px-4 lg:px-0 max-w-[90rem] mx-auto gap-3">
        <div className="flex  flex-wrap justify-between">
          <h3 className="text-center text-xl font-semibold">Update Inventory</h3>
        </div>
        <div className="gap-2">
          <Card className="grid grid-cols-3 min-w-full mt-5">
            <h3 className="text-2xl font-semibold p-6 pl-8">Inventory Info</h3>
            <Input
              isReadOnly={isReadOnly}
              label="Item Number"
              value={formValues.itemNumber}
              onChange={(e) => setFormValues({ ...formValues, itemNumber: e.target.value })}
              defaultValue=""
              description="Enter the item number"
              className="col-start-1 max-w-x p-6"
            />
            <Input
              isReadOnly={isReadOnly}
              label="Item Name"
              value={formValues.itemName}
              onChange={(e) => setFormValues({ ...formValues, itemName: e.target.value })}
              defaultValue=""
              description="Enter the item name"
              className="max-w-x p-6"
            />
            <Input
              isReadOnly={isReadOnly}
              label="Warehouse Number"
              value={formValues.warehouseNumber}
              onChange={(e) => setFormValues({ ...formValues, warehouseNumber: e.target.value })}
              defaultValue=""
              description="Enter the warehouse number"
              className="max-w-x p-6"
            />
            <Input
              isReadOnly={isReadOnly}
              label="Shelf Number"
              value={formValues.shelfNumber}
              onChange={(e) => setFormValues({ ...formValues, shelfNumber: e.target.value })}
              defaultValue=""
              description="Enter the shelf number"
              className="max-w-x p-6"
            />
            <Input
              isReadOnly={isReadOnly}
              label="Storage Time"
              value={formValues.storageTime}
              onChange={(e) => setFormValues({ ...formValues, storageTime: e.target.value })}
              isInvalid={isInvalid}
              errorMessage={isInvalid && "Please enter a valid time like YYYY-MM-DD"}
              defaultValue=""
              description="Enter the storage time (Input should be YYYY-MM-DD)"
              className="max-w-x p-6"
            />
            <Select
              label="Is In Stock"
              className="max-w-x p-6"
              description="Select whether the item is in stock or not"
              onChange={(e) => setFormValues({ ...formValues, isInStock: e.target.value === "true" })}
              selectedKeys={formValues.isInStock ? ["true"] : ["false"]}
            >
              {stockOptions.map((stock) => (
                <SelectItem key={stock.value} value={stock.value}>
                  {stock.label}
                </SelectItem>
              ))}
            </Select>
          </Card>
          <Card className="grid grid-cols-3 min-w-full mt-6">
            <Input
              isReadOnly
              label="Card Id"
              variant="flat"
              defaultValue=""
              value={cardId}
              placeholder="The card id of the card"
              className="max-w-x p-6"
            />
            <Input
              label="Password"
              isReadOnly={isReadOnly}
              variant="flat"
              isRequired
              placeholder="Enter the password of the card"
              onChange={(e) => setKeyPassword(e.target.value)}
              value={keyPassword}
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {!isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              className="max-w-x p-6"
            />
            <Button color="default" onClick={useOnReadCard} className="max-w-x m-5 mt-0 p-6 col-start-1">
              Read Card
            </Button>
            <Button color="default" onClick={onSubmit} className="max-w-x m-5 mt-0 p-6">
              Update
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
