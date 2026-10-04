import { skipToken } from "@reduxjs/toolkit/query";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { usePayPalOneTimePaymentSession } from "@paypal/react-paypal-js/sdk-v6";
import { LuLoaderCircle } from "react-icons/lu";
import { toast } from "sonner";

import OrderDetails from "./order-details";

import {
  useGetOrderDetailsQuery,
  useCreatePayPalOrderMutation,
  useCaptureOrderMutation,
} from "@/features/orders/model/api";
import { resolvePayPalOrderId } from "@/features/orders/model/paypal";

const OrderPage = () => {
  const { id: orderId } = useParams();
  const navigate = useNavigate();

  const { data: order, isLoading } = useGetOrderDetailsQuery(
    orderId ?? skipToken,
  );

  const [createPayPalOrder, { isLoading: isCreating }] =
    useCreatePayPalOrderMutation();
  const [capturePayPalOrder, { isLoading: isCapturing }] =
    useCaptureOrderMutation();

  const { isPending, error, handleClick } = usePayPalOneTimePaymentSession({
    createOrder: async () => {
      if (!orderId) {
        throw new Error("Order ID is missing");
      }

      const response = await createPayPalOrder(orderId).unwrap();
      const paypalOrderId = resolvePayPalOrderId(response);

      return { orderId: paypalOrderId };
    },

    onApprove: async (data) => {
      if (!orderId) return;

      await capturePayPalOrder({
        shopOrderId: orderId,
        paypalOrderId: data.orderId,
      }).unwrap();

      navigate("/");
      toast.success(`Order #${orderId} successfully payed`);
    },

    onError: (err) => {
      console.error("PayPal payment error:", err);
      toast.error("Cannot complete the payment");
    },
  });

  if (isLoading || isCreating || isCapturing) {
    return <LuLoaderCircle size={50} className="mx-auto" />;
  }

  if (!order) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <OrderDetails
        order={order}
        isPending={isPending}
        handleClick={handleClick}
        error={error}
      />
    </>
  );
};

export default OrderPage;
