<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Control Restaurante Pro</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
    <script src="https://apis.google.com/js/api.js"></script>
    <style>
        :root {
            --primary: #8B4513; /* Café */
            --secondary: #F5F5DC; /* Beige */
            --accent: #800000; /* Vino tinto */
            --highlight: #FFD700; /* Dorado */
            --text: #333;
            --bg: #fff;
        }
        body.dark {
            --primary: #D2691E;
            --secondary: #333;
            --accent: #B22222;
            --highlight: #EEE8AA;
            --text: #eee;
            --bg: #222;
        }
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background: var(--bg);
            color: var(--text);
        }
        header {
            background: var(--primary);
            color: var(--secondary);
            padding: 1em;
            text-align: center;
        }
        nav {
            display: flex;
            justify-content: center;
            background: var(--accent);
        }
        nav a {
            color: var(--secondary);
            padding: 1em;
            text-decoration: none;
        }
        nav a:hover {
            background: var(--highlight);
            color: var(--primary);
        }
        section {
            padding: 2em;
            display: none;
        }
        section.active {
            display: block;
        }
        #home {
            text-align: center;
        }
        #tables-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: 1em;
        }
        .table {
            padding: 1em;
            text-align: center;
            cursor: pointer;
            border: 1px solid var(--primary);
            border-radius: 5px;
        }
        .free { background: green; color: white; }
        .in-progress { background: yellow; color: black; }
        .pending-pay { background: red; color: white; }
        #modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--bg);
            padding: 2em;
            border: 1px solid var(--primary);
            display: none;
            width: 80%;
            max-width: 600px;
        }
        #modal.active { display: block; }
        #order-items { margin-bottom: 1em; }
        .item-row { display: flex; gap: 1em; margin-bottom: 0.5em; }
        #accounting-table { width: 100%; border-collapse: collapse; }
        #accounting-table th, td { border: 1px solid var(--primary); padding: 0.5em; }
        #summary { margin-top: 1em; }
        button { background: var(--accent); color: var(--secondary); border: none; padding: 0.5em 1em; cursor: pointer; }
        button:hover { background: var(--highlight); color: var(--primary); }
        @media (max-width: 600px) {
            #tables-grid { grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); }
        }
    </style>
