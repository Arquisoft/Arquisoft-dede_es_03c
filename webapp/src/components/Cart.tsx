import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import CartItem from "../components/CartItem";
import { Product } from '../shared/shareddtypes';
import { Navigate } from "react-router-dom";
import { LangContext } from '../lang';

type CartProps = {
    setOpen: (open: string) => void
    setAmount: (amount: string) => void
    cartItems: Product[];
}

const Cart: React.FC<CartProps> = (props: CartProps) => {
    const { dispatch: { translate } } = useContext(LangContext);

    //const cartItems: Product[] = JSON.parse(localStorage.getItem("cart")!);

    const calculateSubTotal = (items: Product[]) => {
        return items.reduce((ack: number, item) => ack + (item.amount * item.price), 0)
    }

    const calculateTotal = (items: Product[]) => {
        return items.reduce((ack: number, item) => ack + (item.amount * item.price * 1.21), 0)
    }

    return (
        <div>
            <h2 aria-label="cartTitle">{translate('cart.title')}</h2>
            {props.cartItems.length === 0 ? <p>{translate('cart.empty')}</p> : null}
            {props.cartItems.map((item: Product) =>
                <CartItem
                    key={item.name}
                    item={item}
                    setAmount={props.setAmount}
                />
            )}
            <h2>Subtotal: $ {calculateSubTotal(props.cartItems).toFixed(2)}</h2>
            <h2>{translate('cartItem.total')}: $ {calculateTotal(props.cartItems).toFixed(2)}</h2>
            <Button onClick={() => window.location.assign("/shipping") } disabled={localStorage.getItem("currentUser") === "not logged"}>{translate('cart.orderButton')}</Button>
        </div>
    )
}

export default Cart;