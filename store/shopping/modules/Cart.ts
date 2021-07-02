import { $Notify, $LSAgent } from '@/plugins'

export class Cart {

    list: Array<object> = $LSAgent.getData('lclcrtstr') || [] //cart store
    cart_total: number = $LSAgent.getData('lclcrtstrttl') ? $LSAgent.getData('lclcrtstrttl').total : 0 //cart total

    private setCart () {
        this.list = $LSAgent.getData('lclcrtstr') || []
        if (this.list.length > 0) {
            let total = 0
            this.list.forEach((item: any) => {
                total += parseInt(item.sale_price)
            })
            $LSAgent.setData({ total }, 'lclcrtstrttl', { ifExist: 'replace' })
            this.cart_total = $LSAgent.getData('lclcrtstrttl').total
        }
        else
            this.cart_total = 0
    }

    add (product: {
        id: number,
        name: string,
        on_sale: boolean,
        price: number,
        sale_price: number,
        slug: string,
        short_description: string,
        featured_image: string
        images: Array<string>
        /* custom */
        final_price?: number
    }) {
        const Q = $LSAgent.getData('lclcrtstr')
        if (Q) {
            const exists = Q.some(x => {
                return x.id === product.id
            })
            if (exists) {
                $Notify.info('This item is already in your cart')
            }
            else {
                Q.push(product)
                $LSAgent.setData(Q, 'lclcrtstr', { ifExist: 'replace' })

                this.setCart()

                $Notify.info('Added to cart')
            }
        }
        else {
            $LSAgent.setData([ product ], 'lclcrtstr')
            this.setCart()

            $Notify.info('Added to cart')
        }

    }

    update () {

    }

    remove (id: number/* id of the product */) {
        const Q = $LSAgent.getData('lclcrtstr')
        if (Q) {
            for (let i of Q) {
                if (i.id === id) {
                    Q.splice(Q.indexOf(i), 1)
                    $LSAgent.setData(Q, 'lclcrtstr', { ifExist: 'replace' })
                    this.setCart()
                }
            }

            $Notify.info('Item removed from cart')
        }
    }

    clear () {
        const Q = $LSAgent.getData('lclcrtstr')
        if (Q) {
            $LSAgent.deleteDataKey('lclcrtstr')
            $LSAgent.deleteDataKey('lclcrtstrttl')
            this.setCart()

            $Notify.info('Your Cart is Cleared!')
        }
    }
}
