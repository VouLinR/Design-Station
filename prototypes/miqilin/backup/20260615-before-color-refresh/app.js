// 数据
const menuData = [
    {
        id: 1,
        name: "松露和牛",
        en: "Wagyu with Black Truffle",
        price: 1288,
        category: "main",
        desc: "日本A5和牛，阿尔巴白松露，48小时低温慢煮，配时蔬与红酒松露汁",
        tags: ["主厨推荐", "招牌菜"],
        image: "https://ts1.tc.mm.bing.net/th/id/R-C.5cb41018880d3f7a526408227f7ad2c4?rik=PWnj95BNjY42iQ&riu=http%3a%2f%2fwww.lovesonglu.cn%2fuploads%2fallimg%2f190417%2f1-1Z41G452413a.jpg&ehk=qUVgunRPb5%2b0vTYfrQbaukP%2bdar%2bahUlMULXq%2bFLNzo%3d&risl=&pid=ImgRaw&r=0"
    },
    {
        id: 2,
        name: "鹅肝慕斯",
        en: "Foie Gras Mousse",
        price: 388,
        category: "starter",
        desc: "法国露杰鹅肝，无花果酱，烤布里欧修面包，陈年香醋",
        tags: ["经典前菜"],
        image: "https://ts1.tc.mm.bing.net/th/id/OIP-C.oXNhLca2BRPmfll2E7qjAgHaEW?rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
        id: 3,
        name: "龙虾浓汤",
        en: "Lobster Bisque",
        price: 268,
        category: "starter",
        desc: "波士顿龙虾，干邑白兰地，藏红花奶油，香草油",
        tags: ["海鲜"],
        image: "https://ts4.tc.mm.bing.net/th/id/OIP-C.HmsZPBK01oYny6gWYJuL5AHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
        id: 4,
        name: "香煎银鳕鱼",
        en: "Pan-seared Black Cod",
        price: 588,
        category: "main",
        desc: "阿拉斯加黑鳕鱼，味噌釉，烤芦笋，柠檬黄油汁",
        tags: ["海鲜", "健康"],
        image: "https://ts1.tc.mm.bing.net/th/id/OIP-C.EOsLVYmSnDoGuActcIUcLAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
        id: 5,
        name: "巧克力熔岩蛋糕",
        en: "Chocolate Fondant",
        price: 168,
        category: "dessert",
        desc: "70%瓦罗纳黑巧克力，香草冰淇淋，覆盆子酱，金箔",
        tags: ["甜品", "经典"],
        image: "https://qnam.smzdm.com/202406/17/666fb319de08d962.jpg_e1080.jpg"
    },
    {
        id: 6,
        name: "勃艮第红酒",
        en: "Burgundy Pinot Noir",
        price: 688,
        category: "wine",
        desc: "2018年份，罗曼尼康帝酒庄，单宁柔和，果香浓郁",
        tags: ["红酒", "配餐"],
        image: "https://ts3.tc.mm.bing.net/th/id/OIP-C.yFlsMJBxvbzdIzs5LDwJ_wHaFj?rs=1&pid=ImgDetMain&o=7&rm=3"
    }
];

const quotes = [
    { text: "烹饪是一门艺术，而品尝则是一种智慧。", author: "奥古斯特·埃斯科菲耶" },
    { text: "最好的食材不需要太多修饰。", author: "乔尔·侯布匈" },
    { text: "食物是我们的共通语言。", author: "保罗·博古斯" },
    { text: "一顿美食可以抚慰灵魂。", author: "费朗·亚德里亚" }
];

const stories = [
    "今日的招牌菜'松露和牛'选用了来自日本兵库县的A5级和牛，搭配意大利阿尔巴白松露。主厨采用低温慢煮工艺，在58度的精准温控下烹制48小时，保留了肉质的鲜嫩与松露的馥郁芳香。",
    "我们的鹅肝来自法国露杰农场，每只鹅都享有至少12周的精心饲养。慕斯质地如丝绸般顺滑，搭配自制无花果酱，甜咸交织，层次丰富。",
    "龙虾浓汤的秘方传承自19世纪的法国宫廷，每日清晨现熬虾壳高汤，加入干邑白兰地提香，每一勺都是时间的味道。"
];

const seatPrices = {
    window: 200,
    garden: 150,
    private: 500,
    hall: 0,
    chef: 300
};

const seatNames = {
    window: "临窗雅座",
    garden: "花园露台",
    private: "私密包厢",
    hall: "大厅雅座",
    chef: "主厨吧台"
};

