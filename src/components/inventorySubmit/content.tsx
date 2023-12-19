import React, { useState, useMemo } from "react";
import { Input, Card, Button, Spinner } from "@nextui-org/react";
import EyeFilledIcon from "./EyeFilledIcon";
import EyeSlashFilledIcon from "./EyeSlashFilledIcon";
import { useForm } from "react-hook-form";
import postInventory from "../../api/postInventory";
import { readCardId } from "../../utils/rfid";

interface FormValues {
  itemNumber: string;
  itemName: string;
  warehouseNumber: string;
  shelfNumber: string;
  storageTime: string;
}

export const Content = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();

  const [keyPassword, setKeyPassword] = useState<string>("");

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmit(true);
      console.log(data);
      console.log(keyPassword);
      await postInventory(data, await readCardId(), true);
      setIsSubmit(false);
    } catch (error) {
      console.error(error);
      setIsSubmit(false);
    }
  };

  const handleReset = () => {
    reset({
      itemNumber: "",
      itemName: "",
      warehouseNumber: "",
      shelfNumber: "",
      storageTime: "",
    });
    setKeyPassword("");
  };

  const isInvalid = useMemo(() => {
    return !!errors.storageTime;
  }, [errors.storageTime]);


  return (
    <div className="h-full p-12 pt-3 w-full">
      <div className="flex flex-col justify-center w-full py-5 px-4 lg:px-0 max-w-[90rem] mx-auto gap-3">
        <div className="flex  flex-wrap justify-between">
          <h3 className="text-center text-xl font-semibold">Add Inventory</h3>
        </div>
        <div className="gap-2">
          <Card className="grid grid-cols-3 min-w-full mt-5">
            <h3 className="text-2xl font-semibold p-6 pl-8">Inventory Info</h3>
            <Input
              {...register("itemNumber", { required: true })}
              label="Item Number"
              defaultValue=""
              description="Enter the item number"
              className="col-start-1 max-w-x p-6"
            />
            <Input
              {...register("itemName", { required: true })}
              label="Item Name"
              defaultValue=""
              description="Enter the item name"
              className="max-w-x p-6"
            />
            <Input
              {...register("warehouseNumber", { required: true })}
              label="Warehouse Number"
              defaultValue=""
              description="Enter the warehouse number"
              className="max-w-x p-6"
            />
            <Input
              {...register("shelfNumber", { required: true })}
              label="Shelf Number"
              defaultValue=""
              description="Enter the shelf number"
              className="max-w-x p-6"
            />
            <Input
              {...register("storageTime", { required: true, pattern: /^\d{4}-\d{2}-\d{2}$/ })}
              label="Storage Time"
              isInvalid={isInvalid}
              errorMessage={isInvalid && "Please enter a valid time like YYYY-MM-DD"}
              defaultValue=""
              description="Enter the storage time (Input should be YYYY-MM-DD)"
              className="max-w-x p-6"
            />
            <h3 className="text-xl font-semibold p-8">
              {isSubmit ? (
                <>
                  <Spinner /> <span className="text-xl p-2 m-2">Submitting...</span>
                </>
              ) : null}
            </h3>
          </Card>
          <Card className="grid grid-cols-3 min-w-full mt-5">
            <Input
              label="Password"
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
            <Button color="default" onClick={handleSubmit(onSubmit)} className="max-w-x m-7 p-7 pt-6">
              Submit
            </Button>
            <Button color="default" onClick={handleReset} className="max-w-x m-7 p-7 pt-6">
              Reset
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
