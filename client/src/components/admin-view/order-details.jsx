import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function AdminOrderDetailsView({ order, onUpdateStatus, onClose }) {
    const [formData, setFormData] = useState({ status: order.status });

    function handleUpdateStatus(event) {
        event.preventDefault();
        onUpdateStatus(order.id, formData.status);
        onClose(); // Close the dialog after updating
    }

    return (
        <DialogContent className="sm:max-w-[600px]">
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <div className="flex mt-6 items-center justify-between">
                        <p className="font-medium">Order ID</p>
                        <Label>{order.id}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order date</p>
                        <Label>{order.date}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order Status</p>
                        <Label>{formData.status}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Order Price</p>
                        <Label>{order.price}</Label>
                    </div>
                </div>
                <Separator />
                <CommonForm
                    formControls={[
                        {
                            label: "Order Status",
                            name: "status",
                            componentType: "select",
                            options: [
                                { id: "pending", label: "Pending" },
                                { id: "inProcess", label: "In Process" },
                                { id: "inShipping", label: "In Shipping" },
                                { id: "delivered", label: "Delivered" },
                                { id: "rejected", label: "Rejected" },
                            ],
                        },
                    ]}
                    formData={formData}
                    setFormData={setFormData}
                    buttonText={"Update Order Status"}
                    onSubmit={handleUpdateStatus}
                />
            </div>
        </DialogContent>
    );
}

export default AdminOrderDetailsView;
