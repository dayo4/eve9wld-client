import { $Notify, $LSAgent } from '@/plugins'

export class Cart {

    list: Array<object> = $LSAgent.getData('lcartstore') || []
    cart_total: number = $LSAgent.getData('lcartstoretotal') ? $LSAgent.getData('lcartstoretotal').total : 0

    private setCart () {
        this.list = $LSAgent.getData('lcartstore') || []
        if (this.list.length > 0)
        {
            let total = 0
            this.list.forEach((item: any) => {
                total += parseInt(item.sale_price)
            })
            $LSAgent.setData({ total }, 'lcartstoretotal', { ifExist: 'replace' })
            this.cart_total = $LSAgent.getData('lcartstoretotal').total
        }
        else
            this.cart_total = 0
    }

    add (product: {
        id: number,
        name: string,
        on_sale: boolean,
        regular_price: number,
        sale_price: number,
        slug: string,
        short_description: string,
        images: Array<object>
        /* custom */
        final_price?: number
    }) {
        const Q = $LSAgent.getData('lcartstore')
        if (Q)
        {
            const exists = Q.some(x => {
                return x.id === product.id
            })
            if (exists)
            {
                $Notify.info('This item is already in your cart')
            }
            else
            {
                Q.push(product)
                $LSAgent.setData(Q, 'lcartstore', { ifExist: 'replace' })

                this.setCart()

                $Notify.info('Added to cart')
            }
        }
        else
        {
            $LSAgent.setData([ product ], 'lcartstore')
            this.setCart()

            $Notify.info('Added to cart')
        }

    }

    update () {

    }

    remove (id: number/* id of the product */) {
        const Q = $LSAgent.getData('lcartstore')
        if (Q)
        {
            for (let i of Q)
            {
                if (i.id === id)
                {
                    Q.splice(Q.indexOf(i), 1)
                    $LSAgent.setData(Q, 'lcartstore', { ifExist: 'replace' })
                    this.setCart()
                }
            }

            $Notify.info('Item removed from cart')
        }
    }

    clear () {
        const Q = $LSAgent.getData('lcartstore')
        if (Q)
        {
            $LSAgent.deleteDataKey('lcartstore')
            $LSAgent.deleteDataKey('lcartstoretotal')
            this.setCart()

            $Notify.info('Your Cart is Cleared!')
        }
    }
}
