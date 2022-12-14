class Good {
    constructor (id, name, description, sizes, price, available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }

    setAvailable(available) {
        this.available = available;
    }
}

class GoodsList {
    #goods;

    constructor (goods, filter, sortPrice, sortDir) {
        this.#goods = goods;
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }

    get goods() {
        return this.#goods;
    }

    get list() {
        var res = this.#goods;

        if (this.filter != '') {
            res = res.filter(good => this.filter.test(good.name));
        }

        if (this.sortPrice) {
            res = res.sort((p1, p2) => this.sortDir ? (p1.price - p2.price) : (p2.price - p1.price));
        }

        return res;
    }

    add(good) {
        this.#goods.push(good)
    }

    remove(id) {
        this.#goods.splice(this.goods.findIndex(item => item.id == id), 1)    
    }
}

class BasketGood extends Good {
    constructor (good, amount) {
        super(good.id, good.name, good.description, good.sizes, good.price, good.available);
        this.amount = amount;
    }
}

class Basket {
    constructor (goods) {
        this.goods = goods;
    }

    get totalAmount() {
        return this.goods.reduce((sum, good) => sum + good.amount, 0);
    }

    get totalSum() {
        return this.goods.reduce((sum, good) => sum + good.amount*good.price, 0);
    }

    add(good, amount) {
        var index = this.goods.findIndex(item => item.id == good.id)

        if (index !=-1) {
            this.goods[index].amount += amount;
        } else {
            this.goods.push(new BasketGood(good, amount));
        }
    } 
    
    remove(good, amount) {
        var index = this.goods.findIndex(item => item.id == good.id)

        if (index !=-1) {
            this.goods[index].amount -= amount;
            
            if (this.goods[index].amount <= 0) {
                this.goods.splice(index, 1)
            }
        }
    }

    clear() {
        this.goods = []
    }

    removeUnavailable() {
        this.goods = this.goods.filter(good => good.available == true)
    }
}

var good1 = new Good(1, 'Кроссовки', 'Кроссовки синие', [43, 44, 45], 5400, true);
var good2 = new Good(2, 'Футболка', 'Футболка для бега', [23, 24, 25], 1300, true);
var good3 = new Good(3, 'Шуба', 'Шуба дуба', [20, 22], 124000, true); 
var good4 = new Good(4, 'Брюки', 'Брюки', [20, 22, 25], 3400, true);
var good5 = new Good(5, 'Джинцы', 'Джинцы', [20, 22, 21], 4100, true);

good1.setAvailable(false);

var goodList = new GoodsList([good1, good2, good3, good4, good5], /а/i, true, false);

console.log(goodList.list);

goodList.add(new Good(6, 'Шорты', 'Шорты', [10, 11], 1700, true));
console.log(goodList.goods);

goodList.remove(3);
console.log(goodList.goods);

backetGoodList = [new BasketGood(good1, 4), new BasketGood(good3, 7), new BasketGood(good5, 3)];

basket = new Basket(backetGoodList);
console.log(basket);
console.log(basket.totalAmount);
console.log(basket.totalSum);

basket.add(good2, 8);
basket.add(good1, 2);
console.log(basket);

basket.remove(good1, 3);
basket.remove(good3, 7);
console.log(basket);

basket.removeUnavailable();
console.log(basket);

