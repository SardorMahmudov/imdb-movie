import { create } from 'zustand';

type CartStore = {
    cart: {
        count: number;
    }[],
    count: () => number;
    add: (product: []) => void,
    remove: (idProduct: number) => void,
    removeAll: () => void
}
const localCart = JSON.parse(localStorage.getItem('cart') || '[]');

export const useCartStore = create<CartStore>((set, get) => ({
    cart: localCart,
    count: () => {
        const { cart } = get();
        if (cart.length)
            return cart.map(item => item.count).reduce((prev, curr) => prev + curr);
        return 0;
    },
    add: (product: any) => {
        const { cart } = get();
        const updatedCart = updateCart(product, cart)
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        set({ cart: updatedCart });
    },
    remove: (idProduct: number) => {
        const { cart } = get();
        const updatedCart = removeCart(idProduct, cart);
        localStorage.removeItem('cart');
        set({ cart: updatedCart });
    },
    removeAll: () => set({ cart: [] }),
}));

function updateCart(product: any, cart: any[]): any[] {
    const cartItem = { ...product, count: 1 } as any;

    const productOnCart = cart.map(item => item.id).includes(product.id);

    if (!productOnCart) cart.push(cartItem)
    else {
        return cart.map(item => {
            if (item.id === product.id)
                return { ...item, count: item.count + 1 } as any;
            return item
        })
    }
    return cart;
}

function removeCart(idProduct: number, cart: any[]): any[] {
    return cart.map(item => {
        if (item.id === idProduct)
            return { ...item, count: item.count - 1 }
        return item;
    }).filter(item => {
        return item.count;
    });
}
