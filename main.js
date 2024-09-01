window.addEventListener('load',carrega);

function carrega(){
    document.getElementById('field-name').addEventListener('blur', leave);
    document.getElementById('field-produto').addEventListener('blur', leave);
    document.getElementById('field-descricao').addEventListener('blur', leave);
    document.getElementById('field-preco').addEventListener('blur', leave);   
}
function leave(){
    if(this.value != ''){
        this.offsetParent.className += " ativo";
    }else{
        this.offsetParent.className = 'box';
    }
}

function inputSHOW(_show){
    if(_show){
        document.getElementById('field-name').offsetParent.className += " ativo";
        document.getElementById('field-produto').offsetParent.className += " ativo";
        document.getElementById('field-descricao').offsetParent.className += " ativo";
        document.getElementById('field-preco').offsetParent.className += " ativo";
        document.getElementById('btn-deletar').style.display = 'block';
    }else{
        
        document.getElementById('field-name').offsetParent.className = 'box';
        document.getElementById('field-produto').offsetParent.className = 'box';
        document.getElementById('field-descricao').offsetParent.className = 'box';
        document.getElementById('field-preco').offsetParent.className = 'box';
        //document.getElementById('btn-deletar').style.display = 'none';
    }
}

function limpaCampo(){
    
    document.getElementById('field-id').value = '';
    document.getElementById('field-name').value = '';
    document.getElementById('field-produto').value = '';
    document.getElementById('field-descricao').value = '';
}