// 状态
let cart = [];
let currentDish = null;
let selectedTaste = "浓郁";
let selectedDietary = [];
let diningOption = "dinein";
let utensilOption = "chopsticks";
let paymentMethod = "alipay";
let currentOrderNumber = null;

// 预约状态
let reservationState = {
    selectedDate: null,
    selectedTime: null,
    selectedSeat: 'hall',
    guests: 2,
    name: '',
    phone: '',
    notes: ''
};

// 模拟已预约满的时间段
const fullTimeSlots = ['18:00', '19:00', '20:00']; // 示例：这些时间点已约满

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    renderMenu('all');
    generateCalendar();
    initReservationDatePicker();
    
    // 点击模态框外部关闭
    document.getElementById('dishModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });

    document.getElementById('cancelReservationModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeCancelReservationModal();
    }
    });
    
    document.getElementById('cancelModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeCancelModal();
        }
    });
});

// 页面切换
function showPage(pageId) {
    // 1. 隐藏所有页面
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // 2. 显示目标页面
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        targetPage.scrollTop = 0; // 切换时回到顶部
    }

    // 3. 页面特殊初始化逻辑
    if (pageId === 'cartPage') {
        renderCart();
    } else if (pageId === 'checkoutPage') {
        updateCheckoutTotal();
    } else if (pageId === 'successPage') {
        generateOrderDetails();
    } else if (pageId === 'reservationPage') {
        initReservationDatePicker();
    } else if (pageId === 'reservationDetailsPage') {
        displayReservationSummary();
    }
    
    // 4. 每次切换页面回到容器顶部
    const container = document.querySelector('.app-container');
    if (container) container.scrollTop = 0;
}

// ==================== 预约功能 ====================

function goToReservationDetailsPage() {
    // 验证第一步是否填写完整
    if (!reservationState.selectedDate || !reservationState.selectedTime || !reservationState.selectedSeat) {
        alert('请选择日期、时间和位置');
        return;
    }
    
    // 显示第二步页面
    showPage('reservationDetailsPage');
}

function displayReservationSummary() {
    // 填充第一步的选择信息到第二步
    const dateStr = `${reservationState.selectedDate.getFullYear()}年${reservationState.selectedDate.getMonth() + 1}月${reservationState.selectedDate.getDate()}日`;
    document.getElementById('displayDate').textContent = dateStr;
    document.getElementById('displayTime').textContent = reservationState.selectedTime;
    document.getElementById('displaySeat').textContent = seatNames[reservationState.selectedSeat];
    
    // 更新两个页面的定金显示
    updateReservationSummary();
}

function initReservationDatePicker() {
    const picker = document.getElementById('datePicker');
    picker.innerHTML = '';
    
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        
        const div = document.createElement('div');
        div.className = 'date-item';
        if (i === 0) {
            div.classList.add('selected');
            reservationState.selectedDate = date;
        }
        
        const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const weekday = weekdays[date.getDay()];
        
        div.innerHTML = `
            <div class="date-weekday">${i === 0 ? '今天' : '周' + weekday}</div>
            <div class="date-day">${month}/${day}</div>
        `;
        
        div.onclick = () => selectDate(div, date);
        picker.appendChild(div);
    }
    
    initTimeSlots();
    updateReservationSummary();
}

function selectDate(element, date) {
    document.querySelectorAll('.date-item').forEach(item => {
        item.classList.remove('selected');
    });
    element.classList.add('selected');
    reservationState.selectedDate = date;
    
    // 重新生成时间选项（模拟不同日期有不同满员情况）
    initTimeSlots();
}

