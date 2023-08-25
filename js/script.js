const product = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        img: './images/products/burger-1.png',
        amount: 0,
        get totalPrice() {
            return this.price * this.amount
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        img: './images/products/burger-2.png',
        amount: 0,
        get totalPrice() {
            return this.price * this.amount
        }
    },
    cheezeburger: {
        name: 'CheezeBurger',
        price: 29000,
        img: './images/products/burger-3.png',
        amount: 0,
        get totalPrice() {
            return this.price * this.amount
        }
    },
    dburger: {
        name: 'dBurger',
        price: 24000,
        img: './images/products/burger-4.png',
        amount: 0,
        get totalPrice() {
            return this.price * this.amount
        }
    }
}
const productsBtns = document.querySelectorAll('.wrapper__list-btn'),
    basketBtn = document.querySelector('.wrapper__navbar-btn'),
    basketModel = document.querySelector('.wrapper__navbar-basket'),
    closeBasketModel = document.querySelector('.wrapper__navbar-close'),
    basketChecklist = document.querySelector('.wrapper__navbar-checklist'),
    bastketTotalPrice = document.querySelector('.wrapper__navbar-totalprice'),
    btnCard = document.querySelector('.wrapper__navbar-bottom'),
    bastketBtnCount = document.querySelector('.wrapper__navbar-count'),
    printBody = document.querySelector('.print__body'),
    printFooter = document.querySelector('.print__footer'),
    printM = document.querySelector('.print')



productsBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        plusAmount(this)
    })
});

function plusAmount(btn) {
    let parent = btn.closest('.wrapper__list-card'),
        parentId = parent.getAttribute('id')
    product[parentId].amount++
    // console.log(product[parentId].amount);
    basket()
}

function basket() {
    const productsArray = []
    for (const key in product) {
        let po = product[key]
        const productCard = document.querySelector(`#${po.name.toLowerCase()}`),
            parentIndicator = productCard.querySelector('.wrapper__list-count')
        if (po.amount) {
            productsArray.push(po)
            parentIndicator.classList.add('active')
            parentIndicator.innerHTML = po.amount
        } else {
            parentIndicator.innerHTML = 0
            parentIndicator.classList.remove('active')
        }
    }
    basketChecklist.innerHTML = ''
    for (let i = 0; i < productsArray.length; i++) {
        basketChecklist.innerHTML += cardItemBurger(productsArray[i])
    }
    const allCount = totalCountProduct()

    if (allCount) {
        bastketBtnCount.classList.add('active')
    } else {
        bastketBtnCount.classList.remove('active')
    }
    bastketBtnCount.innerHTML = allCount
    bastketTotalPrice.innerHTML = totalPriceProduct()
}

function totalCountProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].amount
    }
    return (total)
}

function totalPriceProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].totalPrice
    }
    return total.toLocaleString()
}

basketBtn.addEventListener('click', function () {
    basketModel.classList.add('active')
})
closeBasketModel.addEventListener('click', function () {
    basketModel.classList.remove('active')
})


function cardItemBurger(el) {
    const {
        name,
        totalPrice: price,
        amount,
        img
    } = el
    return `
    <div class="wrapper__navbar-product">
        <div class="wrapper__navbar-info">
            <img src="${img}" class="wrapper__navbar-productImage" alt="">
            <div class="wrapper__navbar-infoSub">
                <p class="wrapper__navbar-infoName">${name}</p>
                <p class="wrapper__navbar-infoPrice">${price.toLocaleString()}</p>
            </div>
            </div>
            <div class="wrapper__navbar-option" id='${name.toLowerCase()}_card'>
            <button class="wrapper__navbar-symbol fa-minus" data-symbol='-'>-</button>
           <output class="wrapper__navbar-amount">${amount}</output>
           <button class="wrapper__navbar-symbol fa-plus" data-symbol='+'>+</button>
        </div>
    </div>
    `
}

window.addEventListener('click', (e) => {
    const btn = e.target
    if (btn.classList.contains('wrapper__navbar-symbol')) {
        const attr = btn.getAttribute('data-symbol')
        const parent = btn.closest('.wrapper__navbar-option')
        if (parent) {
            const idProduct = parent.getAttribute('id').split('_')[0]
            if (attr == '-') product[idProduct].amount--
            else if (attr == '+') product[idProduct].amount++
            basket()
        }
    }
})


btnCard.addEventListener('click', () => {
    printBody.innerHTML = ''
    for (const key in product) {
        const {
            name,
            totalPrice,
            amount
        } = product[key]
        
        if (amount > 0) {
        printBody.innerHTML += `<div class="print__body-item">
        <p class="print__body-item_name">
            <span class="name">${name}</span>
            <span class="count">${amount}</span>
        </p>
        <p class="print__body-item_summ">${totalPrice}</p>
    </div>`
    }
    }
    printM.style.display = 'flex'
    printFooter.innerHTML = totalPriceProduct()
    window.print()
    location.reload()
})