import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function ShoppingOrderDetailsView() {
    return ( 
        <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>123456</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order date</p>
            <Label>25/08/2024</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>In Proccess</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>$500</Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-4">
            <div className="font-medium">Order Details</div>
            <ul className="frid gap-3">
              <li className="flrx items-center justify-between">
                <span>Product One</span>
                <span>$100</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-4">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>John Doe</span>
              <span>Address</span>
              <span>City</span>
              <span>Pincode</span>
              <span>Phone</span>
              <span>Notes</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
     );
}

export default ShoppingOrderDetailsView;