function initTimeSlots() {
    const container = document.getElementById('timeSlots');
    container.innerHTML = '';
    
    const times = ['11:30', '12:00', '12:30', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'];
    
    times.forEach((time, index) => {
        const div = document.createElement('div');
        div.className = 'time-slot';
        div.textContent = time;
        
        // 模拟某些时间点已满（随机+固定）
        const isFull = fullTimeSlots.includes(time) || (Math.random() > 0.7 && index % 3 === 0);
        
        if (isFull) {
            div.classList.add('full');
            div.innerHTML = `${time}<span class="full-badge">满</span>`;
        } else {
            div.onclick = () => selectTime(div, time);
        }
        
        container.appendChild(div);
    });
    
    document.getElementById('timeFullMessage').style.display = 'none';
}

function selectTime(element, time) {
    if (element.classList.contains('full')) {
        document.getElementById('timeFullMessage').style.display = 'flex';
        return;
    }
    
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    element.classList.add('selected');
    reservationState.selectedTime = time;
    document.getElementById('timeFullMessage').style.display = 'none';
}

function selectSeat(element, seatType) {
    document.querySelectorAll('.seat-card').forEach(card => {
        card.classList.remove('selected');
    });
    element.classList.add('selected');
    reservationState.selectedSeat = seatType;
    updateReservationSummary();
}

function changeGuests(delta) {
    const newCount = reservationState.guests + delta;
    if (newCount < 1 || newCount > 12) return;
    
    reservationState.guests = newCount;
    document.getElementById('guestCount').textContent = newCount;
    updateReservationSummary();
}

function updateReservationSummary() {
    const seatFee = seatPrices[reservationState.selectedSeat];
    
    // 更新两个页面的费用显示
    const seatFeeElement = document.getElementById('seatFee');
    const seatFee2Element = document.getElementById('seatFee2');
    
    if (seatFeeElement) {
        seatFeeElement.textContent = `¥${seatFee}`;
    }
    if (seatFee2Element) {
        seatFee2Element.textContent = `¥${seatFee}`;
    }
    
    // 定金为500元/位，但最少500
    const deposit = Math.max(500, reservationState.guests * 200);
    const depositElement = document.getElementById('depositAmount');
    if (depositElement) {
        depositElement.textContent = `¥${deposit}`;
    }
}

function submitReservation() {
    const name = document.getElementById('reservationName').value.trim();
    const phone = document.getElementById('reservationPhone').value.trim();
    const notes = document.getElementById('reservationNotes').value.trim();
    
    if (!name || !phone || !reservationState.selectedTime) {
        document.getElementById('reservationError').classList.add('show');
        return;
    }
    
    if (!/^\d{11}$/.test(phone)) {
        document.getElementById('reservationError').innerHTML = '<span>⚠</span> 请输入正确的11位手机号';
        document.getElementById('reservationError').classList.add('show');
        return;
    }
    
    reservationState.name = name;
    reservationState.phone = phone;
    reservationState.notes = notes;
    
    // 生成预约号
    const reservationNum = 'R-' + String(Math.floor(Math.random() * 900) + 100).padStart(3, '0');
    document.getElementById('reservationNumber').textContent = reservationNum;
    
    // 填充预约详情
    const dateStr = `${reservationState.selectedDate.getFullYear()}年${reservationState.selectedDate.getMonth() + 1}月${reservationState.selectedDate.getDate()}日`;
    document.getElementById('reservationDateDisplay').textContent = dateStr;
    document.getElementById('reservationTimeDisplay').textContent = reservationState.selectedTime;
    document.getElementById('reservationSeatDisplay').textContent = seatNames[reservationState.selectedSeat];
    document.getElementById('reservationGuestsDisplay').textContent = `${reservationState.guests}位`;
    
    showPage('reservationSuccessPage');
    showToast("预约成功");
}

// ==================== 原有功能 ====================

// 渲染菜单
function renderMenu(category) {
    const grid = document.getElementById('menuGrid');
    grid.innerHTML = '';
    
    const filtered = category === 'all' 
        ? menuData 
        : menuData.filter(item => item.category === category);
    
    filtered.forEach(dish => {
        const card = document.createElement('div');
        card.className = 'dish-card';
        card.onclick = () => openDishModal(dish);
        card.innerHTML = `
            <div class="dish-header">
                <div>
                    <div class="dish-name">${dish.name}</div>
                    <div class="dish-en">${dish.en}</div>
                </div>
                <div class="dish-price">¥${dish.price}</div>
            </div>
            <div class="dish-desc">${dish.desc}</div>
            <div class="dish-tags">
                ${dish.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterCategory(category) {
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    renderMenu(category);
}

function openDishModal(dish) {
    currentDish = dish;
    document.getElementById('modalImage').src = dish.image;
    document.getElementById('modalDishName').textContent = dish.name;
    document.getElementById('modalDishEn').textContent = dish.en;
    document.getElementById('modalPrice').textContent = `¥${dish.price}`;
    document.getElementById('modalDesc').textContent = dish.desc;
    
    selectedTaste = "浓郁";
    selectedDietary = [];
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.toggle('selected', btn.textContent === "浓郁");
    });
    document.querySelectorAll('.dietary-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    document.getElementById('specialRequests').value = '';
    document.getElementById('dietaryError').classList.remove('show');
    
    document.getElementById('dishModal').classList.add('active');
}

function closeModal() {
    document.getElementById('dishModal').classList.remove('active');
}

function selectTaste(btn) {
    document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedTaste = btn.textContent;
}

function toggleDietary(btn) {
    btn.classList.toggle('selected');
    const value = btn.textContent;
    if (btn.classList.contains('selected')) {
        selectedDietary.push(value);
    } else {
        selectedDietary = selectedDietary.filter(item => item !== value);
    }
    document.getElementById('dietaryError').classList.remove('show');
}

function addToCart() {
    const cartItem = {
        ...currentDish,
        taste: selectedTaste,
        dietary: selectedDietary,
        specialRequests: document.getElementById('specialRequests').value,
        quantity: 1
    };
    
    cart.push(cartItem);
    updateCartCount();
    closeModal();
    showToast("已加入购物车");
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

function renderCart() {
    const container = document.getElementById('cartItems');
    const summary = document.getElementById('cartSummary');
    const emptyCart = document.getElementById('emptyCart');
    
    if (cart.length === 0) {
        container.innerHTML = '';
        summary.style.display = 'none';
        emptyCart.style.display = 'block';
        return;
    }
    
    emptyCart.style.display = 'none';
    summary.style.display = 'block';
    container.innerHTML = '';
    
    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div style="flex: 1;">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <div class="cart-item-options">
                        口味：${item.taste}<br>
                        ${item.dietary.length > 0 ? '忌口：' + item.dietary.join('、') + '<br>' : ''}
                        ${item.specialRequests ? '备注：' + item.specialRequests : ''}
                    </div>
                </div>
                <div class="cart-item-actions">
                    <button class="quantity-btn" onclick="changeQuantity(${index}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="changeQuantity(${index}, 1)">+</button>
                    <span class="remove-btn" onclick="removeItem(${index})">删除</span>
                </div>
            </div>
            <div class="cart-item-price">¥${item.price * item.quantity}</div>
        `;
        container.appendChild(div);
    });
    
    updateCartSummary();
}

function changeQuantity(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCartCount();
    renderCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartCount();
    renderCart();
}

function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const serviceFee = Math.round(subtotal * 0.1);
    const total = subtotal + serviceFee;
    
    document.getElementById('subtotal').textContent = `¥${subtotal}`;
    document.getElementById('serviceFee').textContent = `¥${serviceFee}`;
    document.getElementById('total').textContent = `¥${total}`;
}

