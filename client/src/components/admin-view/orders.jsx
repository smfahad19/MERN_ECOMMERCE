import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import AdminOrderDetailsView from "./order-details";

const ordersData = [
    { id: "123456", date: "27/06/2024", status: "In Process", price: "$1000" },
    { id: "789012", date: "28/06/2024", status: "Shipped", price: "$2000" },
    { id: "345678", date: "29/06/2024", status: "Delivered", price: "$1500" },
];

function AdminOrdersView() {
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orders, setOrders] = useState(ordersData);

    const handleOpenDialog = (order) => {
        setSelectedOrder(order);
        setOpenDetailsDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDetailsDialog(false);
    };

    const handleUpdateStatus = (orderId, newStatus) => {
        const updatedOrders = orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders); // Update the orders state

        // If the dialog is open for the updated order, also update selectedOrder
        if (selectedOrder?.id === orderId) {
            setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>All Orders</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Order Date</TableHead>
                            <TableHead>Order Status</TableHead>
                            <TableHead>Order Price</TableHead>
                            <TableHead>
                                <span className="sr-only">Details</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell>{order.status}</TableCell>
                                <TableCell>{order.price}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleOpenDialog(order)} className="bg-blue-500 text-white">
                                        View Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>

            {selectedOrder && (
                <Dialog open={openDetailsDialog} onOpenChange={handleCloseDialog}>
                    <AdminOrderDetailsView
                        order={selectedOrder}
                        onUpdateStatus={handleUpdateStatus}
                        onClose={handleCloseDialog}
                    />
                </Dialog>
            )}
        </Card>
    );
}

export default AdminOrdersView;
