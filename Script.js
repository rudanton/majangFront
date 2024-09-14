let currentOrder = [];

const products = {
    drinks: [
        { id: 1, name: '몬스터', price: 3000, img: 'monster.jpg' },
        { id: 2, name: '좀비', price: 3000, img: 'zombie.jpg' },
        { id: 3, name: '포카리스웨트', price: 2200, img: 'pocari.jpg' },
        { id: 4, name: '파워에이드', price: 2200, img: 'powerade.jpg' },
        { id: 5, name: '제로콜라', price: 2200, img: 'zeroCola.jpg' }
    ]
};

// 카테고리별로 상품 표시
function showCategory(category) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    products[category].forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <img src="images/${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price} 원</p>
        `;
        productItem.onclick = () => addToOrder(product);
        productsGrid.appendChild(productItem);
    });
}

// 주문 목록에 추가
function addToOrder(product) {
    const existingProduct = currentOrder.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        currentOrder.push({ ...product, quantity: 1 });
    }
    updateOrderSummary();
}

// 주문 목록 업데이트
function updateOrderSummary() {
    const orderList = document.getElementById('orderList');
    const totalPriceElement = document.getElementById('totalPrice');
    orderList.innerHTML = '';
    let totalPrice = 0;

    currentOrder.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${item.name} - ${item.price} 원 x ${item.quantity}`;
        orderList.appendChild(listItem);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = totalPrice;
}

// 주문 확인
document.getElementById('orderButton').onclick = () => {
    const totalPrice = document.getElementById('totalPrice').textContent;
    document.getElementById('popupTotalPrice').textContent = totalPrice;
    document.getElementById('orderPopup').style.display = 'block';
};

// 주문 취소
document.getElementById('cancelOrderButton').onclick = () => {
    document.getElementById('orderPopup').style.display = 'none';
};

// 주문 확인 버튼 클릭 시 주문 전송
document.getElementById('confirmOrderButton').onclick = () => {
    // 주문을 백엔드로 전송하는 부분 (API 연동 필요)
    fetch('/api/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentOrder)
    }).then(response => response.json())
      .then(data => {
          alert('주문이 완료되었습니다!');
          currentOrder = [];
          updateOrderSummary();
          document.getElementById('orderPopup').style.display = 'none';
      });
};

// 초기 카테고리 로드
showCategory('drinks');