</head>
<body>
    <header>
        <h1>Control Restaurante Pro</h1>
        <!-- Logo placeholder: <img src="logo.png" alt="Logo"> -->
    </header>
    <nav>
        <a href="#home">🏠 Inicio</a>
        <a href="#tables">🍽️ Mesas</a>
        <a href="#accounting">💰 Contabilidad</a>
        <a href="#settings">⚙️ Configuración</a>
    </nav>
    <section id="home" class="active">
        <h2>Control total de tu restaurante en una sola página. Gestiona mesas, pedidos y contabilidad diaria fácilmente.</h2>
        <p>Optimiza tu tiempo, elimina los errores y lleva tu control financiero al día.</p>
        <button onclick="showSection('tables')">🧾 Comenzar a gestionar ahora</button>
    </section>
    <section id="tables">
        <h2>Gestión de Mesas</h2>
        <div id="tables-grid"></div>
        <div id="modal">
            <h3>Pedido de Mesa <span id="modal-table-id"></span></h3>
            <div id="order-items"></div>
            <button onclick="addItemRow()">Agregar Item</button>
            <p>Total: <span id="order-total">0</span></p>
            <select id="payment-method">
                <option value="efectivo">Efectivo</option>
                <option value="tarjeta">Tarjeta</option>
            </select>
            <button onclick="saveOrder()">Guardar Pedido</button>
            <button onclick="markPaid()">Marcar como Pagado</button>
            <button onclick="deleteOrder()">Eliminar Pedido</button>
            <button onclick="closeModal()">Cerrar</button>
        </div>
    </section>
    <section id="accounting">
        <h2>Contabilidad Diaria</h2>
        <table id="accounting-table">
            <thead>
                <tr><th>Fecha y Hora</th><th>Mesa</th><th>Total</th><th>Método de Pago</th></tr>
            </thead>
            <tbody id="accounting-body"></tbody>
        </table>
        <div id="summary">
            <p>Total Ventas: <span id="total-sales">0</span></p>
            <p>Número de Pedidos: <span id="num-orders">0</span></p>
            <p>Promedio por Cliente: <span id="avg-order">0</span></p>
        </div>
        <button onclick="exportToExcel()">💾 Descargar Excel del día</button>
        <button onclick="saveToDrive()">☁️ Guardar en Drive</button>
    </section>
    <section id="settings">
        <h2>Configuración</h2>
        <button onclick="toggleDarkMode()">Cambiar Modo Oscuro/Claro</button>
        <!-- Login simple: -->
        <p>Protección: <input type="password" id="admin-pass" placeholder="Contraseña Admin"><button onclick="login()">Iniciar Sesión</button></p>
        <p id="login-status">No logueado</p>
    </section>

    <script>
        // Datos
        const menuItems = [
            {name: 'Café', price: 2.5},
            {name: 'Pasta', price: 10},
            {name: 'Ensalada', price: 8},
            {name: 'Vino', price: 15}
            // Agregar más según necesites
        ];
        let tables = Array.from({length: 10}, (_, i) => ({id: i+1, status: 'free', order: []}));
        let accounting = JSON.parse(localStorage.getItem('accounting')) || [];
        const CLIENT_ID = 'TU_CLIENT_ID_AQUI'; // Reemplaza con tu Client ID de Google Console
        const API_KEY = 'TU_API_KEY_AQUI'; // Reemplaza con tu API Key
        const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
        const SCOPES = 'https://www.googleapis.com/auth/drive.file';
        let tokenClient;
        let gapiInited = false;
        let gisInited = false;

        // Inicializar Google API
        function gapiLoaded() {
            gapi.load('client', initializeGapiClient);
        }
        async function initializeGapiClient() {
            await gapi.client.init({
                apiKey: API_KEY,
                discoveryDocs: [DISCOVERY_DOC],
            });
            gapiInited = true;
            maybeEnableButtons();
        }
        function gisLoaded() {
            tokenClient = google.accounts.oauth2.initTokenClient({
                client_id: CLIENT_ID,
                scope: SCOPES,
                callback: () => {},
            });
            gisInited = true;
            maybeEnableButtons();
        }
        function maybeEnableButtons() {
            if (gapiInited && gisInited) {
                // Listo para usar
            }
        }

        // Navegación
        document.querySelectorAll('nav a').forEach(a => {
            a.addEventListener('click', e => {
                e.preventDefault();
                showSection(e.target.href.split('#')[1]);
            });
        });
        function showSection(id) {
            document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
            document.getElementById(id).classList.add('active');
            if (id === 'tables') renderTables();
            if (id === 'accounting') renderAccounting();
        }

        // Mesas
        function renderTables() {
            const grid = document.getElementById('tables-grid');
            grid.innerHTML = '';
            tables.forEach(t => {
                const div = document.createElement('div');
                div.classList.add('table', t.status);
                div.textContent = `Mesa ${t.id}`;
                div.onclick = () => openModal(t.id);
                grid.appendChild(div);
            });
        }
        function openModal(tableId) {
            const table = tables.find(t => t.id === tableId);
            document.getElementById('modal-table-id').textContent = tableId;
            renderOrderItems(table.order);
            document.getElementById('modal').classList.add('active');
            calculateTotal();
        }
        function closeModal() {
            document.getElementById('modal').classList.remove('active');
        }
        function addItemRow(item = {item: menuItems[0].name, qty: 1}) {
            const row = document.createElement('div');
            row.classList.add('item-row');
            const select = document.createElement('select');
            menuItems.forEach(m => {
                const opt = document.createElement('option');
                opt.value = m.name;
                opt.textContent = `${m.name} - $${m.price}`;
                select.appendChild(opt);
            });
            select.value = item.item;
            select.onchange = () => calculateSubtotal(row);
            const qty = document.createElement('input');
            qty.type = 'number';
            qty.value = item.qty;
            qty.min = 1;
            qty.oninput = () => calculateSubtotal(row);
            const subtotal = document.createElement('span');
            subtotal.textContent = '0';
            const remove = document.createElement('button');
            remove.textContent = 'X';
            remove.onclick = () => { row.remove(); calculateTotal(); };
            row.append(select, qty, subtotal, remove);
            document.getElementById('order-items').appendChild(row);
            calculateSubtotal(row);
        }
        function renderOrderItems(order) {
            const itemsDiv = document.getElementById('order-items');
            itemsDiv.innerHTML = '';
            if (order.length === 0) addItemRow();
            else order.forEach(addItemRow);
        }
        function calculateSubtotal(row) {
            const select = row.querySelector('select');
            const qty = row.querySelector('input');
            const sub = row.querySelector('span');
            const price = menuItems.find(m => m.name === select.value).price;
            sub.textContent = (price * qty.value).toFixed(2);
            calculateTotal();
        }
        function calculateTotal() {
            let total = 0;
            document.querySelectorAll('.item-row').forEach(row => {
                total += parseFloat(row.querySelector('span').textContent) || 0;
            });
            document.getElementById('order-total').textContent = total.toFixed(2);
        }
        function getOrderFromModal() {
            return Array.from(document.querySelectorAll('.item-row')).map(row => {
                return {
                    item: row.querySelector('select').value,
                    qty: parseInt(row.querySelector('input').value)
                };
            });
        }
        function saveOrder() {
            const tableId = parseInt(document.getElementById('modal-table-id').textContent);
            const table = tables.find(t => t.id === tableId);
            table.order = getOrderFromModal();
            table.status = table.order.length > 0 ? 'in-progress' : 'free';
            closeModal();
            renderTables();
        }
        function markPaid() {
            const tableId = parseInt(document.getElementById('modal-table-id').textContent);
            const table = tables.find(t => t.id === tableId);
            const total = parseFloat(document.getElementById('order-total').textContent);
            const method = document.getElementById('payment-method').value;
            if (total > 0) {
                accounting.push({
                    date: new Date().toLocaleString(),
                    table: tableId,
                    total,
                    method
                });
                localStorage.setItem('accounting', JSON.stringify(accounting));
                table.order = [];
                table.status = 'free';
                closeModal();
                renderTables();
                if (document.getElementById('accounting').classList.contains('active')) renderAccounting();
            }
        }
        function deleteOrder() {
            const tableId = parseInt(document.getElementById('modal-table-id').textContent);
            const table = tables.find(t => t.id === tableId);
            table.order = [];
            table.status = 'free';
            closeModal();
            renderTables();
        }

        // Contabilidad
        function renderAccounting() {
            const tbody = document.getElementById('accounting-body');
            tbody.innerHTML = '';
            accounting.forEach(entry => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<td>${entry.date}</td><td>${entry.table}</td><td>${entry.total.toFixed(2)}</td><td>${entry.method}</td>`;
                tbody.appendChild(tr);
            });
            const totalSales = accounting.reduce((sum, e) => sum + e.total, 0);
            const numOrders = accounting.length;
            const avg = numOrders > 0 ? (totalSales / numOrders).toFixed(2) : 0;
            document.getElementById('total-sales').textContent = totalSales.toFixed(2);
            document.getElementById('num-orders').textContent = numOrders;
            document.getElementById('avg-order').textContent = avg;
        }

        // Exportar Excel
        function exportToExcel() {
            const wb = XLSX.utils.book_new();
            const ws_data = [["Fecha y Hora", "Mesa", "Total", "Método de Pago"]];
            accounting.forEach(e => ws_data.push([e.date, e.table, e.total, e.method]));
            const ws = XLSX.utils.aoa_to_sheet(ws_data);
            XLSX.utils.book_append_sheet(wb, ws, "Contabilidad");
            XLSX.writeFile(wb, `contabilidad_${new Date().toISOString().split('T')[0]}.xlsx`);
        }

        // Google Drive
        async function saveToDrive() {
            if (!gapiInited || !gisInited) return alert('Google API no inicializada');
            tokenClient.callback = async (resp) => {
                if (resp.error) return;
                const wb = XLSX.utils.book_new();
                const ws_data = [["Fecha y Hora", "Mesa", "Total", "Método de Pago"]];
                accounting.forEach(e => ws_data.push([e.date, e.table, e.total, e.method]));
                const ws = XLSX.utils.aoa_to_sheet(ws_data);
                XLSX.utils.book_append_sheet(wb, ws, "Contabilidad");
                const xlsx = XLSX.write(wb, {type: 'array', bookType: 'xlsx'});
                const fileMetadata = {name: `contabilidad_${new Date().toISOString().split('T')[0]}.xlsx`};
                const media = {mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', body: new Blob([xlsx])};
                try {
                    const file = await gapi.client.drive.files.create({
                        resource: fileMetadata,
                        media: media,
                        fields: 'id'
                    });
                    alert('Archivo guardado en Drive: ' + file.result.id);
                } catch (err) {
                    alert('Error: ' + err);
                }
            };
            if (gapi.client.getToken() === null) {
                tokenClient.requestAccessToken({prompt: 'consent'});
            } else {
                tokenClient.requestAccessToken({prompt: ''});
            }
        }

        // Config
        function toggleDarkMode() {
            document.body.classList.toggle('dark');
        }
        function login() {
            const pass = document.getElementById('admin-pass').value;
            if (pass === 'admin123') { // Cambiar por contraseña real
                document.getElementById('login-status').textContent = 'Logueado como Admin';
                // Habilitar funcionalidades si es necesario
            } else {
                alert('Contraseña incorrecta');
            }
        }

        // Inicializar
        renderTables();
        renderAccounting();
        // Cargar Google APIs
        const gapiScript = document.createElement('script');
        gapiScript.src = 'https://apis.google.com/js/api.js';
        gapiScript.onload = gapiLoaded;
        document.body.appendChild(gapiScript);
        const gisScript = document.createElement('script');
        gisScript.src = 'https://accounts.google.com/gsi/client';
        gisScript.onload = gisLoaded;
        document.body.appendChild(gisScript);
    </script>
</body>
</html>