function selectDiningOption(element, value) {
    const isAlreadySelected = element.classList.contains('selected');
    
    // 清除该组所有已选项
    element.parentElement.querySelectorAll('.radio-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // 如果之前未选中，则选中；如果已选中，则只是取消（上面已做到）
    if (!isAlreadySelected) {
        element.classList.add('selected');
        diningOption = value;
    }
}

function selectUtensil(element, value) {
    const isAlreadySelected = element.classList.contains('selected');
    
    // 清除该组所有已选项
    element.parentElement.querySelectorAll('.radio-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // 如果之前未选中，则选中；如果已选中，则只是取消（上面已做到）
    if (!isAlreadySelected) {
        element.classList.add('selected');
        utensilOption = value;
    }
}

function selectPayment(element, value) {
    const isAlreadySelected = element.classList.contains('selected');
    
    // 清除该组所有已选项
    element.parentElement.querySelectorAll('.radio-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // 如果之前未选中，则选中；如果已选中，则只是取消（上面已做到）
    if (!isAlreadySelected) {
        element.classList.add('selected');
        paymentMethod = value;
    }
    
    document.getElementById('paymentError').classList.remove('show');
}

function updateCheckoutTotal() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const serviceFee = Math.round(subtotal * 0.1);
    const total = subtotal + serviceFee;
    document.getElementById('checkoutTotal').textContent = `¥${total}`;
}

function processPayment() {
    const loader = document.getElementById('paymentLoader');
    const error = document.getElementById('paymentError');
    const btn = document.querySelector('#checkoutPage .checkout-btn');
    
    // 保存特殊需求
    const specialReq = document.getElementById('checkoutSpecialRequests').value;
    if (specialReq) {
        console.log('特殊需求：', specialReq); // 实际应用中发送到服务器
    }
    
    btn.style.display = 'none';
    loader.classList.add('show');
    error.classList.remove('show');
    
    setTimeout(() => {
        loader.classList.remove('show');
        
        if (Math.random() > 0.9) {
            btn.style.display = 'block';
            error.classList.add('show');
            showToast("支付失败，请重试");
        } else {
            // 生成订单号
            currentOrderNumber = 'A-' + String(Math.floor(Math.random() * 900) + 100).padStart(3, '0');
            showPage('successPage');
        }
    }, 2000);
}

// ==================== 取消订单功能 ====================

// 修改：显示取消订单弹窗
function showCancelConfirm() {
    const modal = document.getElementById('cancelModal');
    if (modal) {
        modal.classList.add('active');
        modal.style.display = 'flex'; // 确保 display 属性也被正确设置
    }
}

// 修改：关闭取消订单弹窗
function closeCancelModal() {
    const modal = document.getElementById('cancelModal');
    if (modal) {
        modal.classList.remove('active');
        modal.style.display = 'none';
    }
}

function confirmCancelOrder() {
    closeCancelModal();
    
    // 显示已取消页面
    document.getElementById('cancelledOrderNumber').textContent = currentOrderNumber || document.getElementById('orderNumber').textContent;
    showPage('cancelledPage');
    showToast("订单已取消");
}

// ==================== 其他功能 ====================

function generateOrderDetails() {
    if (!currentOrderNumber) {
        currentOrderNumber = 'A-' + String(Math.floor(Math.random() * 900) + 100).padStart(3, '0');
    }
    document.getElementById('orderNumber').textContent = currentOrderNumber;
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const waitTime = Math.max(15, totalItems * 8 + Math.floor(Math.random() * 10));
    document.getElementById('waitTime').textContent = `${waitTime}-${waitTime + 5}`;
    
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('quoteText').textContent = `"${quote.text}"`;
    document.getElementById('quoteAuthor').textContent = `—— ${quote.author}`;
    
    const story = stories[Math.floor(Math.random() * stories.length)];
    document.getElementById('dishStory').textContent = story;
}

function generateCalendar() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    
    document.getElementById('currentMonth').textContent = `${year}年${month + 1}月`;
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const grid = document.getElementById('calendarGrid');
    grid.innerHTML = '';
    
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
    weekdays.forEach(day => {
        const div = document.createElement('div');
        div.className = 'calendar-weekday';
        div.textContent = day;
        grid.appendChild(div);
    });
    
    for (let i = 0; i < firstDay; i++) {
        const div = document.createElement('div');
        div.className = 'calendar-day';
        grid.appendChild(div);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
        const div = document.createElement('div');
        div.className = 'calendar-day';
        div.textContent = i;
        if (i === date) {
            div.classList.add('today');
        }
        grid.appendChild(div);
    }
}

function resetOrder() {
    cart = [];
    currentOrderNumber = null;
    updateCartCount();
    
    // 重置预约状态
    reservationState = {
        selectedDate: null,
        selectedTime: null,
        selectedSeat: 'hall',
        guests: 2,
        name: '',
        phone: '',
        notes: ''
    };
    
    // 重置表单
    document.getElementById('reservationName').value = '';
    document.getElementById('reservationPhone').value = '';
    document.getElementById('reservationNotes').value = '';
    document.getElementById('checkoutSpecialRequests').value = '';
    document.getElementById('reservationError').classList.remove('show');
    
    showPage('welcomePage');
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// ==================== 取消预约功能 ====================

function showCancelReservationConfirm() {
    document.getElementById('cancelReservationModal').classList.add('active');
}

function closeCancelReservationModal() {
    document.getElementById('cancelReservationModal').classList.remove('active');
}

function confirmCancelReservation() {
    closeCancelReservationModal();
    
    // 重置预约状态
    reservationState = {
        selectedDate: null,
        selectedTime: null,
        selectedSeat: 'hall',
        guests: 2,
        name: '',
        phone: '',
        notes: ''
    };
    
    // 清空表单
    document.getElementById('reservationName').value = '';
    document.getElementById('reservationPhone').value = '';
    document.getElementById('reservationNotes').value = '';
    document.getElementById('reservationError').classList.remove('show');
    
    showToast("预约已取消");
    showPage('welcomePage');
}

// ==================== 状态栏时间更新 ====================

function updateStatusBarTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeStr = `${hours}:${minutes}`;
    document.getElementById('statusTime').textContent = timeStr;
}

// 页面加载时初始化时间更新
document.addEventListener('DOMContentLoaded', function() {
    updateStatusBarTime();
    setInterval(updateStatusBarTime, 60000); // 每分钟更新一次
});