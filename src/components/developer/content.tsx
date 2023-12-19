import React, { } from "react";
import { Card } from "@nextui-org/react"
import { SerialConfigure } from "./SerialConfigure";
import { SerialDebug } from "./SerialDebug";

export const Content = () => {

    return (
        <div className="h-full p-12 pt-3 w-full">
            <div className="flex flex-col justify-center w-full py-5 px-4 lg:px-0 max-w-[90rem] mx-auto gap-3">
                <div className="flex flex-wrap justify-between">
                    <h3 className="text-center text-xl font-semibold">Serial Configure</h3>
                </div>
                <div className="gap-2">
                    <Card className=" min-w-full mt-5">
                        <h3 className="text-2xl font-semibold p-3 pt-5 pl-8">Serial Configure</h3>
                        <SerialConfigure />
                    </Card>
                    <Card className="grid grid-cols-3 min-w-full mt-3">
                        <h3 className="text-2xl font-semibold p-6 pl-8">Serial Debug</h3>
                        <SerialDebug />
                    </Card>
                </div>
            </div>
        </div>
    );
};
