// 魔法データ
const magicData = [
    { id: 1, attributes: ['mana'], type: 'attack', effect: '威力小、3回必中' },
    { id: 2, attributes: ['fire'], type: 'attack', effect: '炎投げつけ' },
    { id: 3, attributes: ['thunder'], type: 'support', effect: '回避強化' },
    { id: 4, attributes: ['light'], type: 'support', effect: '強靭、カット率強化' },
    { id: 5, attributes: ['mana', 'fire'], type: 'attack', effect: '追尾する炎' },
    { id: 6, attributes: ['mana', 'thunder'], type: 'attack', effect: '雷の斬撃' },
    { id: 7, attributes: ['mana', 'light'], type: 'support', effect: '全員消費FPゼロ' },
    { id: 8, attributes: ['fire', 'thunder'], type: 'attack', effect: '突進→雷' },
    { id: 9, attributes: ['fire', 'light'], type: 'support', effect: '全員最大HP増加、敵HP低下、<br>状態異常小回復' },
    { id: 10, attributes: ['thunder', 'light'], type: 'support', effect: '自動パリィ' },
    { id: 11, attributes: ['mana', 'fire', 'thunder'], type: 'attack', effect: '範囲重力魔法' },
    { id: 12, attributes: ['mana', 'fire', 'light'], type: 'attack', effect: '複属性ブレス、<br>味方HP+FP回復' },
    { id: 13, attributes: ['mana', 'thunder', 'light'], type: 'attack', effect: '冷気嵐+無敵' },
    { id: 14, attributes: ['fire', 'thunder', 'light'], type: 'attack', effect: '避雷針→落雷' }
];

// 属性名のマッピング
const attributeNames = {
    mana: '魔力',
    fire: '炎',
    thunder: '雷',
    light: '聖'
};

// 現在の属性状態
let currentAttributes = { mana: true, fire: false, thunder: false, light: false };

// 属性ボタンのクリックイベント
document.addEventListener('DOMContentLoaded', function() {
    const attributeButtons = document.querySelectorAll('.attribute-btn');
    
    attributeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const attribute = this.dataset.attribute;
            
            // 魔力ボタンは切り替え不可
            if (attribute === 'mana') return;
            
            // 属性の状態を切り替え
            currentAttributes[attribute] = !currentAttributes[attribute];
            
            // ボタンの表示を更新
            if (currentAttributes[attribute]) {
                this.classList.add('active');
            } else {
                this.classList.remove('active');
            }
            
            // 魔法表示を更新
            updateMagicDisplay();
        });
    });
    
    // 初期表示
    updateMagicDisplay();
});

// 魔法表示を更新
function updateMagicDisplay() {
    const displayArea = document.getElementById('magic-display');
    
    // 使用可能な属性を取得
    const availableAttributes = Object.keys(currentAttributes).filter(attr => currentAttributes[attr]);
    
    // 魔法を分類
    const availableAttack = [];
    const availableSupport = [];
    const unavailable = [];
    
    magicData.forEach(magic => {
        const canUse = magic.attributes.every(attr => availableAttributes.includes(attr));
        
        if (canUse) {
            if (magic.type === 'attack') {
                availableAttack.push(magic);
            } else {
                availableSupport.push(magic);
            }
        } else {
            unavailable.push(magic);
        }
    });
    
    // HTML生成
    let html = '';
    
    // 攻撃魔法
    if (availableAttack.length > 0) {
        html += '<div class="magic-category attack">';
        html += '<div class="category-title">攻撃</div>';
        html += '<div class="magic-grid">';
        availableAttack.forEach(magic => {
            html += createMagicBox(magic, true);
        });
        html += '</div></div>';
    }
    
    // 補助魔法
    if (availableSupport.length > 0) {
        html += '<div class="magic-category support">';
        html += '<div class="category-title">補助</div>';
        html += '<div class="magic-grid">';
        availableSupport.forEach(magic => {
            html += createMagicBox(magic, true);
        });
        html += '</div></div>';
    }
    
    // 使用不可魔法
    if (unavailable.length > 0) {
        html += '<div class="unavailable-section">';
        html += '<div class="unavailable-grid">';
        unavailable.forEach(magic => {
            html += createMagicBox(magic, false);
        });
        html += '</div></div>';
    }
    
    displayArea.innerHTML = html;
}

// 魔法ボックスのHTML生成
function createMagicBox(magic, available) {
    const className = available ? 'magic-box available' : 'magic-box unavailable';
    
    let attributesHtml = '';
    magic.attributes.forEach(attr => {
        attributesHtml += `
            <div class="magic-attribute">
                <img src="./icons/icon_${attr}.png" alt="${attributeNames[attr]}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                <div style="display:none; width:20px; height:20px; background:#ddd; border-radius:2px; margin-bottom:2px; line-height:20px; font-size:8px;">${attributeNames[attr]}</div>
                <span>${attributeNames[attr]}</span>
            </div>
        `;
    });
    
    return `
        <div class="${className}">
            <div class="magic-attributes">
                ${attributesHtml}
            </div>
            <div class="magic-effect">${magic.effect}</div>
        </div>
    `;
}