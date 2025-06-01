let currentCharacterId = null;

// 初始化加载所有角色
document.addEventListener('DOMContentLoaded', () => {
    loadCharacters();
});

function createNewCharacter() {
    currentCharacterId = Date.now().toString();
    showEditor();
    clearForm();
}

function showEditor() {
    document.getElementById('editor').classList.remove('hidden');
    document.getElementById('character-sheet').classList.add('hidden');
}

function cancelEdit() {
    document.getElementById('editor').classList.add('hidden');
    document.getElementById('character-sheet').classList.remove('hidden');
}

function saveCharacter() {
    const formData = new FormData(document.getElementById('characterForm'));
    const character = Object.fromEntries(formData.entries());
    
    if (currentCharacterId) {
        // 更新现有角色
        const characters = JSON.parse(localStorage.getItem('characters') || '{}');
        characters[currentCharacterId] = character;
        localStorage.setItem('characters', JSON.stringify(characters));
    } else {
        // 创建新角色
        const characters = JSON.parse(localStorage.getItem('characters') || '{}');
        characters[currentCharacterId] = {
            ...character,
            createdAt: new Date().toISOString()
        };
        localStorage.setItem('characters', JSON.stringify(characters));
    }
    
    loadCharacters();
}

function loadCharacters() {
    const characters = JSON.parse(localStorage.getItem('characters') || '{}');
    let html = '<h2>已保存角色</h2><ul>';
    
    Object.entries(characters).forEach(([id, char]) => {
        html += `
            <li style="margin: 5px 0">
                ${char.name} (${char.class} Lv.${char.level})
                <button onclick="editCharacter('${id}')">编辑</button>
                <button onclick="deleteCharacter('${id}')">删除</button>
            </li>
        `;
    });
    
    html += '</ul>';
    document.getElementById('character-sheet').innerHTML = html || '暂无角色数据';
}

function editCharacter(id) {
    currentCharacterId = id;
    const characters = JSON.parse(localStorage.getItem('characters') || '{}');
    const character = characters[id];
    
    document.getElementById('characterForm').elements.namedItem('name').value = character.name;
    document.getElementById('characterForm').elements.namedItem('class').value = character.class;
    document.getElementById('characterForm').elements.namedItem('level').value = character.level;
    document.getElementById('characterForm').elements.namedItem('race').value = character.race;
    document.getElementById('characterForm').elements.namedItem('attributes').value = character.attributes;
    
    showEditor();
}

function deleteCharacter(id) {
    const characters = JSON.parse(localStorage.getItem('characters') || '{}');
    delete characters[id];
    localStorage.setItem('characters', JSON.stringify(characters));
    loadCharacters();
}

function clearForm() {
    document.getElementById('characterForm').reset();
}

function exportToPDF() {
    // 这里可以集成jsPDF库实现导出功能
    alert('PDF导出功能需要连接互联网');
}