window.addEventListener('load', carregado);

var db = openDatabase("myDB", "1.0", "NunesSports", 2 * 1024 * 1024);

function carregado() {    
    document.getElementById('btn-salvar').addEventListener('click', salvar);
    document.getElementById('btn-deletar').addEventListener('click', deletar);
    
    db.transaction(function(tx) {
        // tx.executeSql("DROP TABLE myTable");
        tx.executeSql("CREATE TABLE IF NOT EXISTS myTable (id INTEGER PRIMARY KEY, name TEXT, produto TEXT, descricao TEXT, preco NUMBER)");
    });
    
    mostrar();
}

function salvar() {
    var id = document.getElementById('field-id').value;
    var name = document.getElementById('field-name').value;
    var produto = document.getElementById('field-produto').value;
    var descricao = document.getElementById('field-descricao').value;
    var preco = document.getElementById('field-preco').value;

    db.transaction(function(tx) {
        if (id) {
            tx.executeSql('UPDATE myTable SET name=?, produto=?, descricao=?, preco=? WHERE id=?', [name, produto, descricao, preco, id]);
        } else {
            tx.executeSql('INSERT INTO myTable (name, produto, descricao, preco) VALUES (?, ?, ?, ?)', [name, produto, descricao, preco]);
        }
    });

    mostrar();
    limpaCampo();
    inputSHOW(false);
}

function mostrar() {        
    var table = document.getElementById('tbody-register');

    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM myTable', [], function(tx, resultado) {
            var rows = resultado.rows;
            var tr = '';
            for (var i = 0; i < rows.length; i++) {
                tr += '<tr>';
                tr += '<td onClick="atualizar(' + rows[i].id + ')">' + rows[i].name + '</td>';
                tr += '<td>' + rows[i].produto + '</td>';
                tr += '<td>' + rows[i].descricao + '</td>';
                tr += '<td>' + rows[i].preco + '</td>';
                tr += '</tr>';                   
            }
            table.innerHTML = tr; 
        }, null);
    });
}

function atualizar(_id) {   
    var id = document.getElementById('field-id');
    var nome = document.getElementById('field-name');
    var produto = document.getElementById('field-produto');
    var descricao = document.getElementById('field-descricao');
    var preco = document.getElementById('field-preco');
    
    id.value = _id;
    
    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM myTable WHERE id=?', [_id], function(tx, resultado) {
            var row = resultado.rows[0];
            nome.value = row.name;
            produto.value = row.produto;
            descricao.value = row.descricao;
            preco.value = row.preco;
        });
    });
    inputSHOW(true);
}

function deletar() {
    var id = document.getElementById('field-id').value;
    
    db.transaction(function(tx) {
        tx.executeSql("DELETE FROM myTable WHERE id=?", [id]);
    });
    
    mostrar();
    limpaCampo();
    inputSHOW(false);
}